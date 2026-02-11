"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CONSENT_KEY,
  clearStoredConsent,
  getStoredConsent,
  setStoredConsent,
} from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type ConsentState = "granted" | "denied" | null;

function getInitialConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  return getStoredConsent();
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(getInitialConsent);
  const [isOpen, setIsOpen] = useState(() => getInitialConsent() === null);

  useEffect(() => {
    const handlePreferences = () => {
      clearStoredConsent();
      setConsent(null);
      setIsOpen(true);
    };

    window.addEventListener("cookie-preferences", handlePreferences);
    return () => {
      window.removeEventListener("cookie-preferences", handlePreferences);
    };
  }, []);

  const acceptCookies = () => {
    setStoredConsent("granted");
    setConsent("granted");
    setIsOpen(false);
  };

  const rejectCookies = () => {
    setStoredConsent("denied");
    setConsent("denied");
    setIsOpen(false);
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
                gtag('consent', 'default', { analytics_storage: 'denied' });
                gtag('consent', 'update', { analytics_storage: 'granted' });
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: false });
              `,
            }}
          />
        </>
      )}

      {isOpen && (
        <div
          className="cookie-banner fixed bottom-4 left-1/2 z-40 w-[92%] max-w-2xl -translate-x-1/2 rounded-lg border px-4 py-3 sm:py-4 shadow-sm"
          role="dialog"
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
