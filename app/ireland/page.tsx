import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { counties } from "@/data/locations";

export const metadata: Metadata = buildPageMetadata({
  title: "Private Tours by County in Ireland | Atlantic Drive Tours",
  description:
    "Choose your destination — private day tours and a personal driver-guide across Cork, Kerry, Clare, Limerick and Galway on Ireland's Wild Atlantic Way.",
  path: "/ireland",
  absoluteTitle: true,
});

const hubFaqs = [
  {
    question: "Which areas of Ireland do you cover?",
    answer:
      "We focus on the south and west of Ireland — Cork, Kerry, Clare, Limerick and Galway — along the Wild Atlantic Way. We don't cover Dublin or the east coast.",
  },
  {
    question: "Can you combine more than one county in a trip?",
    answer:
      "Yes. A single day is best spent within one county, but over two or more days we can build a tailored multi-day private tour linking several regions.",
  },
  {
    question: "Do you offer door-to-door pickup in each county?",
    answer:
      "Yes — we pick up door-to-door from your hotel, accommodation, airport or cruise port, with timing built around you.",
  },
  {
    question: "Are your tours private?",
    answer:
      "Always. Every tour and transfer is private to your party only — no shared coaches or fixed timetables.",
  },
];

const specialistLinks = [
  { href: "/wild-atlantic-way", label: "Wild Atlantic Way tours" },
  { href: "/cobh-cruise-excursions", label: "Cobh cruise excursions" },
  { href: "/golf-transfers-ireland", label: "Golf transfers Ireland" },
  { href: "/adare-manor-ryder-cup-2027", label: "Adare Manor & 2027 Ryder Cup" },
];

export default function IrelandHubPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "Ireland", path: "/ireland" }]} />
      <FaqJsonLd faqs={hubFaqs} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Reveal>
          <header className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Where we go
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--text-primary)]">
              Private tours by county
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              We cover the south and west of Ireland — Cork, Kerry, Clare,
              Limerick and Galway — with a private driver-guide and door-to-door
              comfort. Choose a county to explore highlights and tours.
            </p>
          </header>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {counties.map((county) => (
            <Reveal key={county.slug}>
              <Link
                href={`/ireland/${county.slug}`}
                className="group block overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={county.image}
                    alt={county.imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    County {county.name}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {county.heroTagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
                    Explore {county.name} →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Specialist services + guides */}
        <Reveal>
          <section className="mt-16 md:mt-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
              Specialist tours &amp; transfers
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {specialistLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/guides"
                className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
              >
                Travel guides →
              </Link>
            </div>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section className="mt-16 md:mt-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
              Frequently asked questions
            </h2>
            <dl className="mt-8 space-y-8">
              {hubFaqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base font-medium text-[var(--text-primary)]">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-[var(--text-secondary)] leading-relaxed">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>
      </div>
    </>
  );
}
