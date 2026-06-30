/**
 * First-touch lead attribution captured client-side and stored for the session.
 * Captured once on the first page of a session (UTM params, external referrer,
 * landing path) and attached to enquiry submissions so the owner can see where
 * each lead came from.
 */

const KEY = "adt_attribution";

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingPath?: string;
};

const UTM_MAP: [string, keyof Attribution][] = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_term", "utmTerm"],
  ["utm_content", "utmContent"],
];

/** Capture first-touch attribution once per session. Safe to call on every page. */
export function captureFirstTouchAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const attr: Attribution = {};
    for (const [query, key] of UTM_MAP) {
      const value = params.get(query);
      if (value) attr[key] = value.slice(0, 200);
    }

    const ref = document.referrer;
    // Only store external referrers; ignore same-origin internal navigation.
    if (ref && !ref.startsWith(window.location.origin)) {
      attr.referrer = ref.slice(0, 300);
    }
    attr.landingPath = (
      window.location.pathname + window.location.search
    ).slice(0, 300);

    window.sessionStorage.setItem(KEY, JSON.stringify(attr));
  } catch {
    // sessionStorage may be unavailable (private mode, etc.) — fail silently.
  }
}

/** Read stored first-touch attribution for the current session. */
export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
