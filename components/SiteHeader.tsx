"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  companyName,
  navLinks,
  phone,
  whatsappNumber,
  whatsappPrefill,
} from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const telHref = `tel:${phone.replace(/\s/g, "")}`;
const whatsappHref = `https://wa.me/${whatsappNumber.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(whatsappPrefill)}`;

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.53 15.53 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.02l-2.21 2.21z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
              aria-current={isActive(link.href) ? "page" : undefined}
              className="hover:text-ink-muted aria-[current=page]:text-[var(--color-accent)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + quick contact */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { location: "header" })}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-brand)] transition hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            aria-label="Message us on WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <a
            href={telHref}
            onClick={() => trackEvent("phone_click", { location: "header" })}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-brand)] transition hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            aria-label={`Call us on ${phone}`}
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <Link
            href="/reservation"
            onClick={() => trackEvent("cta_click", { location: "header", label: "Book now free" })}
            className="btn btn-primary inline-flex"
          >
            Book now free
          </Link>
        </div>

        {/* Mobile: quick call + WhatsApp always visible, plus hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { location: "header_mobile" })}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--color-brand)] hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            aria-label="Message us on WhatsApp"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </a>
          <a
            href={telHref}
            onClick={() => trackEvent("phone_click", { location: "header_mobile" })}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--color-brand)] hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
            aria-label={`Call us on ${phone}`}
          >
            <PhoneIcon className="h-6 w-6" />
          </a>
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
        inert={!menuOpen}
        className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out md:hidden ${
          menuOpen ? "max-h-[min(38rem,90vh)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-[var(--color-line)] bg-ivory px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium uppercase tracking-widest text-ink hover:bg-neutral-100 aria-[current=page]:text-[var(--color-accent)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-[var(--color-line)]">
              <a
                href={telHref}
                onClick={() => {
                  trackEvent("phone_click", { location: "mobile_menu" });
                  setMenuOpen(false);
                }}
                className="btn btn-outline inline-flex items-center justify-center gap-2"
              >
                <PhoneIcon className="h-4 w-4" />
                Call
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("whatsapp_click", { location: "mobile_menu" });
                  setMenuOpen(false);
                }}
                className="btn btn-outline inline-flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </li>
            <li className="mt-2">
              <Link
                href="/reservation"
                className="btn btn-primary block w-full text-center"
                onClick={() => {
                  trackEvent("cta_click", { location: "mobile_menu", label: "Book now free" });
                  setMenuOpen(false);
                }}
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
