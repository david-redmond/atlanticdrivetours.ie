import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import StickyTourCta from "@/components/StickyTourCta";
import TourGallery from "@/components/TourGallery";
import {
  baseUrl,
  companyName,
  getTourWhatsAppMessage,
  whatsappNumber,
} from "@/lib/constants";
import { getTourBySlug, type TourData } from "@/data/tours";

const slug = "cliffs-of-moher-bunratty";

const tourForMeta = getTourBySlug(slug);
const ogImage = tourForMeta?.images[0]
  ? `${baseUrl}${tourForMeta.images[0].src}`
  : `${baseUrl}/images/Cliffs-of-Moher-1.jpg`;

export const metadata: Metadata = {
  title: "Private Cliffs of Moher & Bunratty Castle Day Tour | Atlantic Drive Tours",
  description:
    "Premium, approachable private day tour with driver-guide, door-to-door pickup, ALL tickets included (Cliffs of Moher + Bunratty Castle & Folk Park), lunch included at a local spot.",
  alternates: { canonical: `${baseUrl}/tours/${slug}` },
  openGraph: {
    title: "Private Cliffs of Moher & Bunratty Castle Day Tour | Atlantic Drive Tours",
    description:
      "Premium private day tour with driver-guide, door-to-door pickup, all tickets and lunch included.",
    url: `${baseUrl}/tours/${slug}`,
    type: "website",
    images: [
      { url: ogImage, width: 1200, height: 630, alt: tourForMeta?.title ?? "Cliffs of Moher & Bunratty Castle Day Tour" },
      ...(tourForMeta?.images.slice(1, 4) ?? []).map((img) => ({
        url: `${baseUrl}${img.src}`,
        width: 1200,
        height: 630,
        alt: img.alt,
      })),
    ],
  },
};

function buildContactUrl(tourTitle: string) {
  return `/reservation?tour=${encodeURIComponent(tourTitle)}`;
}

