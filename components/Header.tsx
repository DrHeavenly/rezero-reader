import Link from "next/link";
import { getSearchIndex } from "@/lib/chapters";
import SearchBox from "@/components/SearchBox";

export default function Header() {
  const index = getSearchIndex();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#161514]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-sans text-sm font-semibold tracking-wide text-stone-200 hover:text-white"
        >
          Re:Zero Reader
        </Link>
        <SearchBox index={index} />
      </div>
    </header>
  );
}
