"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchItem } from "@/lib/chapters";

function scoreItem(item: SearchItem, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return -1;

  // "6-3", "6.3", "arc 6 ch 3" style lookups by arc/number (arc content only).
  const pair = q.match(/(\d+)\D+(\d+)/);
  if (pair && item.arc !== undefined && item.number !== undefined) {
    const [, a, n] = pair;
    if (item.arc === parseInt(a, 10) && item.number === parseInt(n, 10)) return 100;
  }

  const haystacks = [
    item.arc !== undefined ? `arc ${item.arc}` : "",
    item.arc !== undefined ? `${item.arc}` : "",
    item.kind ?? "",
    item.kindLabel.toLowerCase(),
    item.number !== undefined ? `chapter ${item.number}` : "",
    item.number !== undefined ? `interlude ${item.number}` : "",
    item.context.toLowerCase(),
    item.title.toLowerCase(),
    item.heading.toLowerCase(),
  ].filter(Boolean);

  for (const haystack of haystacks) {
    if (haystack === q) return 90;
  }
  for (const haystack of haystacks) {
    const idx = haystack.indexOf(q);
    if (idx !== -1) return 50 - idx;
  }
  return -1;
}

export default function SearchBox({ index }: { index: SearchItem[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return index
      .map((item) => ({ item, score: scoreItem(item, query) }))
      .filter((r) => r.score > -1)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.item);
  }, [index, query]);

  function goTo(item: SearchItem) {
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
    router.push(item.href);
  }

  return (
    <div className="relative w-full max-w-xs">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIdx(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIdx((i) => Math.min(i + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIdx((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter" && results[activeIdx]) {
            goTo(results[activeIdx]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        placeholder="Search chapters…"
        aria-label="Search chapters"
        className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-1.5 text-sm text-stone-200 placeholder:text-stone-500 focus:border-stone-500 focus:outline-none"
      />
      {open && results.length > 0 && (
        <ul className="absolute right-0 z-30 mt-1 max-h-80 w-80 overflow-y-auto rounded-md border border-white/15 bg-[#1c1b1a] shadow-2xl">
          {results.map((item, i) => (
            <li key={item.href}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => goTo(item)}
                className={`block w-full px-3 py-2 text-left text-sm ${
                  i === activeIdx ? "bg-white/10 text-white" : "text-stone-300"
                }`}
              >
                <div className="text-xs uppercase tracking-wide text-stone-500">
                  {item.context}
                </div>
                <div className="truncate">{item.title}</div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
