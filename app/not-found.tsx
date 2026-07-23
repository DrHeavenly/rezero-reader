import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="mb-3 font-serif text-2xl text-stone-100">Page not found</h1>
      <p className="mb-8 text-stone-500">That arc or chapter doesn&apos;t exist.</p>
      <Link href="/" className="text-sm text-stone-300 underline hover:text-white">
        Back to the library
      </Link>
    </main>
  );
}
