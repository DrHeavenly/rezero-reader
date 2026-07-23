# Claude Code Prompt — Re:Zero Reformatted Web Novel Reader

Paste everything below the line into Claude Code, run from inside the `rezero web novel app` project folder.

---

## Task

Build a **Vercel-ready web app** that displays the reformatted Re:Zero web novel as a clean, professionally-typeset reading experience. This is a **reader front-end only** — it renders the already-processed chapter files; it does not edit or reprocess them.

## Stack (use exactly this unless something is impossible)

- **Next.js (App Router) + TypeScript**, deployable to Vercel with zero config (`vercel deploy` / connect-repo just works).
- **Tailwind CSS** for styling.
- Chapters are read from the project's Markdown files at **build time** (static generation) — parse the `.md` with `gray-matter` + `remark`/`react-markdown`. No database, no CMS, no runtime file I/O.
- Keep it a single Next.js app inside this repo (put the app in an `app/` Next project; do not fetch anything from a network).

## Data source — read the real files in this repo

The novel is stored as Markdown files produced by an editing pipeline (see `CLAUDE.md`). The canonical, approved text for any chapter is the file ending in **`_final.md`**. Ignore the pipeline's other artifacts (`_raw.md`, `_fmt.md`, `_edited.md`, `_changelog.md`) — the reader must **only** load `*_final.md`.

**File naming:** `arcNN_chNNN_final.md` for chapters, `arcNN_intNN_final.md` for interludes (e.g. `arc06_ch003_final.md`). Files may sit flat in the repo root or under `arcNN/` subfolders — **glob recursively** so both layouts work (`**/*_final.md`).

**Chapter file shape:** the first line is a Markdown H1 of the form `# Chapter N — Title` (or `# Interlude — Title`). The rest is the chapter body in Markdown (prose paragraphs, `***` scene breaks, `>` blockquotes for letters/documents, `_italics_` for interior monologue). Example first lines from a real file:

```
# Chapter 3 — The Little Girl's Cell

???: "How did your talk with Master go?"

Subaru: "You could say that it went the same as usual..."
```

**Parsing rules:**
- Arc number comes from the `arcNN` in the filename; chapter/interlude number from `chNNN` / `intNN`. Use these for grouping and sort order (arc ascending, then chapter number ascending, interludes sorted into position by their number).
- Chapter display title comes from the H1 line (strip the leading `# `). Fall back to "Chapter N" if no H1.
- Render `***` on its own line as a centered scene-break ornament (spaced asterisks or a small centered glyph), not a horizontal rule.
- Render the H1 as the chapter's own heading in the reading view; don't duplicate it in the body.
- The app must **not** crash or drop chapters if only one arc / one chapter exists right now (today the repo may contain a single chapter — build so that dropping in more `*_final.md` files later requires zero code changes).

## Screens & navigation (three levels + search)

1. **Library / home** — lists **all arcs** present in the data. Each arc is a card/row showing the arc number, arc title, and chapter count. Clicking an arc opens its chapter list.
2. **Arc view** — lists **all chapters (and interludes) of that arc** in reading order, each linking to the reading view. Show chapter number + title. Include a link back to the library and prev/next arc navigation.
3. **Reading view** — the chapter itself, in **novel format** (spec below). Include: chapter title heading, the prose, and **previous / next chapter** navigation that flows across arc boundaries (last chapter of arc 6 → first chapter of arc 7). Also a link back to the arc and to the library.
4. **Search** — a persistent **search bar** (in the top nav / header on every page) that lets the reader **jump to any chapter**. It searches across arc number, chapter number, and chapter title (e.g. typing "cell", "6-3", "chapter 3", or "interlude" surfaces matches). Selecting a result navigates straight to that chapter's reading view. Client-side search over a prebuilt index of all chapters is fine — no external search service.

Routes suggestion: `/` (library), `/arc/[arc]` (arc view), `/arc/[arc]/[chapter]` (reading view). Generate them statically from the parsed files.

## Novel-format reading view (match the reference)

The reading view should feel like the reference screenshot of a manuscript reader: a **dark theme**, **serif body type**, a **single narrow centered reading column** with generous line-height and comfortable margins, soft off-white text on a near-black background — calm, page-like, nothing that trips the eye. Specifically:

- Dark background (near-black, e.g. `#141414`–`#1a1a1a`), body text a soft light gray/off-white (not pure white).
- **Serif** reading font (e.g. a Georgia/"Iowan"/Charter-style stack, or a Google serif like Lora/Source Serif) for the prose; a quiet sans-serif is fine for chrome/nav.
- Reading column capped around **60–72ch** width, horizontally centered, with `line-height` ~1.7 and clear paragraph spacing. First-line indents optional but keep it book-like and uncluttered.
- Scene breaks (`***`) render as a centered, spaced ornament with breathing room above/below.
- Blockquotes (letters/documents) visually set off (indented, slightly different tone), roman type.
- Interior-monologue italics render as italics.
- Responsive: comfortable on desktop and mobile (column just narrows; nav collapses sensibly).
- A subtle left sidebar or top bar for navigation is welcome but the **prose column is the focus** — mirror the reference's calm, centered, distraction-light layout. A light/dark toggle is a nice-to-have, not required; default to dark.

## Quality bar / constraints

- Do **not** alter, "improve", or re-typeset the chapter text — render the Markdown as-is. The app is a viewer.
- No secrets, no env vars required to run. `npm install && npm run dev` works locally; `npm run build` succeeds cleanly; the repo is deployable to Vercel as-is.
- TypeScript strict, no build warnings that block deploy. Reasonable component structure. A short `README.md` explaining how to add new chapters (just drop `*_final.md` files in) and how to deploy to Vercel.

## Definition of done — verify each before you finish

1. **Working front-end in novel format** — `npm run build` succeeds and the reading view renders a chapter with the dark, serif, centered, book-like layout described above (matching the reference reader). Confirm by building and loading the real `arc06_ch003_final.md` chapter.
2. **Search bar jumps to any chapter** — a header search box finds chapters by arc/number/title and navigates to the reading view. Confirm it resolves at least one query end-to-end.
3. **Full hierarchy present** — the library lists **all arcs**, each arc view lists **all of that arc's chapters/interludes**, and prev/next flows across the whole novel. Confirm that adding another `*_final.md` file (try duplicating the sample as a throwaway `arc06_ch004_final.md`, build, then delete it) makes it appear with no code changes.
4. Static generation works (no runtime filesystem reads) and the project is Vercel-ready.

Build it, run `npm run build` to prove it compiles, and report the routes generated.
