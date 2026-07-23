# Chapter Changelog — Arc 6, Chapter 3 ("The Little Girl's Cell")

**Node:** Node 1 — Structural/Formatting
**Pass date:** 2026-07-23
**Input:** `arc06_ch003_raw.md`
**Output:** `arc06_ch003_fmt.md`

Node 1 applied CLAUDE.md §3 in full. Per §3.11, Node 1 ran the empty-word-diff self-check (raw chapter body — excluding the Quickdraft boilerplate and the numbered translator's notes, both removed per §3.10 — vs. formatted output, excluding the newly-supplied heading line) with all markup, punctuation, quotes, brackets, ellipses, dashes, and whitespace stripped and both sides lowercased. **The check passed: the word sequences are identical (5,906 words each, zero positional mismatches).** No word was added, removed, or reordered anywhere in the chapter body.

Routine mechanical formatting (dash/ellipsis/quote normalization per §3.6, bracket-to-quote dialogue conversion per §3.7, ordinary paragraph consolidation per §3.2 with no ambiguity) is not itemized below per §2.5 — only judgment calls are logged, per §7.4.

---

FLAG | ¶heading | The raw file opened with Quickdraft-tool boilerplate ("# My Book" / "## Chapter One") and closed with an empty "### Scene One" heading with no content — none of this is WCT's text. Per instructions accompanying this run, these were treated as serialization/tooling artifacts under the spirit of §3.10 (not literally enumerated there, since §3.10 doesn't anticipate a third-party compiling tool's template headers) and removed. The chapter heading was replaced with `# Chapter 3 — The Little Girl's Cell`, sourced from WCT's own table of contents (bibliographic metadata, not invented) per §3.4. | This isn't explicitly covered by §3.3/§3.4/§3.10 as written — a compiling-tool boilerplate header is a new category of serialization artifact. | suggested owner: glossary-proposal — recommend a Decision Log entry standardizing how future Quickdraft-sourced `_raw.md` files (and any other third-party-tool-compiled sources) have their placeholder headers identified and replaced, so this judgment isn't re-derived chapter by chapter.

STR | ¶scene-break 1 | The source contains a divider (`※　※　※…`) after "…At least knock before you come i~n!" Evaluated against §3.3: the material immediately following it ("So yeah, this is the prisoner of this mansion…") picks up mid-conversation, past the initial door-opening/scolding beat, indicating a non-trivial time skip within the same room. Condition met — rendered as `***`. | §3.3 non-trivial time skip.

STR | ¶scene-break 2 | The second `※　※　※…` divider, after "…hidden her face with the panda in her embrace." The narration immediately following ("Subaru and the others' explanation ended, and Meili said those words…") explicitly signals that an unshown explanation occurred in the interval — a clear time skip. Condition met — rendered as `***`. | §3.3 non-trivial time skip.

STR | ¶dialogue-format | The raw source renders all speech as script-style cues: `Name: [dialogue]` (a Quickdraft parsing artifact, not WCT's usual inline-quote convention). Per run instructions, converted brackets to double curly quotes throughout (`Name: [text]` → `Name: "text"`), keeping the name-plus-colon exactly as the source already positions it (no invented dialogue tag/verb was added, since that would insert a word the source doesn't have). Every speaker turn already occupied its own paragraph in the source, satisfying §3.7's "new paragraph per speaker" requirement without further changes. Unattributed speakers marked `???:` in the source were left as `???:` — the ambiguity of who is speaking is preserved per §2.1/§3.7, not resolved. | §3.7 dialogue conventions; §2.1 ambiguity preservation. | suggested owner: glossary-proposal — this Quickdraft `Name: [...]` script format will likely recur in future raw files from the same tool; a Decision Log entry recording this exact conversion approach would keep it uniform across chapters.

STR | ¶“Everyone: [——]” | An unusual construct: the collective reaction of Emilia, Julius, and Anastasia is rendered as a dialogue-style line attributed to "Everyone," containing only a dash (no actual words) — apparently representing a wordless, tension-filled beat rather than literal speech. Not covered by §3.3/§3.7/§3.12's examples. Conservative treatment applied: mechanically converted brackets to quotes and the doubled dash to a single em dash (`Everyone: "—"`), changing no words, inventing no convention. | §3.12 unknown structure — most conservative treatment, no new convention invented. | suggested owner: glossary-proposal, so a Decision Log entry can specify how "wordless collective reaction" lines should be formatted if this recurs.

STR | ¶“—The door at the deepest part of the basement had no lock.” | This single-sentence narration paragraph (originally opening with a doubled dash) sits alone between two dialogue-adjacent narration blocks, immediately before the door is pushed open on Meili. Tested against §3.2 criterion 3 (deliberate isolation): the line carries clear heightened, portentous weight ahead of the scene's reveal, and the surrounding text pauses on it. Left un-merged, standing as its own isolated beat. | §3.2 criterion 3 (deliberate isolation of a dramatic beat).

STR | ¶Julius’s underground-space beat | The narration "…After briefly taking a look at that underground space," is Julius's own action immediately preceding his own next line of dialogue ("Nevertheless, I had assumed…"). Per §3.2's action-beat-attachment rule (a beat describing the *speaker's* action joins that line's paragraph), this beat was folded into the same paragraph as Julius's dialogue tag rather than left as a separate narration paragraph. Similarly, Emilia's action beat "Emilia lowered her eyebrows, her visage complex." (immediately following her own line) was attached to her preceding dialogue paragraph on the same principle. | §3.2 action-beat attachment.

STR | ¶emphasis markup | The source used HTML underline markup, `<u>ultra cool</u>`, around a phrase in one of Subaru's lines. Per §3.6 (italics only; bold/underline never used for emphasis in prose), converted to italics: `*ultra cool*`. No wording changed. | §3.6 emphasis convention.

FLAG | ¶Translation Notes | The five numbered translator's notes at the end of the raw file (word-choice/wordplay explanations for "Tarepanda," "Hikikomori," the Arc 4 Elsa/Meili continuity note, and the "Lolimancer" title note) are TL-note asides explaining Japanese wordplay and translation choices, not narrative content. Per §3.10 (translator's notes are deleted without per-instance logging) and per explicit run guidance, these were deleted along with their inline footnote markers (`[1]`–`[5]`) in the body text. Flagged here only for visibility, since this is a five-note block rather than the single stray note §3.10 usually anticipates. | §3.10 serialization artifacts (translator's notes deleted).

---

**Paragraph consolidation (§3.2):** Applied throughout per the four merge criteria and the ~120-word/6-sentence cap. Most merges were unambiguous (continuous narration, same actor, no time/focus skip) and are not itemized individually per §2.5. Several narration runs that would have exceeded the word/sentence cap if fully merged (e.g., the stuffed-toy paragraph, the Insignia-incident/Roswaal paragraph, the mansion floor-plan description) were instead split into two smaller merged paragraphs each, staying under the cap rather than producing one oversized block — routine application of §3.2's numeric ceiling, not logged individually.

**Dash/ellipsis normalization (§3.6):** All instances of the doubled dash `——` were converted to a single closed em dash `—` (no surrounding spaces). All ellipsis instances in the source were already single-character `…` glyphs; none required collapsing. Not logged individually (mechanical).

**Quotes-within-quotes (§3.7):** Two instances of a nested quotation inside a dialogue line (Emilia's "‘without causing any trouble’" and Subaru's "‘An eye for an eye’") were converted from the source's double curly quotes to single quotes, since the outer dialogue brackets became double curly quotes. Mechanical application of §3.7, not logged individually.

**Preserved as-is (no correction attempted):** Anastasia's line containing the doubled word "that that" (source phrasing, possible typo) was left completely untouched — typo repair is Node 2's domain, not Node 1's, per §3.11. Similarly, "It ‘d be nice" (an odd mid-word space before the apostrophe in the source) was preserved exactly as written rather than silently rejoined, to avoid any word/spacing-level alteration outside Node 1's mandate.

**Interior monologue (§3.5):** No passages in this chapter met the direct-interior-monologue test (nothing renders as verbatim unspoken first-person speech set off from the surrounding text). All first-person "thought"-adjacent content is either spoken dialogue (already bracketed/attributed by the source) or ordinary narrated interiority ("he felt," "he wondered") and was left as roman narration. Nothing was italicized under §3.5.

**Inserted documents (§3.8):** None present in this chapter.

**Numbers/times (§3.9):** No digital-precision times or large numerals requiring dress normalization were present; ages and counts already appear spelled out in the source.

---

**Node:** Node 2 — Translation-Editing
**Pass date:** 2026-07-23
**Input:** `arc06_ch003_fmt.md`
**Output:** `arc06_ch003_edited.md`

Node 2 applied CLAUDE.md §4 sentence by sentence. Default action was no action; every logged edit below cleared the two-question gate (§4.2: Q1 noise-vs-choice, Q2 meaning/ambiguity preserved) and, for dialogue/focalized narration, Q3 (no ratified voice notes exist yet, so all dialogue and character-voiced narration was treated maximally conservatively — no dialogue line was altered anywhere in this chapter).

**Edit-density estimate: ~10–12%** (approximately 31 logged substantive edits against an estimated ~260–280 sentences in a 5,906-word chapter, per §2.2's guideline of roughly one in four). Density sits well under the ceiling. Cause, for transparency rather than as an escape-hatch justification: almost all logged edits are mechanical grammar/preposition/verb-form repairs (subject-verb agreement, lie/lay, dangling prepositions, a missing correlative "neither," a couple of likely source typos) rather than stylistic rewrites — this chapter's calque density in narration (topic-fronted constructions, resumptive pronouns, passive-with-known-actor patterns) is real and is called out specifically in the edits below, not asserted generally.

Self-check per §4.6: the full edited chapter was re-read once against the §4.4 checklist, specifically hunting for tells introduced by editing — no signposting, hedge-stacks, rule-of-three triads, synonym-cycling, em-dash additions, added intensifiers, filter-word insertions, or resolved ambiguity were found. All unattributed `???:` speaker tags, the deliberately unresolved trailing sentence in ¶S2, and every dialect/tic spelling were left untouched.

**Logged edits:**

¶S1 | "and was questioned about its meaning" → "and she asked what it meant" | CAL | §4.3 passive drift repaired — actor (Frederica) is the only plausible referent in context, matching the licensed active-voice conversion example.

¶S1 | "At Pristella was a family that Garfiel worried about" → "In Pristella there was a family that Garfiel worried about" | CAL | §4.3 topic-fronted/locative-inversion construction resolved to natural English word order.

¶S1 | "Subaru, too, was also no exception." → "Subaru, too, was no exception." | RED | §4.3 redundant restatement — "too" and "also" doubled the same meaning in one sentence.

¶S1 | "Once that mental frailness were overcome" → "Once that mental frailness was overcome" | GRM | §4.3 subject-verb agreement.

¶S1 | "...Roswaal mansion, however, the basement part of the eastern wing—this was the only place that was starkly different." → "...Roswaal mansion. However, the basement part of the eastern wing was the only place that was starkly different." | CAL+GRM | §4.3 comma splice corrected and resumptive-pronoun topic-fronting ("—this was") resolved.

¶S1 | "Anastasia snorted her nose" → "Anastasia snorted through her nose" | GRM | §4.3 preposition misfire.

¶S1 | "as they exchange these words" → "as they exchanged these words" | GRM | §4.3 tense wobble.

¶S1 | "he had steeled himself for what laid ahead" → "...what lay ahead" | GRM | §4.3 lie/lay verb-form error.

¶S1 | "a stone pathway laid in front" → "a stone pathway lay in front" | GRM | §4.3 lie/lay verb-form error (same recurring pattern as above).

¶S1 | "opened her round, large eyes" → "opened her large, round eyes" | CAL | §4.3 calque-y adjective order (English words in Japanese arrangement) normalized to natural English adjective sequencing.

¶S1 | "Emilia-tan, Emilia tan, you're gonna make" → "Emilia-tan, Emilia-tan, you're gonna make" | TERM | §4.6 source typo in a repeated honorific/nickname corrected to a single consistent form; flagged for glossary proposal below.

¶S2 | "he spoke this as if blaming Subaru" → "he spoke as if blaming Subaru" | CAL | §4.3 dangling forward-reference pronoun ("this") removed; no content lost, dialogue it referred to follows in its own paragraph regardless.

¶S2 | "misgivings of Subaru's justifications" → "misgivings about Subaru's justifications" | GRM | §4.3 preposition misfire.

¶S2 | "decided to hurry up and bring out the last resort as quickly as possible" → "decided to bring out the last resort as quickly as possible" | RED | §4.3 redundant restatement — "hurry up" and "as quickly as possible" doubled the same urgency.

¶S2 | "free to do whatever she pleased with how she wasn't even restrained" → "free to do whatever she pleased, unrestrained as she was" | CAL | §4.3 calque-y "with how" construction resolved to natural English without altering the original's causal weight.

¶S2 | "Fulfilling the role of a Witchbeast's horn—the meaning of that was obscure." → "The meaning of fulfilling the role of a Witchbeast's horn was obscure." | CAL | §4.3 topic-fronting + resumptive "that" resolved.

¶S2 | "There's a thing such as idle malicious intent" → "There's such a thing as idle malicious intent" | CAL | §4.3 calque-y idiom word order corrected to the standard "such a thing as" construction.

¶S2 | "would agree with that that?" → "would agree with that?" | GRM | §3.11/§4.6 duplicated-word source typo corrected (Node 1 had explicitly left this untouched per its own changelog note, deferring it to Node 2).

¶S2 | "clean judgement was not taken into consideration, then any crime would be judged to as a crime" → "clean judgement was not taken into consideration, any crime would be judged as a crime" | CAL+GRM | §4.3 resumptive "then" (topic-fronting) removed and extraneous preposition "to" corrected.

¶S2 | "Subaru matched his eyesight with hers" → "Subaru matched his gaze with hers" | CAL | §4.3 mistranslated word ("eyesight" used for eye contact/gaze) corrected to the natural English word for the same meaning.

¶S2 | "Subaru, nor anyone else, pointed out" → "Neither Subaru nor anyone else pointed out" | GRM | §4.3 missing correlative conjunction "Neither" restored.

¶S3 | "carried quite some weight in regards to just how much" → "carried quite some weight regarding just how much" | GRM | §4.3 nonstandard preposition phrase corrected.

¶S3 | "as for the counter for the Witchbeast Den, this was what they wanted to prepare a measure for" → "what they wanted to prepare a countermeasure for was the Witchbeast Den" | CAL | §4.3 doubled topic-fronting construction ("as for X... this was") resolved to a single natural cleft sentence.

¶S3 | "if there no such thing as childish exaggeration" → "if there was no such thing as childish exaggeration" | GRM | §4.3 missing verb "was" restored.

¶S3 | "Just how had nobody ever been able to slip by this person, it was honestly..." → "Just how had nobody ever been able to slip by this person? It was honestly..." | GRM | §4.3 comma splice corrected by restoring the first clause as the rhetorical question its own grammar signals.

¶S3 | "He was surprised with Meili being conscious" → "He was surprised by Meili being conscious" | GRM | §4.3 preposition misfire.

¶S3 | "was multitudes larger" → "was multiples larger" | GRM | §3.11/§4.6 likely source typo ("multitudes" for "multiples") corrected.

¶S3 | "so much time to think, that the silence would become scary" → "so much time to think that the silence would become scary" | PUNC | §4.4 comma removed from a "so...that" construction that takes none; beyond Node 1's mechanical punctuation rules.

¶S3 | "The girl, the receptor of their words" → "The girl, the recipient of their words" | CAL | §4.3 wrong-word calque ("receptor" for "recipient") corrected to the natural English word for the same meaning.

¶S3 | "Right as he did however, the door was opened" → "Right as he did, however, the door was opened" | PUNC | §4.4 comma placement corrected around the parenthetical "however."

¶S3 | "Another fuzz was made again" → "Another fuss was made" | GRM+RED | §3.11/§4.6 likely source typo ("fuzz" for "fuss") corrected; redundant "again" (doubling "another") removed per §4.3.

**FLAG notes:**

FLAG | ¶S1 "His mediation was about to go to waste" | Subaru's own preceding line calls it his "monologue," but the narration immediately after calls the same thing his "mediation" — these do not obviously mean the same thing, and I cannot confirm which word (if either) is the intended one without consulting the raw source or reconstructing from outside knowledge, both of which are outside my mandate. | §2.1 — never fixed from memory; not confidently identifiable as a typo of a specific word. | suggested owner: Review (check against `_raw.md`); if confirmed a typo, route the specific correction to Node 2 for the next cycle.

FLAG | ¶S2 "Ignoring those all-suspecting men" | Only Julius is described as suspicious/having misgivings in the surrounding text; "men" (plural) has no clear second referent unless it's meant to include Subaru or is a generic plural. Left untouched — resolving which is intended would be an interpretive act. | §2.1 ambiguity/possible error not resolved from memory. | suggested owner: Review (check against `_raw.md` for singular/plural in source).

FLAG | ¶S2 "Darepanda" (stuffed toy name) | Node 1's changelog records deleting a translator's note explaining wordplay on "Tarepanda" — and the surrounding text describes the toy as merging "the panda theme with a 'lazy from the heat' taste," which matches the Tarepanda (lazy/drooping panda) pun, not "Darepanda." This looks like a likely transcription typo, possibly introduced during Node 1's pass rather than present in WCT's own text — which would make it a Check A matter, not something I'm positioned to silently correct. | §2.1 — not confidently reconstructable as one specific correction without the raw file; possible Node 1 word-diff issue rather than a source typo. | suggested owner: Review (compare `_fmt.md` against `_raw.md` for this exact word); if it is a Node 1 transcription error, route to Node 1; if it is a genuine source typo, route back to Node 2 to correct and log.

FLAG | ¶S2 "Banishing her would mean she would receive punishment—those would be her own personal affairs, and even though Subaru and the others were completely unrelated to that," | This sentence trails off into a comma with no resolution before Subaru's next dialogue line. Left completely untouched — completing or repunctuating it would be an interpretive act, and it may be a deliberate device (thought interrupted by dialogue) rather than an error. | §2.1/§4.6 — not resolved from memory or inference. | suggested owner: Review (check against `_raw.md` to confirm whether this is WCT's own construction).

FLAG | ¶S3 "Anastasia being Eridna" | GLOSSARY.md's pre-existing (unratified) placeholder note lists "Anastasia Hoshin/Echidna" as a candidate name pairing, but this chapter's text consistently renders the name "Eridna," not "Echidna." Per §2.1 I have not silently corrected this from outside knowledge of the series — I'm proposing "Eridna" as the candidate Names & Romanization entry exactly as it appears in this chapter, since this is the first chapter processed and there is no established WCT precedent yet to weigh it against. | §2.1 — no node may use background knowledge of the series to resolve a spelling. | suggested owner: Review — verify which spelling is WCT's own established usage (this may require checking WCT's actual published chapters, not memory) before ratifying either form as canonical.

FLAG | ¶S2 "Hikikomori" not italicized | Per §3.6, a romanized Japanese common noun WCT leaves untranslated should be italicized on first appearance per chapter, roman thereafter. This word appears in roman type with no italics anywhere in `_fmt.md`. This is Node 1's typography domain (structure/typography is frozen for Node 2) — I have not added italics myself. | §3.6 (Node 1 formatting spec); §4.6 (Node 2 does not fix Node 1's structural/typographic choices, only flags them). | suggested owner: Node 1 / Review.

---

**PROPOSED GLOSSARY ENTRIES** (awaiting Review ratification — none of the below are binding until ratified per §5.7)

*Names & Romanization (candidates, first chapter seen: Arc 6 Ch. 3):*

| Canonical form (proposed) | Variants seen in source | First chapter seen | Notes |
|---|---|---|---|
| Natsuki Subaru | Subaru | Arc 6 Ch 3 | Protagonist/narrator. |
| Emilia | — | Arc 6 Ch 3 | |
| Julius | Juukulius (per pre-existing glossary placeholder note, not seen spelled out in this chapter's text) | Arc 6 Ch 3 | |
| Anastasia | Anastasia Hoshin (surname not used in this chapter's text) | Arc 6 Ch 3 | Associated name rendered "Eridna" in this chapter's text — see FLAG above re: possible discrepancy with the glossary's placeholder "Echidna." Needs Review verification before either spelling is ratified. |
| Frederica | Frederica Baumann (surname not used in this chapter's text) | Arc 6 Ch 3 | |
| Meili | Meili Portroute (surname not used in this chapter's text) | Arc 6 Ch 3 | |
| Garfiel | "Garf" (nickname, used by Frederica) | Arc 6 Ch 3 | |
| Roswaal | — | Arc 6 Ch 3 | |
| Ryuzu | — | Arc 6 Ch 3 | Named only, does not appear on-page. |
| Elsa | — | Arc 6 Ch 3 | Named only (deceased), does not appear on-page. |
| Mimi | — | Arc 6 Ch 3 | Named only, does not appear on-page. |
| Mathers | "the ancient Mathers bloodline" | Arc 6 Ch 3 | House/family name. |

*Terminology:*

| Term | Canonical rendering | Type | Capitalization | Italics? | Source of decision |
|---|---|---|---|---|---|
| Confinement Room | Confinement Room | place | Title Case | No | Arc 6 Ch 3 |
| Witchbeast | Witchbeast | creature/faction | Capitalized | No | Arc 6 Ch 3 |
| Witchbeast Master | Witchbeast Master | title/epithet | Title Case | No | Arc 6 Ch 3 |
| Witchbeast Den | Witchbeast Den | place | Title Case | No | Arc 6 Ch 3 |
| Desert Labyrinth | Desert Labyrinth | place | Title Case | No | Arc 6 Ch 3 |
| Sage's Eye | Sage's Eye | place/entity | Title Case | No | Arc 6 Ch 3 |
| the Sage | the Sage | title/epithet | Capitalized ("Sage") | No | Arc 6 Ch 3 |
| Miasma | Miasma | magic/phenomenon | Capitalized | No | Arc 6 Ch 3 |
| Pleiades Watchtower | Pleiades Watchtower (shorthand "the Watchtower" acceptable after first mention) | place | Title Case | No | Arc 6 Ch 3 |
| Augria Sand Dunes | Augria Sand Dunes | place | Title Case | No | Arc 6 Ch 3 |
| White Whale | White Whale (shorthand "the Whale" acceptable after first mention) | creature/epithet | Title Case | No | Arc 6 Ch 3 |
| Bowel Hunter | Bowel Hunter | creature/epithet | Title Case | No | Arc 6 Ch 3 |
| Eight Arms | Eight Arms | creature/epithet | Title Case | No | Arc 6 Ch 3 |
| Witch's Lingering Scent | Witch's Lingering Scent | magic/phenomenon | Title Case | No | Arc 6 Ch 3 |
| Lolimancer | Lolimancer | nickname/epithet (Subaru) | Title Case | No | Arc 6 Ch 3 |
| Hikikomori | Hikikomori | romanized Japanese common noun | Capitalized as a loanword | Yes — italicize on first appearance per chapter per §3.6 (currently NOT italicized in `_fmt.md`; see FLAG above) | Arc 6 Ch 3 |
| Insignia incident | Insignia incident | event name | Title Case ("Insignia") | No | Arc 6 Ch 3 |
| Darepanda / Tarepanda | UNRESOLVED — see FLAG above; do not ratify either spelling until checked against `_raw.md` | invented item/pun name | — | — | Arc 6 Ch 3 (provisional only) |

*Voice Notes (all provisional — one chapter of evidence only; propose re-review once each character has appeared in 2–3 chapters per §5.5):*

### Natsuki Subaru
- Register: informal, conversational, first-person self-narrating voice that bleeds into the surrounding third-person narration; rambling asides, meta/pop-culture-flavored self-commentary.
- Signature constructions: mid-sentence trailing-off ("There's that too, but."); rhetorical self-interruption and self-mockery; stacked exclamation points and short punchy retorts in dialogue; casual contractions ("gonna," "wanna," "dunno").
- Tics & catchphrases: "Emilia-tan" (affectionate nickname, always hyphenated); self-referential third-person naming ("Natsuki Subaru will..."); exclamatory rejection ("Okay, rejected!"); "*ultra cool*" as a self-aware catchphrase.
- Pronouns/address: calls Emilia "Emilia-tan"; addresses others by name/title as given to him.
- What NOT to "fix": his digressive, run-on narration voice and stacked exclamation points; self-deprecating exaggeration; informal register bleeding into third-person narration appears to be authorial/focalized, not translation noise — do not smooth it toward neutral prose.
- Evidence: Arc 6 Ch 3 only — provisional; needs corroboration from further chapters before being treated as stable.

### Emilia
- Register: earnest, simple, warm; elongates words for emphasis.
- Signature constructions: short repeated exclamations for emphasis ("I'm against it! I am against it!"); trailing ellipses when uncertain ("I-I'll try…?").
- Tics & catchphrases: vowel-elongation for enthusiasm ("reaaally"); doubled emphatic lines as deliberate repetition, not redundancy.
- Pronouns/address: uses first names, no honorifics of her own, for the party.
- What NOT to "fix": elongated-vowel spelling and doubled emphatic exclamations — both read like translation noise (repetition) but are voice/emphasis and must survive per §2.3.
- Evidence: Arc 6 Ch 3 only — provisional.

### Julius
- Register: formal, elevated, self-consciously courteous even when critical; long subordinate clauses; avoids contractions in most of his dialogue, with rare exceptions (this chapter has one: "it's," in "But do you think it's possible?").
- Signature constructions: hedged, multi-clause criticism; formal concessive openers ("Nevertheless," "Although,").
- Tics & catchphrases: addresses Emilia as "Emilia-sama"; uncontracted verb forms throughout ("I do not believe," "I am wondering").
- Pronouns/address: addresses Subaru by name plainly; maintains formal register even in banter.
- What NOT to "fix": his stacked subclauses and formality would fail the §4.4 hedge-stacking/overqualification checklist if this were narration, but this is characterization (§4.2 Q3) — leave every subclause intact.
- Evidence: Arc 6 Ch 3 only — provisional.

### Anastasia
- Register: working-class/merchant dialect, contractions and dropped g's rendered phonetically.
- Signature constructions: dialect spelling ("floatin'," "'round," "ain't," "didn'tcha," "what'cha," "ya," "ya should've").
- Tics & catchphrases: addresses others with "-chan"/"-kun" regardless of their age ("Beatrice-chan," "Natsuki-kun"); short rhetorical questions ("So?", "…is that it?").
- Pronouns/address: familiar, unceremonious address toward everyone including nobility/adults.
- What NOT to "fix": every dropped-g/dialect spelling is voice, never to be normalized to standard English.
- Evidence: Arc 6 Ch 3 only — provisional.

### Frederica
- Register: polite, formal maid register; deferential but capable of dry understatement.
- Signature constructions: formal imperative/instructional phrasing ("I shall be guiding you all, now."); apologetic framing when discussing her brother's conduct.
- Tics & catchphrases: addresses Subaru as "Subaru-sama"; calls Garfiel "Garf" affectionately but "my foolish younger brother" when apologizing for him.
- Pronouns/address: -sama for Subaru; formal titles generally.
- What NOT to "fix": her formality should not be smoothed into casual English even where the register reads stiff by modern standards.
- Evidence: Arc 6 Ch 3 only — provisional.

### Meili
- Register: childlike, playful, blunt; states dark subject matter matter-of-factly, without apparent affect.
- Signature constructions: elongated syllables for a sing-song childish affect ("pre~tty," "cu~te," "Oka~y," "lo~t"); simple declarative sentences even for menacing content.
- Tics & catchphrases: "onii-san" for Subaru, "onee-san" for Emilia; "Mama" (always this word, never a name); "bad animal-sans" for Witchbeasts (the -san honorific attached to "animal" itself, not to a proper name).
- Pronouns/address: onii-san/onee-san address forms; -san attached even to non-name nouns as her own idiosyncrasy.
- What NOT to "fix": elongated/childish spelling and her flat affect toward violence and danger — both are characterization, not a tone mismatch to be smoothed over.
- Evidence: Arc 6 Ch 3 only — provisional.

---

## REVIEW NODE VERDICT

**Pass date:** 2026-07-23
**Inputs read:** `arc06_ch003_edited.md`, `arc06_ch003_raw.md`, `GLOSSARY.md`, this changelog, CLAUDE.md.
**Verdict: REJECTED** (rejection 1 of 3 before mandatory HUMAN escalation, §6.5/§8.5)

All five checks were run. Independent verification performed: a full (not sampled) normalized word-diff between the raw WCT narrative span (`"How did your talk with Master go?"` through the end of the pre-notes narrative, i.e. excluding Quickdraft boilerplate and the five translator's notes) and the final edited text. Every word-level difference found maps to a logged changelog entry or to mechanical markup stripping (the `<u></u>` tags); zero unlogged word-level changes exist anywhere in the chapter.

### Check summaries

- **A — formatting-spec compliance: FAIL.** Two defects (below). Independent word-diff and mechanical scans (quotes, brackets, dashes, ellipses, blank lines, hard breaks, scene-break markers, paragraph length caps) otherwise clean.
- **B — glossary/terminology compliance: PASS**, with two open FLAGs resolved by Review below (not blocking, but held pending re-submission since nothing ratifies on a REJECTED chapter, §7.2 step 5).
- **C — meaning fidelity: PASS.** Full-chapter word-diff (exceeding the required 15% sample) confirms every beat, in order, with nothing added or dropped. All source ambiguities (the `???:` unattributed speaker, `Everyone: "—"`, the trailing "Banishing her would mean..." sentence, the "all-suspecting men" plural, the "monologue"/"mediation" word discrepancy) are verified present verbatim in the raw source and correctly left unresolved in the edited text.
- **D — prose-quality/AI-tell audit: PASS.** Edit-density ~10–12%, well under the §2.2 ceiling; every logged edit is a mechanical CAL/RED/GRM/PUNC repair. No signposting, hedge-stacking, triads, synonym-cycling, added intensifiers, or filter-word insertion found. Em-dash count is *lower* than the source's (24 body dashes vs. 26 in source), fully explained by two logged CAL edits that eliminated resumptive-dash constructions — no em-dash inflation.
- **E — voice consistency: FAIL (minor).** One proposed voice note overreaches its own chapter's evidence (below). The other five (Subaru, Emilia, Anastasia, Frederica, Meili) are adequately evidenced from this chapter alone and correctly hedged as provisional.

### Failure blocks

```
FAIL-01
  route_to: Node 1
  check: A
  rule: §3.7 "New paragraph for each new speaker, always" / §3.2 action-beat attachment / §2.5 accurate structural logging
  location: paragraph beginning "Master and servant displayed a strange scene of agreement" — anchor text: "underground space, Julius: "Nevertheless, I had assumed""
  evidence: The edited text reads "...After briefly taking a look at that underground space, Julius: "Nevertheless, I had assumed that it would be a harsh environment..."" — the speaker tag "Julius:" appears mid-paragraph, after narration, rather than opening its own paragraph. This is the only such occurrence in the chapter (verified by scanning every paragraph for a non-initial "Name:" pattern). The changelog's own STR entry claims Emilia's parallel action beat ("Emilia lowered her eyebrows, her visage complex.") was "attached to her preceding dialogue paragraph on the same principle," but in the actual output that beat remains its own separate paragraph — the two cases were not treated consistently despite being logged as parity applications of the same rule.
  required_fix: Restructure so "Julius:" begins its own paragraph, matching how the Emilia case was actually (correctly) left unmerged — i.e., keep "After briefly taking a look at that underground space." as its own narration paragraph, immediately followed by a new paragraph starting "Julius: "Nevertheless...."" Then correct the STR log entry so it accurately describes the treatment actually applied to both cases.

FAIL-02
  route_to: Node 1
  check: A
  rule: §3.6 "Romanized Japanese common nouns that WCT leaves untranslated are italicized on first appearance per chapter, roman thereafter."
  location: paragraph containing "In short, it was a place where a Hikikomori could live in peace."
  evidence: "Hikikomori" appears in roman type with no italics in both `_fmt.md` and `_edited.md` (confirmed identical in both files). It is a romanized Japanese common noun WCT leaves untranslated and only appears once in the chapter.
  required_fix: Italicize this sole appearance: "...it was a place where a *Hikikomori* could live in peace."

FAIL-03
  route_to: Node 2
  check: E
  rule: §5.5 voice notes must be checkable against written evidence; §2.4
  location: PROPOSED GLOSSARY ENTRIES → Voice Notes → Julius → "no contractions in his own dialogue"
  evidence: Julius's own line in this chapter — "I am wondering about your self-appraisal, considering how you were not included there… But do you think it's possible?" — contains the contraction "it's," contradicting the note's absolute claim using this same chapter's own evidence.
  required_fix: Revise the claim to match what this chapter actually shows (e.g. "avoids contractions in his own dialogue, with rare exceptions" or cite the one observed instance) before resubmitting for ratification.
```

### Open-FLAG dispositions (§7.6)

- **FLAG ¶heading (Quickdraft boilerplate) — ratifiable.** Sound judgment call; recommend ratifying as a Decision Log entry once the chapter is approved, so future Quickdraft-sourced `_raw.md` files don't re-derive this.
- **FLAG ¶dialogue-format (bracket→quote script conversion) — ratifiable.** Sound, conservative, no words invented; recommend ratifying as a Decision Log entry alongside the above once approved.
- **FLAG ¶"Everyone: [——]" wordless collective reaction — acknowledged, no action needed.** Conservative treatment was correct; recommend folding into the same future Decision Log entry as a documented sub-case if it recurs.
- **FLAG ¶S1 "mediation"/"monologue" discrepancy — acknowledged, resolved by Review.** Verified against `_raw.md`: both words appear exactly as transcribed (raw line 67 "monologue" in Subaru's dialogue, raw line 69 "mediation" in the following narration) — this is WCT's own text, not a transcription error by either node. Correctly left untouched by both nodes. Per §8.7, this is a source-side apparent inconsistency: reproduce faithfully (already done), flag for HUMAN's information only. No node action required.
- **FLAG ¶S2 "Ignoring those all-suspecting men" — acknowledged, resolved by Review.** Verified against `_raw.md` line 179: "men" (plural) appears in the source exactly as reproduced. This is the source's own ambiguity, correctly preserved. No action required.
- **FLAG ¶S2 "Darepanda" — acknowledged, resolved by Review.** Verified against `_raw.md` line 203: the chapter body itself reads "Darepanda" (not a Node 1 transcription error). The deleted translator's note explains this is "a reference to Tarepanda" — i.e., WCT's own body text uses a variant spelling of the pun it is itself glossing. Ratify "Darepanda" as the canonical Terminology entry (type: invented item/pun name) once the chapter is approved; no correction needed.
- **FLAG ¶S3 "Anastasia being Eridna" — acknowledged, resolved by Review.** This is the first chapter processed; "Eridna" is the only form attested in this chapter's raw source, and per §2.1 Review will not substitute any other spelling from outside knowledge of the series. Ratify "Eridna" as the interim canonical Names & Romanization entry once approved, with a note to monitor spelling consistency in future chapters per §5.3's cross-chapter-inconsistency handling.

### Non-blocking observation

Node 1's changelog header states its self-check found "5,906 words each" between raw and formatted text. Review's independent count (same normalization method) found 6,107 words on each side (excluding the two `<u>` markup remnants). The invariant itself — zero unauthorized word-level differences — is independently confirmed true regardless of which count is correct; this is flagged only as a discrepancy in Node 1's self-reported figure, not a fidelity defect. No action required, but future runs should double check the reported count before stating it.

**Next step:** Node 1 addresses FAIL-01 and FAIL-02 in `_fmt.md`; per §7.2 step 6, since these are structural changes, Node 2 must re-run downstream on the affected passages only (re-verifying the Julius/Emilia paragraph and confirming no wording changed) and correct the Julius voice-note text (FAIL-03) in its re-submission. Chapter returns to Review at step 4.

---

## Node 1 — Rejection-Cycle 1 Fix

**Pass date:** 2026-07-23

FAIL-01 and FAIL-02 were applied to `arc06_ch003_fmt.md` exactly as specified in Review's required_fix lines, and nothing else in the chapter was changed.

- FAIL-01: The paragraph beginning "Master and servant displayed a strange scene of agreement" was split. "After briefly taking a look at that underground space." now stands as the close of its own narration paragraph, immediately followed by a new paragraph opening "Julius: "Nevertheless, I had assumed…"" No words were added, removed, or reordered — only the paragraph break was inserted.
- FAIL-02: "Hikikomori" is now italicized on its sole appearance: "...it was a place where a *Hikikomori* could live in peace," per §3.6.

Correction to the earlier STR log entry titled "¶Julius's underground-space beat": that entry inaccurately claimed Julius's action beat and Emilia's action beat ("Emilia lowered her eyebrows, her visage complex.") were both folded into their respective dialogue paragraphs "on the same principle." Per Review's evidence, Emilia's beat was in fact never merged — it was correctly left as its own separate paragraph — while Julius's beat had been (incorrectly) merged into his dialogue paragraph. Both beats are now correctly and consistently left as separate paragraphs from their dialogue, matching how Emilia's was already treated. The original STR entry is left as-is above (append-only log); this note supersedes its description of the treatment actually applied.

---

## Node 2 — Rejection-Cycle 1 Fix

**Pass date:** 2026-07-23

Re-verified the Julius/Emilia paragraph in `arc06_ch003_fmt.md` following Node 1's FAIL-01/FAIL-02 structural fixes, per §7.2 step 6 (downstream re-run scoped to the affected passage only). Confirmed no wording changed in either fix: the paragraph beginning "Master and servant displayed a strange scene of agreement" now ends with "After briefly taking a look at that underground space." standing alone, immediately followed by a new paragraph opening "Julius: "Nevertheless, I had assumed…"" — a paragraph-break move only, no words added, removed, or reordered. "Hikikomori" is now italicized on its sole appearance, with no wording change. `arc06_ch003_edited.md` has been updated to carry through both of Node 1's structural/typographic changes exactly (the paragraph split and the italics), with the wording in and around that passage left exactly as it was in the prior edited pass — nothing there was re-edited.

Per FAIL-03, the Julius voice note in the PROPOSED GLOSSARY ENTRIES block above has been corrected in place: the absolute claim "no contractions in his own dialogue" is replaced with "avoids contractions in most of his dialogue, with rare exceptions (this chapter has one: 'it's,' in 'But do you think it's possible?')," accurately reflecting this chapter's own evidence without overclaiming beyond it. No other part of the voice note, the changelog, or the edited chapter was touched.

---

## REVIEW NODE VERDICT — Cycle 2

**Pass date:** 2026-07-23
**Inputs read:** `arc06_ch003_edited.md`, `arc06_ch003_raw.md`, `GLOSSARY.md`, this changelog (full, including the Cycle 1 verdict and both Rejection-Cycle 1 Fix sections), CLAUDE.md.
**Verdict: APPROVED**

All five checks were re-run from scratch against the current file state (not assumed from the prior verdict). The three Cycle-1 fixes were independently re-verified against the actual file contents before approval:

1. **FAIL-01 (Julius paragraph break):** Confirmed. "After briefly taking a look at that underground space." now stands as its own narration paragraph; "Julius: "Nevertheless, I had assumed…"" opens a new paragraph immediately after, matching how Emilia's parallel action beat was already (correctly) left separate. No "Name:" tag anywhere else in the chapter appears mid-paragraph.
2. **FAIL-02 (Hikikomori italics):** Confirmed. Sole appearance now reads "…it was a place where a *Hikikomori* could live in peace."
3. **FAIL-03 (Julius voice-note overclaim):** Confirmed. The note now reads "avoids contractions in most of his dialogue, with rare exceptions (this chapter has one: 'it's,' in 'But do you think it's possible?')" — no absolute claim remains, and it correctly cites the chapter's own attested exception.

### Check summaries

- **A — formatting-spec compliance: PASS.** Both Cycle-1 defects verified fixed (above). Re-ran the full mechanical scan (heading form, scene-break markers and placement, paragraph model, no hard wraps/double blank lines, blockquotes n/a this chapter, ellipsis/dash/quote normalization, serialization-artifact removal) — clean. Re-ran the §3.11 empty-word-diff invariant independently (own script, normalized/lowercased/stripped-punctuation word sequences, raw WCT span vs. `_edited.md`): every word-level difference (42 diff blocks) maps to a logged changelog entry (CAL/RED/GRM/PUNC/TERM) or to the already-FLAGged heading replacement and footnote-marker deletions. Zero unlogged word-level differences.
- **B — glossary/terminology compliance: PASS.** All proposed terms and names checked for internal consistency and single-rendering use throughout the chapter; no duplicate or contradictory renderings found. The two previously-open questions (Eridna spelling, Darepanda spelling) were already resolved by Review in Cycle 1 as the interim canonical forms attested by this chapter's own source text — ratifying both now, per §2.1, with no external-knowledge substitution.
- **C — meaning fidelity: PASS.** Beat-by-beat comparison against `_raw.md` confirms every event, decision, and emotional turn present, in order, nothing added or dropped. All source ambiguities (`???:` unattributed speaker, `Everyone: "—"`, the trailing "Banishing her would mean…" sentence, "all-suspecting men," the "monologue"/"mediation" discrepancy) remain verbatim and unresolved in the final text.
- **D — prose-quality/AI-tell audit: PASS.** Edit density ~10–12%, under the §2.2 ceiling; every edit is a mechanical CAL/RED/GRM/PUNC repair, no taste edits. No signposting, hedge-stacking, triads, synonym-cycling, added intensifiers, filter-word insertion, or em-dash inflation found on re-sweep.
- **E — voice consistency: PASS.** All six voice notes (Subaru, Emilia, Julius, Anastasia, Frederica, Meili) checked against their dialogue in this chapter; each is adequately evidenced from this chapter alone and correctly hedged as provisional (single-chapter evidence, per §5.5 re-review recommended after 2–3 chapters). Julius's note no longer overclaims (Cycle-1 FAIL-03 resolved).

### Glossary proposals ratified

All entries in the PROPOSED GLOSSARY ENTRIES block above are ratified as of this verdict, assigned to Decision Log entries DL-0001 and DL-0002 for the two structural/format conventions, and appended directly into `GLOSSARY.md`'s Names & Romanization, Terminology, and Voice Notes sections. "Eridna" and "Darepanda" are ratified as interim canonical forms per the Cycle-1 dispositions above (first-chapter attestation, no external-knowledge override), flagged for consistency monitoring in future chapters per §5.3/§8.6.

### Non-blocking observations

- Word-count self-reporting has varied across passes (Node 1: 5,906; Cycle-1 Review: 6,107; this pass's independent script: 6,112 raw / 6,096 edited words) due to differing tokenization of contractions and footnote-marker digits. The invariant itself (zero unlogged differences) is confirmed true under this pass's own method regardless of the discrepancy. No fidelity defect; future passes should state their exact normalization method alongside any word count.
- This is the first chapter processed under this pipeline; several ratified terms (Eridna, Darepanda) rest on single-chapter attestation only and should be checked against future chapters' spellings before being treated as fully settled (§8.6).

**Next step:** `_edited.md` is copied to `_final.md` (done). Ratified entries appended to `GLOSSARY.md` with DL numbers assigned (done). Chapter complete.
