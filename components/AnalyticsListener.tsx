"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageview } from "@/lib/analytics";
import { captureFirstTouchAttribution } from "@/lib/attribution";

const GA_READY = "ga-ready";

export default function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastSentPathRef = useRef<string | null>(null);

  // Capture first-touch attribution once per session (no cookies, no consent needed).
  useEffect(() => {
    captureFirstTouchAttribution();
  }, []);

  useEffect(() => {
    const url = `${pathname}${searchParams?.toString() ? `?${searchParams}` : ""}`;

    const sendIfReady = () => {
      if (typeof window.gtag !== "function") return;
      if (lastSentPathRef.current === url) return;
      lastSentPathRef.current = url;
      trackPageview(url);
    };

    const onGaReady = () => {
      sendIfReady();
    };

    window.addEventListener(GA_READY, onGaReady);
    sendIfReady();

    return () => {
      window.removeEventListener(GA_READY, onGaReady);
    };
  }, [pathname, searchParams]);

  return null;
}
