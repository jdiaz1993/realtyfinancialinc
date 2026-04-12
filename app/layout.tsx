import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Realty Financial Inc | Real Estate & Mortgage Broker",
  description:
    "Realty Financial Inc, led by broker George Espinoza, providing trusted real estate and mortgage guidance in Los Angeles.",
  metadataBase: new URL("https://www.example.com")
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden text-slate-100 antialiased">
        {/* Site-wide decorative background (all pages) — black base matches PNG */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-black" aria-hidden />
        {/* Centered, full graphic visible (no crop); fixed to viewport so it stays put while you scroll */}
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-contain bg-center bg-no-repeat opacity-[0.32] md:opacity-[0.38]"
          style={{ backgroundImage: "url('/brand-bg.png')" }}
          aria-hidden
        />
        <div className="pointer-events-none fixed inset-0 z-0 bg-black/10" aria-hidden />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

