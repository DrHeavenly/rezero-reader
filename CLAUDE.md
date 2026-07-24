# Re:Zero WN → Novel Overhaul — Rules for Claude

This file is the full ruleset. Read it, then do the work. Terse on purpose; not meant to be pretty.

## Mission
- Input: a Re:Zero web-novel chapter or IF story, English, from Witch Cult Translations (WCT). Sources live in `chapters/` (main story) and `if_routes/` (IF stories).
- Output: the same story, fully rendered so the page reads like the **official Re:Zero light novel** — a real, professionally published English novel: clean typography, confident pacing, natural dialogue, no translation stiffness. Write finals to `final_chapters/` and `final_if_routes/`.
- There is ONE job: a **complete render**. Reformat the page AND refurbish the language, so nothing reads as a mechanical English reconstruction of Japanese web-novel prose. Every chapter and IF story gets the full novel-quality treatment — no "light" or "typeset-only" mode.

## The cardinal rule — fidelity (never violate)
The WCT text is the sole source of *content*. The LN is the target *register* only — never a source of content.
- Never retranslate from Japanese. Never import scenes, lines, or phrasings from the LN, anime, wiki, later chapters, or your own memory of Re:Zero. If WCT's text for this chapter doesn't say it, it doesn't exist.
- Preserve every plot beat, decision, revelation, and **deliberate ambiguity**, in order. An unattributed `???` speaker stays unidentified; an unclear referent stays unclear. Fluency must never resolve an ambiguity the source keeps open.
- Add nothing: no new imagery, sensory detail, gesture, motive, transition, or clarifying phrase the source lacks. Cut nothing except pure translation-artifact redundancy (the same thing said twice only because of the language transfer).
- **Don't over-edit.** You rebuild sentences and paragraphs; you do NOT rewrite the story, sharpen/soften characters, "fix" apparent plot errors, or improve on the author's intent. If a passage is flat, blunt, cruel, verbose, or weird on purpose, keep it exactly that. "I'd have written it differently" is never a reason to change anything.
- Something genuinely wrong (suspected typo, continuity error, missing/garbled text): flag it, don't fix from memory. When unsure: do less.

## What a complete render includes
- **Rebuild paragraphs.** WCT arrives as long runs of one-sentence paragraphs (screen-serialization habit). Merge into real book paragraphs: same speaker/mode, one continuous moment, ≤ ~6 sentences / ~120 words. Never merge across a speaker change, a scene break, a mode change (narration / dialogue / interior thought), or a discourse reset ("The next morning,"). Keep a one-line paragraph isolated when it deliberately lands a beat (revelation, death, punchline, emotional pivot).
- **Rewrite calque/awkward prose** into natural English *for the same meaning*: topic-fronting ("As for the door, it was open" → "The door was open"), stacked hedges, redundant restatement, dangling/misattached modifiers, unwanted passives, pronoun/subject overload, accidental stock-phrase calques — but only where it's translation noise, not an authorial choice.

