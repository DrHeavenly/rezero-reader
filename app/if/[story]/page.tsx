import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIfStories, getIfStory } from "@/lib/ifStories";

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
  return { title: s ? s.label : "IF Story" };
}

export default async function IfStoryPage({ params }: { params: Promise<{ story: string }> }) {
  const { story: storyParam } = await params;
  const story = getIfStory(storyParam);
  if (!story) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/if" className="text-sm text-stone-500 hover:text-stone-300">
        ← IF Stories
      </Link>
      <h1 className="mb-8 mt-4 font-serif text-3xl text-stone-100">{story.label}</h1>

      <ul className="space-y-2">
        {story.variants.map((v) => (
          <li key={v.variant}>
            <Link
              href={`/if/${story.story}/${v.variant}`}
              className="flex items-baseline gap-3 rounded-md px-3 py-2 transition hover:bg-white/[0.06]"
            >
              <span className="shrink-0 font-sans text-xs uppercase tracking-wide text-stone-500">
                {v.variantLabel}
              </span>
              <span className="font-serif text-stone-200">{v.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
