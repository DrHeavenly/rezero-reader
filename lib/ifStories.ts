import fs from "node:fs";
import path from "node:path";

/**
 * Static data layer for IF-route stories (alternate-timeline side stories),
 * kept entirely separate from the main-arc content in `chapters.ts`.
 *
 * Files are named `if_<story>_<variant>_final.md`, e.g.
 *   if_pride_style1_final.md  → story "pride", variant "style1"
 *   if_pride_style2_final.md  → story "pride", variant "style2"
 * The first line of each file is an H1 used as the display heading.
 *
 * Everything here runs at build time only; each consumer is statically
 * generated (see generateStaticParams in app/if/**).
 */

export interface IfVariant {
  story: string;
  variant: string;
  /** Human label for the variant, e.g. "Strict Reformatting (Style 1)" */
  variantLabel: string;
  /** Full first-line heading, e.g. "Pride IF — Strict Reformatting" */
  heading: string;
  /** Portion of the heading after the dash */
  title: string;
  body: string;
  filePath: string;
}

export interface IfStory {
  story: string;
  /** Display name for the story, e.g. "Pride IF" */
  label: string;
  variants: IfVariant[];
}

const REPO_ROOT = process.cwd();
const FILENAME_RE = /^if_([a-z0-9]+)_([a-z0-9]+)_final\.md$/i;
const IGNORE_DIRS = new Set(["node_modules", ".next", ".git", "public", "out"]);

/** Known display labels; unknown slugs fall back to a derived label. */
const STORY_LABELS: Record<string, string> = {
  pride: "Pride IF",
};
const VARIANT_LABELS: Record<string, string> = {
  style1: "Strict Reformatting (Style 1)",
  style2: "Literary Adjustment (Style 2)",
};

function storyLabel(story: string): string {
  return STORY_LABELS[story.toLowerCase()] ?? `${story.charAt(0).toUpperCase()}${story.slice(1)} IF`;
}

function variantLabel(variant: string): string {
  return VARIANT_LABELS[variant.toLowerCase()] ?? variant;
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

function parseFile(filePath: string): IfVariant {
  const basename = path.basename(filePath);
  const match = basename.match(FILENAME_RE);
  if (!match) throw new Error(`Unexpected IF filename: ${basename}`);
  const story = match[1].toLowerCase();
  const variant = match[2].toLowerCase();

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
    heading = `${storyLabel(story)} — ${variantLabel(variant)}`;
    bodyLines = lines;
  }
  while (bodyLines.length && bodyLines[0].trim() === "") bodyLines.shift();

  const { title } = splitHeading(heading);

  return {
    story,
    variant,
    variantLabel: variantLabel(variant),
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
  const variants = files.map(parseFile);

  const byStory = new Map<string, IfVariant[]>();
  for (const v of variants) {
    if (!byStory.has(v.story)) byStory.set(v.story, []);
    byStory.get(v.story)!.push(v);
  }

  const stories = Array.from(byStory.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([story, vs]) => ({
      story,
      label: storyLabel(story),
      variants: vs.sort((a, b) => a.variant.localeCompare(b.variant)),
    }));

  cached = stories;
  return stories;
}

export function getIfStory(story: string): IfStory | undefined {
  return getIfStories().find((s) => s.story === story.toLowerCase());
}

export function getIfVariant(story: string, variant: string): IfVariant | undefined {
  return getIfStory(story)?.variants.find((v) => v.variant === variant.toLowerCase());
}

import type { SearchItem } from "@/lib/chapters";

export function getIfSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const s of getIfStories()) {
    for (const v of s.variants) {
      items.push({
        href: `/if/${v.story}/${v.variant}`,
        context: `IF Story · ${v.variantLabel}`,
        title: `${s.label} — ${v.title}`,
        heading: v.heading,
        kindLabel: v.variantLabel,
      });
    }
  }
  return items;
}
