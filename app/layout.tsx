import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsListener from "@/components/AnalyticsListener";
import CookiePreferencesLink from "@/components/CookiePreferencesLink";
import SiteHeader from "@/components/SiteHeader";
import SocialLinks from "@/components/SocialLinks";
import { TranslationProvider } from "@/contexts/TranslationContext";
import {
  baseUrl,
  companyName,
  phone,
  serviceArea,
} from "@/lib/constants";
import { getGaMeasurementId } from "@/lib/ga-config";

/** Read GA (and other server env) on each request so Docker Compose `environment` works. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    default: "Atlantic Drive Tours",
    template: "%s | Atlantic Drive Tours",
  },
  description:
    "Premium private tours and executive transport across Ireland for international guests.",
  openGraph: {
    title: "Atlantic Drive Tours",
    description:
      "Private tours, golf transfers, airport transfers, and executive transport across Ireland.",
    url: baseUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlantic Drive Tours",
    description:
      "Private tours, golf transfers, airport transfers, and executive transport across Ireland.",
  },
};

const roboto = Roboto({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = getGaMeasurementId();

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.className} antialiased`}>
        <TranslationProvider>
          <Suspense fallback={null}>
            <AnalyticsListener />
          </Suspense>
          <div className="min-h-screen bg-ivory">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
          >
            Skip to main content
          </a>
          <SiteHeader />

          <main id="main-content">{children}</main>

          <footer className="bg-ivory-muted">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
              <div className="space-y-4 text-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  {companyName}
                </p>
                <p className="text-sm text-neutral-700">{serviceArea}</p>
                <p className="text-sm text-neutral-700">
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-[#0F2A1D] hover:text-[#143826] transition-colors"
                  >
                    {phone}
                  </a>
                </p>
                <div className="pt-1">
                  <SocialLinks />
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  Company
                </p>
                <Link href="/tours" className="block text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  Tours
                </Link>
                <Link href="/transfers" className="block text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  Transfers
                </Link>
                <Link href="/gallery" className="block text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  Gallery
                </Link>
                <Link href="/about" className="block text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  About
                </Link>
                <Link href="/reviews" className="block text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  Reviews
                </Link>
                <Link href="/experiences" className="block text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  Experiences
                </Link>
                <Link href="/reservation" className="block text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  Book now free
                </Link>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  Legal
                </p>
                <Link href="/privacy" className="block text-neutral-700">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-neutral-700">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="block text-neutral-700">
                  Cookie Policy
                </Link>
                <Link href="/disclaimer" className="block text-neutral-700">
                  Disclaimer
                </Link>
                <CookiePreferencesLink />
              </div>
            </div>
          </footer>
        </div>
          <CookieBanner gaId={gaMeasurementId} />
        </TranslationProvider>
      </body>
    </html>
  );
}
