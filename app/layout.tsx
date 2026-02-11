import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Roboto } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsListener from "@/components/AnalyticsListener";
import CookiePreferencesLink from "@/components/CookiePreferencesLink";
import {
  baseUrl,
  companyName,
  navLinks,
  phone,
  serviceArea,
  whatsappNumber,
  whatsappPrefill,
} from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Atlantic Drive Tours",
    template: "%s | Atlantic Drive Tours",
  },
  description:
    "Premium private tours and executive transport across Ireland for international guests.",
  alternates: {
    canonical: baseUrl,
  },
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

const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(whatsappPrefill)}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.className} antialiased`}>
        <AnalyticsListener />
        <div className="min-h-screen bg-ivory">
          <header className="bg-ivory">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
              <Link href="/" className="flex shrink-0">
                <Image
                  src="/logo.png"
                  alt={companyName}
                  width={260}
                  height={73}
                  className="h-[62px] w-auto object-contain md:h-[73px]"
                  priority
                />
              </Link>
              <nav className="hidden items-center gap-8 text-sm uppercase tracking-widest md:flex">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-ink-muted">
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link href="/contact" className="btn btn-primary hidden md:inline-flex">
                Request availability
              </Link>
            </div>
          </header>

          <main>{children}</main>

          <footer className="bg-ivory-muted">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
              <div className="space-y-3 text-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  {companyName}
                </p>
                <p className="text-sm text-neutral-700">{serviceArea}</p>
                <p className="text-sm text-neutral-700">Phone: {phone}</p>
                <a
                  className="text-sm text-neutral-700 underline"
                  href={`tel:${phone.replace(/\s/g, "")}`}
                >
                  Call
                </a>
                <a className="text-sm text-neutral-700 underline" href={whatsappLink}>
                  WhatsApp
                </a>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  Company
                </p>
                <Link href="/services" className="block text-neutral-700">
                  Services
                </Link>
                <Link href="/gallery" className="block text-neutral-700">
                  Gallery
                </Link>
                <Link href="/contact" className="block text-neutral-700">
                  Request Availability
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
        <CookieBanner />
      </body>
    </html>
  );
}
