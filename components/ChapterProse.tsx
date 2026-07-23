import ReactMarkdown, { type Components } from "react-markdown";

const components: Components = {
  hr: () => (
    <div
      role="presentation"
      aria-hidden="true"
      className="my-10 select-none text-center text-sm tracking-[0.6em] text-stone-500"
    >
      * * *
    </div>
  ),
  h1: ({ children }) => (
    <h2 className="mb-6 mt-12 text-center font-serif text-xl text-stone-100">{children}</h2>
  ),
  h2: ({ children }) => (
    <h3 className="mb-6 mt-12 text-center font-serif text-lg text-stone-100">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-6 leading-[1.75] last:mb-0">{children}</p>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l border-stone-600 pl-6 text-[0.97em] not-italic text-stone-400">
      {children}
    </blockquote>
  ),
  em: ({ children }) => <em className="italic text-stone-200">{children}</em>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
};

export default function ChapterProse({ markdown }: { markdown: string }) {
  return (
    <div className="font-serif text-[1.0625rem] text-stone-300">
      <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
    </div>
  );
}
