import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIfStories, getIfStory } from "@/lib/ifStories";
import ChapterProse from "@/components/ChapterProse";

export function generateStaticParams() {
  return getIfStories().map((s) => ({ story: s.story }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ story: string }>;
}): Promise<Metadata> {
  const { story } = await params;
  const s = getIfStory(story);
  return { title: s ? s.heading : "IF Story" };
}

export default async function IfStoryPage({ params }: { params: Promise<{ story: string }> }) {
  const { story: storyParam } = await params;
  const story = getIfStory(storyParam);
  if (!story) notFound();

  return (
    <main className="mx-auto max-w-[70ch] px-6 py-12 sm:px-8">
      <nav className="mb-12 flex items-center justify-between font-sans text-xs uppercase tracking-wide text-stone-500">
        <Link href="/" className="hover:text-stone-300">
          Library
        </Link>
        <Link href="/if" className="hover:text-stone-300">
          IF Stories
        </Link>
      </nav>

      <h1 className="mb-12 text-center font-serif text-2xl text-stone-100 sm:text-3xl">
        {story.heading}
      </h1>

      <ChapterProse markdown={story.body} />

      <div className="mt-16 border-t border-white/10 pt-8 text-center font-sans text-sm">
        <Link href="/if" className="text-stone-400 hover:text-stone-200">
          ← All IF Stories
        </Link>
      </div>
    </main>
  );
}
