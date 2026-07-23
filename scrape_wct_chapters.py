#!/usr/bin/env python3
"""
Batch-convert Witch Cult Translations Arc 6 chapters into arc06_chNNN_raw.md.

Automates the manual loop you were doing by hand:
    open WCT chapter -> select chapter text -> QuickDraft -> download .md -> rename
Instead it fetches each chapter, strips the site chrome + translator-credit block,
keeps the chapter prose and the Translation notes, wraps it in the same
"# My Book / ## Chapter One / ... / ### Scene One" envelope QuickDraft produced,
and writes chapters/arc06_chNNN_raw.md. Chapters you already have are skipped.

For personal / project use only (matches your existing pipeline).

No third-party packages required — standard library only (Python 3.8+).
Run:  python3 scrape_wct_chapters.py            # every missing Arc 6 chapter
      python3 scrape_wct_chapters.py 10 11 12   # only these chapter numbers
"""

import os
import re
import sys
import time
import urllib.request
from html.parser import HTMLParser

TOC_URL = "https://witchculttranslation.com/table-of-content/"
ARC = 6
ARC_URL_RE = re.compile(r"/arc-6-chapter-(\d+)", re.I)
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "chapters", f"arc_{ARC}")
UA = "Mozilla/5.0 (Macintosh; personal Re:Zero archive)"
REQUEST_DELAY = 2.0  # seconds between requests, to be polite to the server


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        charset = resp.headers.get_content_charset() or "utf-8"
        return resp.read().decode(charset, errors="replace")


class ContentParser(HTMLParser):
    """Collects the text of each block element inside <div class="entry-content">."""

    BLOCKS = {"p", "h2", "h3", "blockquote", "li"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_content = False
        self.div_depth = 0
        self.capturing = False
        self.buf = []
        self.paras = []

    def handle_starttag(self, tag, attrs):
        cls = dict(attrs).get("class", "") or ""
        if not self.in_content and tag in ("div", "article") and "entry-content" in cls:
            self.in_content = True
            self.div_depth = 0
            return
        if self.in_content:
            if tag == "div":
                self.div_depth += 1
            elif tag in self.BLOCKS:
                self.capturing = True
                self.buf = []

    def handle_endtag(self, tag):
        if not self.in_content:
            return
        if tag in self.BLOCKS and self.capturing:
            text = "".join(self.buf).strip()
            if text:
                self.paras.append(text)
            self.capturing = False
            self.buf = []
        elif tag == "div":
            if self.div_depth == 0:
                self.in_content = False   # closed the entry-content div itself
            else:
                self.div_depth -= 1

    def handle_data(self, data):
        if self.in_content and self.capturing:
            self.buf.append(data)


def clean(text: str) -> str:
    text = text.replace(" ", " ").replace("​", "")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\s+([,.!?])", r"\1", text)
    return text.strip()


def extract_body(html: str) -> str:
    """Chapter prose + translation notes, minus the leading translator-credit block."""
    parser = ContentParser()
    parser.feed(html)
    paras = [clean(p) for p in parser.paras]
    paras = [p for p in paras if p]

    def is_divider(p):
        return p.replace(" ", "").startswith("※")  # ※

    # Credits sit between two "※ ※ ※ …" dividers, right after "Proofread".
    # The chapter begins on the paragraph after the SECOND divider.
    start = 0
    proof = next((i for i, p in enumerate(paras) if "Proofread" in p), None)
    if proof is not None:
        closing = next((j for j in range(proof + 1, len(paras)) if is_divider(paras[j])), None)
        if closing is not None:
            start = closing + 1
    else:
        divs = [i for i, p in enumerate(paras[:12]) if is_divider(p)]
        if len(divs) >= 2:
            start = divs[1] + 1

    junk = re.compile(r"^(CLOSE|Δ|Reload comments|Loading comments\.\.\.|Leave a Reply.*)$")
    body = [p for p in paras[start:] if not junk.match(p)]
    return "\n\n".join(body).strip()


def wrap(body: str) -> str:
    return f"# My Book\n\n## Chapter One\n\n{body}\n\n### Scene One\n"


def collect_arc6_chapters() -> dict:
    """Return {chapter_number: url} for every WCT-hosted Arc 6 chapter in the TOC."""
    html = fetch(TOC_URL)
    chapters, offsite = {}, []
    for href in re.findall(r'href="([^"]+)"', html):
        href = href.split("#")[0]
        m = ARC_URL_RE.search(href)
        if not m:
            continue
        num = int(m.group(1))
        if "witchculttranslation.com" in href:
            chapters.setdefault(num, href)
        elif not any(o[0] == num for o in offsite):
            offsite.append((num, href))
    if offsite:
        print("  (note) these Arc 6 chapters are hosted off-site (partner translators) and are "
              "skipped — grab them by hand if you want them:")
        for num, href in sorted(offsite):
            print(f"        ch{num:03d}: {href}")
    return chapters


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    wanted = {int(a) for a in sys.argv[1:] if a.isdigit()} or None

    chapters = collect_arc6_chapters()
    if not chapters:
        print("No Arc 6 chapters found in the table of contents — the site markup may have changed.")
        return

    todo = sorted(chapters)
    if wanted:
        todo = [n for n in todo if n in wanted]

    done = skipped = failed = 0
    for num in todo:
        out_path = os.path.join(OUT_DIR, f"arc{ARC:02d}_ch{num:03d}_raw.md")
        if os.path.exists(out_path) and not wanted:
            skipped += 1
            continue
        try:
            print(f"ch{num:03d}: fetching {chapters[num]}")
            body = extract_body(fetch(chapters[num]))
            if len(body) < 400:
                print(f"        ! extracted only {len(body)} chars — check this one by hand")
            with open(out_path, "w", encoding="utf-8") as fh:
                fh.write(wrap(body))
            print(f"        wrote {os.path.basename(out_path)} ({len(body):,} chars)")
            done += 1
            time.sleep(REQUEST_DELAY)
        except Exception as exc:  # noqa: BLE001
            print(f"        FAILED: {exc}")
            failed += 1

    print(f"\nDone. wrote {done}, skipped {skipped} (already present), failed {failed}.")


if __name__ == "__main__":
    main()
