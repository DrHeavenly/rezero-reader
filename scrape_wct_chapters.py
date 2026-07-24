#!/usr/bin/env python3
"""
Batch-convert Re:Zero Arc 6 chapters into arc06_chNNN_raw.md.

Automates the manual loop (open chapter -> select text -> QuickDraft -> download -> rename):
fetches each chapter listed under "Arc 6" in the Witch Cult Translations table of contents,
strips the site chrome + translator-credit block, keeps the chapter prose and Translation
notes, wraps it in the "# My Book / ## Chapter One / ... / ### Scene One" envelope QuickDraft
produced, and writes chapters/arc_6/arc06_chNNN_raw.md. Chapters you already have are skipped.

Includes PARTNER-HOSTED chapters too: a few Arc 6 chapters live on other translators' sites
(TranslationChicken, Eminent, Remonwater, etc.) or on WCT under a non-standard URL. Those are
found by reading the chapter number from the TOC label rather than the URL, fetched with a
generalized WordPress extractor, and (for multi-part chapters) the "next part" links are
followed and joined. Off-site chapters are flagged "verify" in the output because their page
markup varies — eyeball those files.

For personal / project use only.  Standard library only (Python 3.8+), no pip needed.
Run:  python3 scrape_wct_chapters.py            # every missing Arc 6 chapter
      python3 scrape_wct_chapters.py 33 34 89   # only these chapter numbers
"""

import os
import re
import sys
import time
import urllib.request
import urllib.parse
from html.parser import HTMLParser

TOC_URL = "https://witchculttranslation.com/table-of-content/"
ARC = 6
HOME_HOST = "witchculttranslation.com"
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "chapters", f"arc_{ARC}")
UA = "Mozilla/5.0 (Macintosh; personal Re:Zero archive)"
REQUEST_DELAY = 2.0      # seconds between requests, to be polite
MAX_PARTS = 8            # safety cap when following "next part" links


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        charset = resp.headers.get_content_charset() or "utf-8"
        return resp.read().decode(charset, errors="replace")


def host_of(url: str) -> str:
    return urllib.parse.urlparse(url).netloc.lower().lstrip("www.")


# --------------------------------------------------------------------------- TOC

