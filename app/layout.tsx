import type { Metadata } from "next";
import { Saira_Condensed } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";

const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-saira-condensed",
});

export const metadata: Metadata = {
  title: "Rapkology",
  description: "Rapkology news, events, music and videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${saira.variable} font-saira-condensed`}>
      <body className="bg-[var(--color-bg)] text-[var(--color-text-primary)] min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
