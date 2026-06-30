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
import TrackedLink from "@/components/TrackedLink";
import {
  GolfFlagIcon,
  RouteIcon,
  ShipIcon,
  TrophyIcon,
} from "@/components/icons";
import { TranslationProvider } from "@/contexts/TranslationContext";
import {
  baseUrl,
  companyName,
  phone,
  serviceArea,
} from "@/lib/constants";
import { getGaMeasurementId } from "@/lib/ga-config";
import { defaultOgImage } from "@/lib/seo";

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
    "Premium private tours and executive transport in the south-west of Ireland (Cork, Kerry, Clare, Limerick & Galway) for international guests.",
  openGraph: {
    title: "Atlantic Drive Tours",
    description:
      "Private tours, golf transfers, airport transfers, and executive transport in the south-west of Ireland.",
    url: baseUrl,
    siteName: "Atlantic Drive Tours",
    locale: "en_IE",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlantic Drive Tours",
    description:
      "Private tours, golf transfers, airport transfers, and executive transport in the south-west of Ireland.",
    images: [defaultOgImage.url],
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
    <html lang="en" className="no-js" suppressHydrationWarning>
      <body className={`${roboto.variable} ${roboto.className} antialiased`}>
        {/* Progressive enhancement: remove the no-js flag as early as possible so
            scroll-reveal animations run for JS clients, while no-JS clients and
            crawlers keep all content visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js');",
          }}
        />
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
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4 text-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  {companyName}
                </p>
                <p className="text-sm text-neutral-700">{serviceArea}</p>
                <p className="text-sm text-neutral-700">
                  <TrackedLink
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    external
                    event="phone_click"
                    eventParams={{ location: "footer" }}
                    className="text-[#0F2A1D] hover:text-[#143826] transition-colors"
                  >
                    {phone}
                  </TrackedLink>
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
                <Link href="/ireland" className="block text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  Tours by county
                </Link>
                <Link href="/guides" className="block text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  Travel guides
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
                <TrackedLink
                  href="/reservation"
                  event="cta_click"
                  eventParams={{ location: "footer" }}
                  className="block text-neutral-700 hover:text-[var(--color-brand)] transition-colors"
                >
                  Book now free
                </TrackedLink>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  Specialist
                </p>
                <Link href="/wild-atlantic-way" className="flex items-center gap-2 text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  <RouteIcon className="h-4 w-4 shrink-0 text-accent" />
                  Wild Atlantic Way tours
                </Link>
                <Link href="/cobh-cruise-excursions" className="flex items-center gap-2 text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  <ShipIcon className="h-4 w-4 shrink-0 text-accent" />
                  Cobh cruise excursions
                </Link>
                <Link href="/golf-transfers-ireland" className="flex items-center gap-2 text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  <GolfFlagIcon className="h-4 w-4 shrink-0 text-accent" />
                  Golf transfers Ireland
                </Link>
                <Link href="/adare-manor-ryder-cup-2027" className="flex items-center gap-2 text-neutral-700 hover:text-[var(--color-brand)] transition-colors">
                  <TrophyIcon className="h-4 w-4 shrink-0 text-accent" />
                  Adare Manor & 2027 Ryder Cup
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
