import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIfStories, getIfStory, getIfVariant } from "@/lib/ifStories";
import ChapterProse from "@/components/ChapterProse";

export function generateStaticParams() {
  return getIfStories().flatMap((s) =>
    s.variants.map((v) => ({ story: s.story, variant: v.variant })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ story: string; variant: string }>;
}): Promise<Metadata> {
  const { story, variant } = await params;
  const v = getIfVariant(story, variant);
  return { title: v ? v.heading : "IF Story" };
}

export default async function IfVariantPage({
  params,
}: {
  params: Promise<{ story: string; variant: string }>;
}) {
  const { story: storyParam, variant: variantParam } = await params;
  const story = getIfStory(storyParam);
  const entry = getIfVariant(storyParam, variantParam);
  if (!story || !entry) notFound();

  const others = story.variants.filter((v) => v.variant !== entry.variant);

  return (
    <main className="mx-auto max-w-[70ch] px-6 py-12 sm:px-8">
      <nav className="mb-12 flex items-center justify-between font-sans text-xs uppercase tracking-wide text-stone-500">
        <Link href="/if" className="hover:text-stone-300">
          IF Stories
        </Link>
        <Link href={`/if/${story.story}`} className="hover:text-stone-300">
          {story.label}
        </Link>
      </nav>

      <h1 className="mb-3 text-center font-serif text-2xl text-stone-100 sm:text-3xl">
        {entry.heading}
      </h1>
      <p className="mb-12 text-center font-sans text-xs uppercase tracking-wide text-stone-500">
        {entry.variantLabel}
      </p>

      <ChapterProse markdown={entry.body} />

      {others.length > 0 && (
        <div className="mt-16 border-t border-white/10 pt-8 font-sans text-sm">
          <p className="mb-3 text-xs uppercase tracking-wide text-stone-500">Other versions</p>
          <ul className="space-y-2">
            {others.map((v) => (
              <li key={v.variant}>
                <Link
                  href={`/if/${story.story}/${v.variant}`}
                  className="text-stone-400 hover:text-stone-200"
                >
                  {v.variantLabel} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
