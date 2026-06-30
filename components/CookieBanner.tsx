"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  CONSENT_KEY,
  clearStoredConsent,
  getStoredConsent,
  setStoredConsent,
} from "@/lib/analytics";

type ConsentState = "granted" | "denied" | null;

type Props = {
  /** GA4 measurement ID from the server layout (`GA_MEASUREMENT_ID` or build-time `NEXT_PUBLIC_GA_ID`). */
  gaId: string;
};

export default function CookieBanner({ gaId: GA_ID }: Props) {
  // Start with null so server and client match (no hydration mismatch).
  const [consent, setConsent] = useState<ConsentState>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    queueMicrotask(() => {
      setConsent(stored);
      setHasMounted(true);
    });
  }, []);

  const isOpen = hasMounted && consent === null;
  const bannerRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management + focus trap while the consent dialog is open.
  useEffect(() => {
    if (!isOpen) return;
    const node = bannerRef.current;
    if (!node) return;

    acceptButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", handleKey);
    return () => node.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  useEffect(() => {
    const handlePreferences = () => {
      clearStoredConsent();
      setConsent(null);
    };

    window.addEventListener("cookie-preferences", handlePreferences);
    return () => {
      window.removeEventListener("cookie-preferences", handlePreferences);
    };
  }, []);

  const acceptCookies = () => {
    setStoredConsent("granted");
    setConsent("granted");
  };

  const rejectCookies = () => {
    setStoredConsent("denied");
    setConsent("denied");
  };

  return (
    <>
      {consent === "granted" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('consent', 'default', { analytics_storage: 'denied' });
                gtag('consent', 'update', { analytics_storage: 'granted' });
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: false });
              `,
            }}
            onLoad={() => {
              window.dispatchEvent(new Event("ga-ready"));
            }}
          />
        </>
      )}

      {isOpen && (
        <div
          ref={bannerRef}
          className="cookie-banner fixed bottom-4 left-1/2 z-40 w-[92%] max-w-2xl -translate-x-1/2 rounded-lg border px-4 py-3 sm:py-4 shadow-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-sm text-ink-muted">
              <p className="font-medium text-ink">
                We use analytics cookies to improve this site.
              </p>
              <p>
                You can accept or reject.{" "}
                <a className="underline focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:ring-offset-1 rounded" href="/cookies">
                  Cookie policy
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
              <button
                ref={acceptButtonRef}
                type="button"
                onClick={acceptCookies}
                className="btn btn-primary text-sm py-2.5"
              >
                Accept analytics cookies
              </button>
              <button
                type="button"
                onClick={rejectCookies}
                className="btn-cookie-reject text-sm py-2.5"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const triggerCookiePreferences = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("cookie-preferences"));
  window.localStorage.removeItem(CONSENT_KEY);
};
