export const CONSENT_KEY = "adtours_analytics_consent";

export type ConsentState = "granted" | "denied";

export const getStoredConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "granted" || value === "denied") return value;
  return null;
};

export const setStoredConsent = (value: ConsentState) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, value);
};

export const clearStoredConsent = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CONSENT_KEY);
};

export const isConsentGranted = () => getStoredConsent() === "granted";

export const safeGtag = (...args: unknown[]): void => {
  if (typeof window === "undefined") return;
  if (!isConsentGranted()) return;
  if (typeof window.gtag !== "function") return;
  window.gtag(...args);
};

export const trackPageview = (url: string) => {
  safeGtag("event", "page_view", {
    page_path: url,
  });
};

export const trackEvent = (
  name: string,
  params?: Record<string, string | number | boolean>
) => {
  safeGtag("event", name, params ?? {});
};
