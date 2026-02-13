"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { companyName, navLinks } from "@/lib/constants";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-ivory">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex shrink-0" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo.png"
            alt={companyName}
            width={390}
            height={110}
            className="h-[93px] w-auto object-contain md:h-[110px]"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-widest md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-ink-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/reservation" className="btn btn-primary inline-flex">
            Book now free
          </Link>
        </div>

        {/* Mobile: hamburger only (CTA is in the menu) */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex flex-col justify-center rounded-md p-2 text-ink hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${
                menuOpen ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`mt-1.5 block h-0.5 w-6 bg-current transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`mt-1.5 block h-0.5 w-6 bg-current transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-nav"
        role="region"
        aria-label="Mobile navigation"
        className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out md:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-[var(--color-line)] bg-ivory px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium uppercase tracking-widest text-ink hover:bg-neutral-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 pt-3 border-t border-[var(--color-line)]">
              <Link
                href="/reservation"
                className="btn btn-primary block w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Book now free
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