function buildWhatsAppLink(tourTitle: string) {
  const text = getTourWhatsAppMessage(tourTitle);
  return `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

function JsonLd({ tour }: { tour: TourData }) {
  const itemList = tour.itinerary.map((step, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: step.label,
    description: step.description,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    url: `${baseUrl}/tours/${tour.slug}`,
    image: tour.images.map((img) => `${baseUrl}${img.src}`),
    itinerary: {
      "@type": "ItemList",
      itemListElement: itemList,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: tour.startingFrom
        ? { "@type": "PriceSpecification", price: "0", valueAddedTaxIncluded: true }
        : undefined,
    },
    areaServed: { "@type": "Country", name: "Ireland" },
    provider: {
      "@type": "LocalBusiness",
      name: companyName,
      url: baseUrl,
    },
    additionalType: "https://schema.org/Product",
    additionalProperty: [
      { "@type": "PropertyValue", name: "includesTickets", value: true },
      { "@type": "PropertyValue", name: "includesLunch", value: true },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 shrink-0"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 shrink-0 text-[var(--color-accent)]"
    aria-hidden="true"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h8" />
  </svg>
);

export default function CliffsOfMoherBunrattyTourPage() {
  const tour = getTourBySlug(slug);
  if (!tour) throw new Error(`Tour not found: ${slug}`);

  const contactUrl = buildContactUrl(tour.title);
  const whatsappLink = buildWhatsAppLink(tour.title);

  const badges = [
    "Private",
    "Tickets Included",
    "Lunch Included",
    "Door-to-door",
  ];

  return (
    <>
      <JsonLd tour={tour} />
      <StickyTourCta tourTitle={tour.title} />
      <article className="min-h-screen">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[60vh] min-h-[400px] w-full">
            <Image
              src={tour.images[0]?.src ?? "/images/Cliffs-of-Moher-1.jpg"}
              alt={tour.images[0]?.alt ?? "Cliffs of Moher"}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[var(--color-ink)]/30" />
          </div>
          <div className="mx-auto -mt-32 max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div id="tour-hero-cta" className="hero-panel px-6 py-8 md:px-10 md:py-10">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">
                  Day Tour
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl lg:text-5xl">
                  {tour.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-ink-muted">
                  A premium, approachable private day tour with your own
                  driver-guide. Door-to-door pickup, all entry tickets included,
                  and lunch at a local spot — so you can relax and enjoy the
                  day.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {badges.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white/95 px-3 py-1 text-xs font-medium text-[var(--text-primary)]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={contactUrl}
                    className="btn btn-primary"
                    aria-label="Book now for free – go to contact form"
                  >
                    Book now for free
                  </Link>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline inline-flex items-center gap-2"
                    aria-label="Get more info on WhatsApp"
                  >
                    <WhatsAppIcon />
                    Get more info
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 md:py-24">
          {/* Overview */}
          <Reveal>
            <section className="mb-12 md:mb-20">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule">
                Overview
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                {tour.description}
              </p>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                This tour is ideal for couples, families, small groups, and
                executive travellers who want a single day packed with iconic
                sights and zero hassle — we handle tickets, lunch, and the
                route so you can focus on the experience.
              </p>
            </section>
          </Reveal>

          {/* Gallery */}
          <Reveal>
            <section className="mb-12 md:mb-20">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule mb-4 md:mb-6">
                Gallery
              </h2>
              <TourGallery images={tour.images} />
            </section>
          </Reveal>

          {/* Highlights */}
          <Reveal>
            <section className="mb-12 md:mb-20">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule mb-4 md:mb-6">
                Highlights
              </h2>
              <ul className="space-y-3">
                {tour.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[var(--text-secondary)]"
                  >
                    <span className="text-[var(--color-accent)] mt-0.5">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Storyteller Time — only when tour has stories */}
          {tour.stories && tour.stories.length > 0 && (
            <Reveal>
              <section
                className="mb-12 md:mb-20 -rotate-[0.3deg] rounded-xl border-2 border-dashed border-[var(--color-line)] px-5 py-6 md:px-10 md:py-10 shadow-[0_2px_12px_rgba(15,42,29,0.06)]"
                style={{ backgroundColor: "#f5f0e8" }}
                aria-labelledby="storyteller-time-heading"
              >
                <h2
                  id="storyteller-time-heading"
                  className="flex items-center gap-2 text-xl font-semibold text-[var(--text-primary)] mb-4 md:mb-6"
                >
                  <BookIcon />
                  Storyteller Time
                </h2>
                <div className="space-y-6 md:space-y-8">
                  {tour.stories.map((story, i) => (
                    <article key={i} className="leading-relaxed">
                      {story.title && (
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                          {story.title}
                        </h3>
                      )}
                      <p
                        className="text-[var(--text-secondary)] text-[1.0625rem] leading-[1.7]"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                      >
                        {story.text}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* Sample itinerary */}
          <Reveal>
            <section className="mb-12 md:mb-20">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule mb-4 md:mb-6">
                Sample itinerary
              </h2>
              <ul className="space-y-4">
                {tour.itinerary.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    {step.time && (
                      <span className="text-sm font-medium text-[var(--color-accent)] shrink-0 w-24">
                        {step.time}
                      </span>
                    )}
                    <div>
                      <span className="font-medium text-[var(--text-primary)]">
                        {step.label}
                      </span>
                      {step.description && (
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-[var(--text-muted)] italic">
                Timing varies by season, traffic, and your pace. We’ll keep the
                day relaxed and adaptable.
              </p>
            </section>
          </Reveal>

          {/* What's included */}
          <Reveal>
            <section className="mb-12 md:mb-20">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule mb-4 md:mb-6">
                What’s included
              </h2>
              <ul className="space-y-2">
                {tour.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[var(--text-secondary)]"
                  >
                    <span className="text-[var(--color-accent)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* What to bring */}
          <Reveal>
            <section className="mb-12 md:mb-20">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule mb-4 md:mb-6">
                What to bring
              </h2>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                {tour.whatToBring.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[var(--color-accent)]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* FAQs */}
          <Reveal>
            <section className="mb-12 md:mb-20">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule mb-4 md:mb-6">
                Frequently asked questions
              </h2>
              <dl className="space-y-6">
                {tour.faqs.map((faq, i) => (
                  <div key={i}>
                    <dt className="font-medium text-[var(--text-primary)]">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-[var(--text-secondary)] pl-0">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>

          {/* Testimonials */}
          <Reveal>
            <section className="mb-12 md:mb-20">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule mb-4 md:mb-6">
                What guests say
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {tour.testimonials?.slice(0, 6).map((t, i) => (
                  <blockquote
                    key={i}
                    className="panel p-6 border-l-4 border-[var(--color-accent)]"
                  >
                    <p className="text-[var(--text-secondary)] italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="mt-3 text-sm text-[var(--text-muted)]">
                      — {t.name}
                      {t.location && `, ${t.location}`}
                      {t.date && ` · ${t.date}`}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Final CTA */}
          <Reveal>
            <section id="tour-bottom-cta" className="section-warm rounded-xl px-5 py-8 md:px-10 md:py-12 border border-[var(--color-line)]">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Tell us your date, pickup location, group size, and interests
              </h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                We’ll respond with availability and a tailored quote. No
                obligation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={contactUrl}
                  className="btn btn-primary"
                  aria-label="Book now for free – go to contact form"
                >
                  Book now for free
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline inline-flex items-center gap-2"
                  aria-label="Get more info on WhatsApp"
                >
                  <WhatsAppIcon />
                  Get more info
                </a>
              </div>
            </section>
          </Reveal>
        </div>
      </article>
    </>
  );
}