class TocParser(HTMLParser):
    """Collect {chapter_number: url} for every link under the 'Arc 6' heading.

    Numbers come from the link TEXT ("Chapter 31: ...") not the URL, so partner-hosted
    and oddly-slugged chapters are captured too. The section runs from the 'Arc 6'
    heading until the next 'Arc N' heading.
    """

    HEAD = {"h1", "h2", "h3", "h4"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_head = False
        self.head_buf = []
        self.in_arc6 = False
        self.done = False
        self.in_a = False
        self.a_href = None
        self.a_buf = []
        self.results = {}

    def handle_starttag(self, tag, attrs):
        if self.done:
            return
        if tag in self.HEAD:
            self.in_head, self.head_buf = True, []
        elif tag == "a":
            href = dict(attrs).get("href")
            if href and self.in_arc6:
                self.in_a, self.a_href, self.a_buf = True, href.split("#")[0], []

    def handle_endtag(self, tag):
        if self.done:
            return
        if tag in self.HEAD and self.in_head:
            self.in_head = False
            m = re.match(r"\s*Arc\s+(\d+)\b", "".join(self.head_buf), re.I)
            if m:
                if int(m.group(1)) == ARC:
                    self.in_arc6 = True
                elif self.in_arc6:
                    self.done = True
        elif tag == "a" and self.in_a:
            self.in_a = False
            m = re.search(r"Chapter\s+(\d+)", "".join(self.a_buf), re.I)
            if m and self.a_href:
                self.results.setdefault(int(m.group(1)), self.a_href)

    def handle_data(self, data):
        if self.in_head:
            self.head_buf.append(data)
        if self.in_a:
            self.a_buf.append(data)


def collect_arc6_chapters() -> dict:
    p = TocParser()
    p.feed(fetch(TOC_URL))
    return p.results


# ----------------------------------------------------------------- page content

class ContentParser(HTMLParser):
    """Collect the text of each block element inside an accepted content container."""

    BLOCKS = {"p", "h2", "h3", "h4", "blockquote", "li"}

    def __init__(self, accept):
        super().__init__(convert_charrefs=True)
        self.accept = accept
        self.in_content = False
        self.enter_tag = None
        self.depth = 0
        self.capturing = False
        self.buf = []
        self.paras = []

    def handle_starttag(self, tag, attrs):
        cls = dict(attrs).get("class", "") or ""
        if not self.in_content:
            if self.accept(tag, cls):
                self.in_content, self.enter_tag, self.depth = True, tag, 0
            return
        if tag == self.enter_tag:
            self.depth += 1
        elif tag in self.BLOCKS and not self.capturing:
            self.capturing, self.buf = True, []

    def handle_endtag(self, tag):
        if not self.in_content:
            return
        if tag in self.BLOCKS and self.capturing:
            text = "".join(self.buf).strip()
            if text:
                self.paras.append(text)
            self.capturing, self.buf = False, []
        elif tag == self.enter_tag:
            if self.depth == 0:
                self.in_content, self.enter_tag = False, None
            else:
                self.depth -= 1

    def handle_data(self, data):
        if self.in_content and self.capturing:
            self.buf.append(data)


def clean(text: str) -> str:
    text = text.replace(" ", " ").replace("​", "")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\s+([,.!?])", r"\1", text)
    return text.strip()


def content_blocks(html: str):
    """Paragraphs of the main content, trying the usual WordPress containers in order."""
    def has(cls, *keys):
        return any(k in cls for k in keys)

    for accept in (
        lambda t, c: t in ("div", "section", "article")
        and has(c, "entry-content", "post-content", "article-content", "td-post-content", "entry-summary"),
        lambda t, c: t == "article",
        lambda t, c: t == "main",
        lambda t, c: t == "body",
    ):
        p = ContentParser(accept)
        p.feed(html)
        blocks = [clean(x) for x in p.paras if clean(x)]
        if len(blocks) >= 3:
            return blocks
    return []


_CRED = re.compile(
    r"^\s*(translated|translation|proofread|proofreader|edited|editor|tlc?|t\.?l\.?|raws?|"
    r"notes?|translator|previous|next|back to|posted|by\s|support|patreon|ko-?fi|discord|"
    r"donate|read more|continue reading|«|»|←|→|share|categor)", re.I,
)
_JUNK = re.compile(
    r"^\s*(previous post|next post|leave a reply|recent posts|loading comments|reload comments|"
    r"comment\b|name$|email$|website$|Δ|share this|like this|related|post navigation|"
    r"advertisement|next part|previous part|support us|patreon)", re.I,
)


def strip_credits(paras):
    """Drop the leading translator-credit / nav block; keep prose + translation notes."""
    def is_div(p):
        return p.replace(" ", "").startswith("※")  # WCT ※ divider

    # WCT fast path: credits sit between two ※ dividers, right after "Proofread".
    proof = next((i for i, p in enumerate(paras) if re.search(r"proofread", p, re.I)), None)
    if proof is not None:
        close = next((j for j in range(proof + 1, len(paras)) if is_div(paras[j])), None)
        if close is not None:
            return paras[close + 1:]
    divs = [i for i, p in enumerate(paras[:14]) if is_div(p)]
    if len(divs) >= 2:
        return paras[divs[1] + 1:]

    # Generic (partner sites): skip leading boilerplate until the first prose paragraph.
    def prose(p):
        if len(p) >= 60:
            return True
        return bool(re.match(r'^(\?{3}|「|『|—|――|"|“)', p)) or \
            bool(re.match(r'^[A-Za-z][\w .\-]{0,18}:\s*[「\[\"“]', p))

    for i, p in enumerate(paras):
        if prose(p) and not _CRED.match(p):
            return paras[i:]
    return paras


def extract_body(html: str) -> str:
    paras = strip_credits(content_blocks(html))
    while paras and (_JUNK.match(paras[-1]) or len(paras[-1]) < 2):
        paras.pop()
    dead = re.compile(r"^(CLOSE|Δ|Reload comments|Loading comments\.\.\.)$")
    paras = [p for p in paras if not dead.match(p)]
    return "\n\n".join(paras).strip()


def next_part_url(html: str, same_host: str):
    """Find a 'next part' link on the same host (for multi-part partner chapters)."""
    for m in re.finditer(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', html, re.S | re.I):
        href = m.group(1).split("#")[0]
        text = re.sub(r"<[^>]+>", " ", m.group(2))
        if same_host in href and re.search(r"(next\s*part|part\s*\d+\s*(&raquo;|»|→|>)?|continue)", text, re.I):
            return href
    return None


def fetch_chapter(url: str) -> str:
    """Extract a chapter, following same-host 'next part' links and joining them."""
    seen, parts, cur = set(), [], url
    for _ in range(MAX_PARTS):
        if cur in seen:
            break
        seen.add(cur)
        html = fetch(cur)
        parts.append(extract_body(html))
        nxt = next_part_url(html, host_of(url))
        if not nxt or nxt in seen:
            break
        cur = nxt
        time.sleep(REQUEST_DELAY)
    return "\n\n".join(p for p in parts if p).strip()


def wrap(body: str) -> str:
    return f"# My Book\n\n## Chapter One\n\n{body}\n\n### Scene One\n"


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
        url = chapters[num]
        offsite = HOME_HOST not in host_of(url)
        tag = "  [off-site: verify]" if offsite else ""
        try:
            print(f"ch{num:03d}: fetching {url}{tag}")
            body = fetch_chapter(url)
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
    print("Tip: re-check any chapter flagged [off-site: verify] — partner-site markup varies.")


if __name__ == "__main__":
    main()
