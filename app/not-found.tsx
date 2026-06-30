import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Atlantic Drive Tours" },
  robots: { index: false, follow: true },
};

const quickLinks = [
  { href: "/tours", label: "Private tours" },
  { href: "/transfers", label: "Transfers" },
  { href: "/ireland", label: "Tours by county" },
  { href: "/guides", label: "Travel guides" },
  { href: "/reservation", label: "Book now" },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Error 404</p>
      <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
        We can&apos;t find that page
      </h1>
      <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
        The page may have moved or no longer exists. Let&apos;s get you back on
        the road — try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Link href="/" className="btn btn-primary mt-10 inline-flex">
        Back to home
      </Link>
    </div>
  );
}
