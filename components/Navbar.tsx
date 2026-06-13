"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/closed-deals", label: "Closed Deals" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    const active = href === "/" ? pathname === href : pathname.startsWith(href);

    return active ? "text-white" : "text-slate-100/80";
  };

  return (
    <header
      className={`fixed top-0 z-40 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-black/55 backdrop-blur-md"
          : "border-transparent bg-gradient-to-b from-black/40 via-black/10 to-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 text-slate-100 sm:h-20">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/nav-logo.png"
            alt="Realty Financial Inc"
            width={200}
            height={56}
            className="h-9 w-auto max-w-[140px] shrink-0 object-contain object-left drop-shadow-md sm:h-11 sm:max-w-[180px]"
            priority
          />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-white sm:text-base">
              Realty Financial Inc
            </span>
            <span className="text-[11px] text-slate-200/80 sm:text-xs">
              Real Estate &amp; Mortgage Broker
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:ml-auto md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-white ${isActive(item.href)}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/40 bg-black/20 text-slate-50 shadow-soft backdrop-blur-sm md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/80 backdrop-blur-sm md:hidden">
          <div className="container-page space-y-2 py-3 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-2 py-2.5 font-medium transition hover:bg-white/5 ${
                  isActive(item.href)
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};


