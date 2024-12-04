import type { Metadata } from "next";
import Link from "next/link";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atomic Chart",
  description: "A chart of the elements."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.className} antialiased text-black dark:text-white`}
      >
        <main className="w-full max-w-screen-xl mx-auto flex flex-col gap-4 items-center h-screen p-4 sm:p-12 lg:p-24">
          <header className="flex w-full max-w-screen-xl mx-auto justify-between items-center border border-black dark:border-white px-6 py-4">
            <Link href="/" className="text-lg font-bold">atomicchart.com</Link>
            <span className="text-sm">v0.1.0</span>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}