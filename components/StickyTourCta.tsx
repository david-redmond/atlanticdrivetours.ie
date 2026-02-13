"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const HERO_CTA_ID = "tour-hero-cta";
const BOTTOM_CTA_ID = "tour-bottom-cta";

/**
 * Floating CTA shown on tour detail pages when the user has scrolled past the
 * hero CTA but has not yet reached the bottom CTA. Links to contact with tour pre-filled.
 */
export default function StickyTourCta({ tourTitle }: { tourTitle: string }) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  const contactUrl = `/reservation?tour=${encodeURIComponent(tourTitle)}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const heroEl = document.getElementById(HERO_CTA_ID);
    const bottomEl = document.getElementById(BOTTOM_CTA_ID);
    if (!heroEl || !bottomEl) return;

    let heroVisible = true;
    let bottomVisible = false;

    const updateVisibility = () => {
      setShow(!heroVisible && !bottomVisible);
    };

    const heroObserver = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e) heroVisible = e.isIntersecting;
        updateVisibility();
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    );

    const bottomObserver = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e) bottomVisible = e.isIntersecting;
        updateVisibility();
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    );

    heroObserver.observe(heroEl);
    bottomObserver.observe(bottomEl);

    return () => {
      heroObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pb-6 pl-4 pr-4 pointer-events-none md:justify-end md:pb-8 md:pr-8"
      aria-hidden={!show}
    >
      <div
        className="pointer-events-auto transition-[opacity,transform,visibility] duration-300 ease-out"
        style={{
          opacity: show ? 1 : 0,
          visibility: show ? "visible" : "hidden",
          transform: show ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <Link
          href={contactUrl}
          tabIndex={show ? 0 : -1}
          className="inline-block rounded-xl bg-[var(--color-brand)] text-white px-5 py-3 text-sm font-medium shadow-[0_4px_14px_rgba(15,42,29,0.2)] hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] transition-colors"
          aria-label="Book now for free – go to contact form"
        >
          Book now for free
        </Link>
      </div>
    </div>
  );
}
