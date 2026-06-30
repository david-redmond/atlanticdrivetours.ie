import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import TrackView from "@/components/TrackView";
import TrackedLink from "@/components/TrackedLink";
import { baseUrl, phone, whatsappNumber, whatsappPrefill } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You",
  description: "We have received your enquiry.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${baseUrl}/thank-you` },
  openGraph: {
    title: "Thank You",
    description: "We have received your enquiry.",
    url: `${baseUrl}/thank-you`,
    type: "website",
  },
};

const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(whatsappPrefill)}`;

const nextSteps = [
  "We read your enquiry and check availability for your dates",
  "We reply by email (and WhatsApp if you prefer) with a tailored plan",
  "You confirm when you're ready — there's no payment today",
];

const exploreMore = [
  {
    title: "Browse private day tours",
    description: "Cliffs of Moher, Ring of Kerry, Dingle and Cork.",
    href: "/tours",
  },
  {
    title: "Read our travel guides",
    description: "Plan the perfect trip with our local guides.",
    href: "/guides",
  },
  {
    title: "Wild Atlantic Way tours",
    description: "Multi-day private journeys along the west coast.",
    href: "/wild-atlantic-way",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <TrackView event="thank_you_view" />
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <Reveal>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Thank you
            </p>
            <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
              We&apos;ve received your enquiry
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              We&apos;ll personally reply with availability and a tailored plan
              — usually <strong>within 24 hours, often the same day</strong>.
              There&apos;s no payment today. Check your inbox for a confirmation
              email (and your spam folder, just in case).
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <TrackedLink
                href={whatsappLink}
                external
                event="whatsapp_click"
                eventParams={{ location: "thank_you" }}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Message us on WhatsApp
              </TrackedLink>
              <TrackedLink
                href={`tel:${phone.replace(/\s/g, "")}`}
                external
                event="phone_click"
                eventParams={{ location: "thank_you" }}
                className="btn btn-outline"
              >
                Call {phone}
              </TrackedLink>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14 rounded-xl border border-[var(--color-line)] bg-white p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              What happens next
            </h2>
            <ol className="mt-4 space-y-4">
              {nextSteps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-medium text-white"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-[var(--text-secondary)]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              While you wait, keep exploring
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Many guests add a second region, an airport transfer, or a golf
              day — just mention it in your reply and we&apos;ll build it in.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {exploreMore.map((item) => (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  event="cta_click"
                  eventParams={{ location: "thank_you_upsell", target: item.href }}
                  className="group block rounded-xl border border-[var(--color-line)] bg-white p-5 transition hover:border-[var(--color-accent)] hover:shadow-md"
                >
                  <span className="block font-medium text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-sm text-[var(--text-secondary)]">
                    {item.description}
                  </span>
                </TrackedLink>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Back to home →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
