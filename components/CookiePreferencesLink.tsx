"use client";

import { triggerCookiePreferences } from "@/components/CookieBanner";

export default function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={triggerCookiePreferences}
      className="text-sm underline"
    >
      Cookie preferences
    </button>
  );
}