## Formatting
- Markdown for a book toolchain: one paragraph per block, single blank line between, no hard line breaks inside a paragraph, no trailing/double blank lines except around `***`.
- **Scene break:** a line of exactly `***` (blank line above and below). One kind only. Always break at: scene/location change; non-trivial time skip; POV/focal-character change; any death/loop reset; entering or leaving a dream/vision/memory/trial. Convert source dividers (`◆◆◆`, `※`, horizontal rules) to `***` only where a real break belongs there; otherwise drop them.
- **Interior monologue** (the character's actual silent words, first person): *italics, no quotes*, no added "he thought" (keep tags the source already has, in roman). Third-person narrated thought stays roman. Remove the source's thought markers (dash pairs, parentheses-as-thought) — the italics carry it.
- **Emphasis:** *italics only*, never bold. Shouting is carried by the words + a sparing `!`. Keep ALL-CAPS only where the typography itself is the device (inhuman/mechanical voice); otherwise normalize to italics.
- **Dialogue:** American double curly quotes; single for quotes-within-quotes. New paragraph per speaker. Terminal punctuation inside the quote. Interrupted speech: em dash before the closing quote; trailing off: `…` before it. A lone `"…"` (silent beat) stands as its own paragraph.
- **Punctuation normalize:** `……` / `...` runs → single `…`; `――` / `--` → em dash `—` (set closed, no surrounding spaces); straight quotes/apostrophes → curly.
- **Set-apart text** the characters read (letters, notes, gospel pages, inscriptions, contracts, trial pronouncements, chanted incantations) → Markdown blockquote (`>`), roman.
- **Numbers:** spell out one–one hundred and any number opening a sentence; numerals for precise larger values. Times spelled out ("just past ten") unless the source gives deliberate precision. Never change an actual quantity.
- **Delete serialization artifacts entirely:** translator/TL notes, part markers ("Part 2 of 3"), edited/unedited banners, next/prev links, donation/credit lines, site nav, platform recaps, and writing-app scaffolding (`# My Book`, `## Chapter One`, `### Scene One`).
- **Chapter heading:** `# Chapter N — Title` (WCT's title, wording unchanged; title-case ok). Interludes/side chapters: `# Interlude — Title`.

## Dialogue attribution — the #1 recurring flaw
WCT renders dialogue as script cues (`Name: [text]`, `Name:「text」`, `???: [text]`). Convert these into real novel-prose dialogue. This is the single largest change and must be **composed line by line**, not stamped from one formula.
- Mix four shapes across an exchange, never defaulting to one: (a) **no tag**, when a clean two-person volley makes the speaker obvious; (b) an **action/description beat** that shows who's speaking and also characterizes; (c) plain **`said`/`asked`**, its position varied (before / mid-sentence at a natural breath / after); (d) an **evident-tone verb** (`muttered`, `cried`, `put in`) — only when the line's own content already carries that tone. Never reach for "retorted/sneered/protested" to add a colour the source doesn't support (that's invention).
- Hold two guardrails at once. **Monotony ceiling:** no two adjacent attributions take the same shape; the mid-sentence `"…," Name said, "…"` split is used sparingly, never as the default. **Clarity floor:** the reader must never have to count backward to know who's speaking — reinsert a name or beat when a third voice enters, ~3 untagged turns pass, a beat could be read as another character's, or a run of short lines blurs the thread.
- **Preserve source ambiguity:** where WCT leaves a speaker unattributed, keep it unattributed — never invent a name, never manufacture ambiguity by accident.

## Prose — the tells to avoid
Never introduce these; repair only where the source instance is translation noise:
- No signposting/connective scaffolding ("Indeed," "Moreover," "In that moment," "Little did he know").
- One hedge maximum where the source hedges once; never add hedges to soften a blunt line.
- No rule-of-three triads ("cold, dark, and silent") the source didn't have.
- Repeat the clearest word — no synonym-cycling (source says "sword" four times → say "sword" four times; this also protects glossary terms, which have one rendering each).
- Em dash for real interruption/appositive only, not a rhythm crutch; ~one pair per paragraph unless the source itself is dashed.
- No added vague intensifiers ("very, truly, incredibly, somehow, quite"); remove them only as pure filler; keep them where they're a character's voice.
- No added filler verbs ("proceeded to," "began to," "found himself," "couldn't help but") where the action simply happens.
- Preserve the source's show/tell balance and its psychic distance (how deep in the character's head the camera sits) — don't zoom in (add interiority) or out (add objective distance).
- Keep concrete sensory detail intact; never abstract it away, never add it.
- Vary sentence length toward the source's own uneven pulse (speech and thought are uneven); don't impose a metronome.
- Don't compress or summarize for tempo — pacing is the author's.

## Voice
Each character keeps a distinct register. Before editing dialogue or focalized narration, read the character's voice note in `GLOSSARY.md` and edit against it, not against generic "good English." Signature tics/catchphrases render identically every time (repetition is the point). Subaru's pop-culture riffing, Roswaal's drawl, Beatrice's "…, I suppose / …, in fact," Emilia's earnest simplicity, Meili's drawn-out vowels + "onii-san," Anastasia's dialect, Petelgeuse's mania — these are features, not noise. If a recurring character has no voice note, stay conservative and add one to the glossary.

## Names & terminology
- Use `REZERO_KNOWLEDGE_BASE.md` for canonical English spellings (e.g. Petelgeuse, Bowel Hunter, Priestella, Julius Juukulius, Sin Archbishop, Guiltylowe, Meili) and `GLOSSARY.md` for per-name/term decisions + voice notes. Fix clearly-troubled source spellings to canonical; leave established WCT house-style spellings (e.g. "Reinhardt," "Lugnica") unless the KB/glossary overrides.
- Honorifics stay exactly as WCT attaches them, never localized (`-sama`, `-kun`, `onii-san`, `Emilia-tan`). Invented proper nouns (Return by Death, Witch of Envy, Sword Saint, Divine Protection, the Sanctuary, spell names) are roman, capitalized per glossary, not italicized.

## Craft target
Destination = how the published Re:Zero LN reads. Toolkit for reaching it = the English of the great translated realist novels (Dostoevsky's *Crime and Punishment* — Garnett / McDuff / Pevear & Volokhonsky): elastic sentence length as the engine of pace (long accreting sentences for a racing mind, a short blunt one for a shock); free indirect discourse where the source content is already the character's own perception; expressive but sparing punctuation; deliberate repetition over elegant variation; concrete detail that anchors feeling; purposeful (not reflexive) perception-hedging; individuated speech; ragged interruptions left ragged. Both the LN and these novels are quality bars to *emulate*, never texts to quote or fetch (both copyrighted).

## Files & workflow
- Raws (never modify): `chapters/arc_N/arcNN_chNNN_raw.md`, `if_routes/<story>_if_route.md`.
- Finals (feed the reader app): `final_chapters/arc_N/arcNN_chNNN_final.md`, `final_if_routes/if_<story>_final.md`.
- `GLOSSARY.md` and `REZERO_KNOWLEDGE_BASE.md` are shared state — consult both every run; propose additions whenever you settle a new name, term, or voice.
- Finish every render with a final craft read purely for rhythm, word choice, and the dialogue-attribution balance — not just fidelity.
