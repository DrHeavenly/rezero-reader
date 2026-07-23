import Link from "next/link";
import { getArcs } from "@/lib/chapters";

export default function LibraryPage() {
  const arcs = getArcs();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 font-serif text-3xl text-stone-100">Re:Zero − Starting Life in Another World</h1>
      <p className="mb-10 text-sm text-stone-500">The reformatted, novel-typeset edition.</p>

      {arcs.length === 0 ? (
        <p className="rounded-lg border border-white/10 bg-white/[0.03] px-5 py-6 text-stone-400">
          No chapters found yet. Drop <code className="text-stone-300">*_final.md</code> files anywhere in
          this repo (flat or under an <code className="text-stone-300">arcNN/</code> folder) and rebuild.
        </p>
      ) : (
        <ul className="space-y-3">
          {arcs.map((arc) => (
            <li key={arc.arcSlug}>
              <Link
                href={`/arc/${arc.arcSlug}`}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <span className="font-serif text-lg text-stone-100">{arc.title}</span>
                <span className="font-sans text-sm text-stone-500">
                  {arc.chapterCount} {arc.chapterCount === 1 ? "chapter" : "chapters"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
