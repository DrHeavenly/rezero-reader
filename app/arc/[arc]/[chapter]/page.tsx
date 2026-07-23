import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllChapters, getChapter, getAdjacentChapters } from "@/lib/chapters";
import ChapterProse from "@/components/ChapterProse";

export function generateStaticParams() {
  return getAllChapters().map((entry) => ({ arc: entry.arcSlug, chapter: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ arc: string; chapter: string }>;
}): Promise<Metadata> {
  const { arc, chapter } = await params;
  const entry = getChapter(arc, chapter);
  return { title: entry ? entry.heading : "Chapter" };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ arc: string; chapter: string }>;
}) {
  const { arc: arcParam, chapter: chapterParam } = await params;
  const entry = getChapter(arcParam, chapterParam);
  if (!entry) notFound();

  const { prev, next } = getAdjacentChapters(entry);

  return (
    <main className="mx-auto max-w-[70ch] px-6 py-12 sm:px-8">
      <nav className="mb-12 flex items-center justify-between font-sans text-xs uppercase tracking-wide text-stone-500">
        <Link href="/" className="hover:text-stone-300">
          Library
        </Link>
        <Link href={`/arc/${entry.arcSlug}`} className="hover:text-stone-300">
          Arc {entry.arc}
        </Link>
      </nav>

      <h1 className="mb-12 text-center font-serif text-2xl text-stone-100 sm:text-3xl">
        {entry.heading}
      </h1>

      <ChapterProse markdown={entry.body} />

      <div className="mt-16 flex items-start justify-between gap-4 border-t border-white/10 pt-8 font-sans text-sm">
        {prev ? (
          <Link
            href={`/arc/${prev.arcSlug}/${prev.slug}`}
            className="max-w-[45%] text-stone-400 hover:text-stone-200"
          >
            ← {prev.kindLabel}
            <span className="block truncate text-xs text-stone-500">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/arc/${next.arcSlug}/${next.slug}`}
            className="max-w-[45%] text-right text-stone-400 hover:text-stone-200"
          >
            {next.kindLabel} →
            <span className="block truncate text-xs text-stone-500">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
