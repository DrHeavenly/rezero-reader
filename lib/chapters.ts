import fs from "node:fs";
import path from "node:path";

/**
 * Static data layer: reads the repo's *_final.md files at build time only.
 * Nothing here runs at request time in production — every consumer is a
 * statically generated page (see generateStaticParams in app/**).
 */

export type ChapterKind = "chapter" | "interlude";

export interface ChapterEntry {
  arc: number;
  arcSlug: string;
  kind: ChapterKind;
  number: number;
  slug: string;
  /** Full first-line heading, e.g. "Chapter 3 — The Little Girl's Cell" */
  heading: string;
  /** The part of the heading after the dash, e.g. "The Little Girl's Cell" */
  title: string;
  /** The part of the heading before the dash, e.g. "Chapter 3" */
  kindLabel: string;
  /** Markdown body, with the H1 heading line removed */
  body: string;
  filePath: string;
}

export interface ArcSummary {
  arc: number;
  arcSlug: string;
  title: string;
  chapterCount: number;
  entries: ChapterEntry[];
}

export interface SearchItem {
  /** Destination route for this result. */
  href: string;
  /** Small context label shown above the title, e.g. "Arc 6 · Chapter" or "IF Story". */
  context: string;
  title: string;
  heading: string;
  kindLabel: string;
  /** Present for arc content; enables "6-3" style numeric lookups. */
  arc?: number;
  number?: number;
  kind?: ChapterKind;
}

const REPO_ROOT = process.cwd();
const FILENAME_RE = /^arc(\d+)_(ch|int)(\d+)_final\.md$/i;
const IGNORE_DIRS = new Set(["node_modules", ".next", ".git", "public", "out"]);

function walk(dir: string, out: string[]): void {
  let dirents: fs.Dirent[];
  try {
    dirents = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of dirents) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.isFile() && FILENAME_RE.test(entry.name)) {
      out.push(full);
    }
  }
}

function splitHeading(heading: string): { kindLabel: string; title: string } {
  const dashMatch = heading.match(/^(.*?)\s*[—–-]\s*(.+)$/);
  if (dashMatch) {
    return { kindLabel: dashMatch[1].trim(), title: dashMatch[2].trim() };
  }
  return { kindLabel: heading, title: heading };
}

function parseFile(filePath: string): ChapterEntry {
  const basename = path.basename(filePath);
  const match = basename.match(FILENAME_RE);
  if (!match) {
    throw new Error(`Unexpected chapter filename: ${basename}`);
  }
  const arcSlug = match[1];
  const arc = parseInt(arcSlug, 10);
  const kind: ChapterKind = match[2].toLowerCase() === "ch" ? "chapter" : "interlude";
  const numberSlug = match[3];
  const number = parseInt(numberSlug, 10);
  const slug = `${match[2].toLowerCase()}${numberSlug}`;

  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split(/\r?\n/);

  let headingLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().length === 0) continue;
    headingLineIdx = i;
    break;
  }

  let heading: string;
  let bodyLines: string[];
  if (headingLineIdx !== -1 && /^#\s+/.test(lines[headingLineIdx])) {
    heading = lines[headingLineIdx].replace(/^#\s+/, "").trim();
    bodyLines = lines.slice(headingLineIdx + 1);
  } else {
    heading = kind === "chapter" ? `Chapter ${number}` : `Interlude ${number}`;
    bodyLines = lines;
  }
  while (bodyLines.length && bodyLines[0].trim() === "") bodyLines.shift();

  const { kindLabel, title } = splitHeading(heading);

  return {
    arc,
    arcSlug,
    kind,
    number,
    slug,
    heading,
    title,
    kindLabel,
    body: bodyLines.join("\n"),
    filePath: path.relative(REPO_ROOT, filePath),
  };
}

let cachedEntries: ChapterEntry[] | null = null;

export function getAllChapters(): ChapterEntry[] {
  if (cachedEntries) return cachedEntries;

  const files: string[] = [];
  walk(REPO_ROOT, files);

  const entries = files.map(parseFile);

  entries.sort((a, b) => {
    if (a.arc !== b.arc) return a.arc - b.arc;
    if (a.number !== b.number) return a.number - b.number;
    if (a.kind !== b.kind) return a.kind === "chapter" ? -1 : 1;
    return a.filePath.localeCompare(b.filePath);
  });

  cachedEntries = entries;
  return entries;
}

export function getArcs(): ArcSummary[] {
  const all = getAllChapters();
  const byArc = new Map<number, ChapterEntry[]>();
  for (const entry of all) {
    if (!byArc.has(entry.arc)) byArc.set(entry.arc, []);
    byArc.get(entry.arc)!.push(entry);
  }
  return Array.from(byArc.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([arc, entries]) => ({
      arc,
      arcSlug: entries[0].arcSlug,
      title: `Arc ${arc}`,
      chapterCount: entries.length,
      entries,
    }));
}

export function getArcBySlug(arcSlug: string): ArcSummary | undefined {
  return getArcs().find((a) => a.arcSlug === arcSlug || String(a.arc) === arcSlug);
}

export function getChapter(arcSlug: string, slug: string): ChapterEntry | undefined {
  return getAllChapters().find(
    (e) => (e.arcSlug === arcSlug || String(e.arc) === arcSlug) && e.slug === slug,
  );
}

export function getAdjacentChapters(entry: ChapterEntry): {
  prev?: ChapterEntry;
  next?: ChapterEntry;
} {
  const all = getAllChapters();
  const idx = all.findIndex((e) => e.filePath === entry.filePath);
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}

export function getSearchIndex(): SearchItem[] {
  return getAllChapters().map((e) => ({
    href: `/arc/${e.arcSlug}/${e.slug}`,
    context: `Arc ${e.arc} · ${e.kindLabel}`,
    title: e.title,
    heading: e.heading,
    kindLabel: e.kindLabel,
    arc: e.arc,
    number: e.number,
    kind: e.kind,
  }));
}
