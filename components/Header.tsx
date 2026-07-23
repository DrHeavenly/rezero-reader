import Link from "next/link";
import { getSearchIndex } from "@/lib/chapters";
import { getIfSearchIndex } from "@/lib/ifStories";
import SearchBox from "@/components/SearchBox";

export default function Header() {
  const index = [...getSearchIndex(), ...getIfSearchIndex()];

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#161514]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex shrink-0 items-baseline gap-4">
          <Link
            href="/"
            className="font-sans text-sm font-semibold tracking-wide text-stone-200 hover:text-white"
          >
            Re:Zero Reader
          </Link>
          <Link
            href="/if"
            className="font-sans text-xs uppercase tracking-wide text-stone-500 hover:text-stone-300"
          >
            IF Stories
          </Link>
        </div>
        <SearchBox index={index} />
      </div>
    </header>
  );
}
