import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArcs, getArcBySlug } from "@/lib/chapters";

export function generateStaticParams() {
  return getArcs().map((arc) => ({ arc: arc.arcSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ arc: string }>;
}): Promise<Metadata> {
  const { arc: arcParam } = await params;
  const arc = getArcBySlug(arcParam);
  return { title: arc ? arc.title : "Arc" };
}

export default async function ArcPage({ params }: { params: Promise<{ arc: string }> }) {
  const { arc: arcParam } = await params;
  const arc = getArcBySlug(arcParam);
  if (!arc) notFound();

  const arcs = getArcs();
  const idx = arcs.findIndex((a) => a.arcSlug === arc.arcSlug);
  const prevArc = idx > 0 ? arcs[idx - 1] : undefined;
  const nextArc = idx < arcs.length - 1 ? arcs[idx + 1] : undefined;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/" className="text-sm text-stone-500 hover:text-stone-300">
        ← Library
      </Link>
      <h1 className="mb-8 mt-4 font-serif text-3xl text-stone-100">{arc.title}</h1>

      <ul className="space-y-2">
        {arc.entries.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={`/arc/${arc.arcSlug}/${entry.slug}`}
              className="flex items-baseline gap-3 rounded-md px-3 py-2 transition hover:bg-white/[0.06]"
            >
              <span className="shrink-0 font-sans text-xs uppercase tracking-wide text-stone-500">
                {entry.kindLabel}
              </span>
              <span className="font-serif text-stone-200">{entry.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6 font-sans text-sm">
        {prevArc ? (
          <Link href={`/arc/${prevArc.arcSlug}`} className="text-stone-400 hover:text-stone-200">
            ← {prevArc.title}
          </Link>
        ) : (
          <span />
        )}
        {nextArc ? (
          <Link href={`/arc/${nextArc.arcSlug}`} className="text-stone-400 hover:text-stone-200">
            {nextArc.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
