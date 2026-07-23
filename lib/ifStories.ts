import fs from "node:fs";
import path from "node:path";
import type { SearchItem } from "@/lib/chapters";

/**
 * Static data layer for IF-route stories (alternate-timeline side stories),
 * kept entirely separate from the main-arc content in `chapters.ts`.
 *
 * One file per story, named `if_<story>_final.md`, e.g. `if_pride_final.md`.
 * The first line of each file is an H1 used as the display heading.
 *
 * Everything here runs at build time only; each consumer is statically
 * generated (see generateStaticParams in app/if/**).
 */

export interface IfStory {
  story: string;
  /** Display name for the story, e.g. "Pride IF" */
  label: string;
  /** Full first-line heading */
  heading: string;
  /** Portion of the heading after the dash (falls back to the whole heading) */
  title: string;
  body: string;
  filePath: string;
}

const REPO_ROOT = process.cwd();
const FILENAME_RE = /^if_([a-z0-9]+)_final\.md$/i;
const IGNORE_DIRS = new Set(["node_modules", ".next", ".git", "public", "out"]);

/** Known display labels; unknown slugs fall back to a derived label. */
const STORY_LABELS: Record<string, string> = {
  pride: "Pride IF",
};

function storyLabel(story: string): string {
  return STORY_LABELS[story.toLowerCase()] ?? `${story.charAt(0).toUpperCase()}${story.slice(1)} IF`;
}

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

function splitHeading(heading: string): { title: string } {
  const dashMatch = heading.match(/^(.*?)\s*[—–-]\s*(.+)$/);
  if (dashMatch) return { title: dashMatch[2].trim() };
  return { title: heading };
}

function parseFile(filePath: string): IfStory {
  const basename = path.basename(filePath);
  const match = basename.match(FILENAME_RE);
  if (!match) throw new Error(`Unexpected IF filename: ${basename}`);
  const story = match[1].toLowerCase();

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
    heading = storyLabel(story);
    bodyLines = lines;
  }
  while (bodyLines.length && bodyLines[0].trim() === "") bodyLines.shift();

  const { title } = splitHeading(heading);

  return {
    story,
    label: storyLabel(story),
    heading,
    title,
    body: bodyLines.join("\n"),
    filePath: path.relative(REPO_ROOT, filePath),
  };
}

let cached: IfStory[] | null = null;

export function getIfStories(): IfStory[] {
  if (cached) return cached;
  const files: string[] = [];
  walk(REPO_ROOT, files);
  cached = files.map(parseFile).sort((a, b) => a.story.localeCompare(b.story));
  return cached;
}

export function getIfStory(story: string): IfStory | undefined {
  return getIfStories().find((s) => s.story === story.toLowerCase());
}

export function getIfSearchIndex(): SearchItem[] {
  return getIfStories().map((s) => ({
    href: `/if/${s.story}`,
    context: "IF Story",
    title: s.label,
    heading: s.heading,
    kindLabel: "IF Story",
  }));
}
