import Link from "next/link";
import type { Metadata } from "next";
import { getIfStories } from "@/lib/ifStories";

export const metadata: Metadata = { title: "IF Stories" };

export default function IfLibraryPage() {
  const stories = getIfStories();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/" className="text-sm text-stone-500 hover:text-stone-300">
        ← Library
      </Link>
      <h1 className="mb-2 mt-4 font-serif text-3xl text-stone-100">IF Stories</h1>
      <p className="mb-10 text-sm text-stone-500">
        Alternate-timeline side stories, kept separate from the main arcs.
      </p>

      {stories.length === 0 ? (
        <p className="rounded-lg border border-white/10 bg-white/[0.03] px-5 py-6 text-stone-400">
          No IF stories found yet. Drop <code className="text-stone-300">if_&lt;story&gt;_final.md</code>{" "}
          files anywhere in this repo and rebuild.
        </p>
      ) : (
        <ul className="space-y-3">
          {stories.map((story) => (
            <li key={story.story}>
              <Link
                href={`/if/${story.story}`}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <span className="font-serif text-lg text-stone-100">{story.label}</span>
                <span className="font-sans text-sm text-stone-500">Read →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
