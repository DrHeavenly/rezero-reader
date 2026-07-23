import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "Re:Zero Reader",
    template: "%s · Re:Zero Reader",
  },
  description: "A clean, novel-format reading experience for the reformatted Re:Zero web novel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#161514] font-sans text-stone-300 antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
