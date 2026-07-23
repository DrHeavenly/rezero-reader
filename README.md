# Re:Zero Reader

A static Next.js (App Router) reading app for the reformatted Re:Zero web novel. It is
a **viewer only** — it renders the pipeline's approved `*_final.md` chapter files
exactly as written. It never edits, retypesets, or reprocesses the text.

## Stack

- Next.js 16 (App Router) + TypeScript (strict)
- Tailwind CSS v4
- `react-markdown` for rendering chapter Markdown
- Everything is statically generated at build time (`generateStaticParams`) — there is
  no database, no CMS, and no runtime filesystem access in production.

## Adding new chapters

Drop new `*_final.md` files anywhere in this repo — flat in the root, or nested under
an `arcNN/` folder, either works, since the file list is discovered by a recursive
scan at build time (`lib/chapters.ts`).

Filename format (case-insensitive):

```
arcNN_chNNN_final.md   e.g. arc06_ch003_final.md   → Arc 6, Chapter 3
arcNN_intNN_final.md   e.g. arc06_int02_final.md   → Arc 6, Interlude 2
```

File contents:

- The first non-blank line must be an H1 heading: `# Chapter 3 — The Little Girl's Cell`
  (or `# Interlude — Title`). The part before the dash becomes the short label shown
  in lists ("Chapter 3"); the part after becomes the chapter title. If there's no H1,
  the app falls back to "Chapter N" / "Interlude N".
- Everything else is the chapter body, rendered as Markdown:
  - A line containing only `***` becomes a centered scene-break ornament.
  - `> ...` blockquotes render as set-off documents/letters.
  - `_italic_` / `*italic*` renders as italic (interior monologue).
- No other pipeline artifacts (`_raw.md`, `_fmt.md`, `_edited.md`, `_changelog.md`)
  are read by the app — only files ending in `_final.md`.

Then just rebuild (`npm run build` or redeploy) — no code changes are needed. Arc and
chapter ordering, prev/next navigation, and the search index are all derived
automatically from the filenames and headings.

Arc titles default to "Arc N" since there's currently no separate source for arc-level
titles; update `getArcs()` in `lib/chapters.ts` if you want to supply real arc titles.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Deploying to Vercel

This is a zero-config Next.js app. Either:

- Connect the repo to Vercel (import project, framework preset "Next.js" is
  auto-detected), or
- Run `vercel` from this directory with the Vercel CLI.

No environment variables or secrets are required.
