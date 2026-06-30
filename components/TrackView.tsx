"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackViewProps = {
  event: string;
  params?: Record<string, string | number | boolean>;
};

/**
 * Fires a GA4 event once on mount. Use inside server components to record
 * meaningful page views (e.g. tour_view) without making the page a client component.
 */
export default function TrackView({ event, params }: TrackViewProps) {
  useEffect(() => {
    trackEvent(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
