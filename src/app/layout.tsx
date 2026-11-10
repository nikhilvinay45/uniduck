import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniDuck 🦆 — AI Rubber Duck Tutor for University Students",
  description:
    "UniDuck is a CS50-inspired rubber duck AI tutor. Get Socratic guidance, debug code, and brainstorm assignments — never spoilers, always learning.",
  keywords: [
    "UniDuck",
    "rubber duck debugging",
    "CS50",
    "AI tutor",
    "university",
    "study helper",
    "Socratic method",
  ],
  authors: [{ name: "UniDuck" }],
  openGraph: {
    title: "UniDuck 🦆 — AI Rubber Duck Tutor",
    description:
      "Your CS50-style rubber duck. Quack, debug, learn — without spoilers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniDuck 🦆 — AI Rubber Duck Tutor",
    description:
      "Your CS50-style rubber duck. Quack, debug, learn — without spoilers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
