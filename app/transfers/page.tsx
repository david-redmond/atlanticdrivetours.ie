import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  baseUrl,
  getTransfersWhatsAppMessage,
  whatsappNumber,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Transfers & Executive Transport | Atlantic Drive Tours",
  description:
    "High-end private transfers across Ireland — airport, cruise, city-to-city, golf, and events. Cork, Kerry, Clare, Limerick, Galway, Dublin.",
  alternates: { canonical: `${baseUrl}/transfers` },
  openGraph: {
    title: "Transfers & Executive Transport | Atlantic Drive Tours",
    description:
      "High-end private transfers across Ireland — calm, punctual, discreet.",
    url: `${baseUrl}/transfers`,
    type: "website",
  },
};

const regionsLine = "Cork · Kerry · Clare · Limerick · Galway · Dublin";

function buildWhatsAppLink(): string {
  const base = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${base}?text=${encodeURIComponent(getTransfersWhatsAppMessage)}`;
}

const whatsappLink = buildWhatsAppLink();

/** Images from /images/transfers/ — uniform aspect and alignment in grid. */
const transferImages = [
  { src: "/images/transfers/minibuss.webp", alt: "Luxury minibus interior Ireland" },
  { src: "/images/transfers/meet-and-greet-heathrow-terminal-2.jpg", alt: "Airport transfer meet and greet Ireland" },
  { src: "/images/transfers/Journal5_GolfTravel_82f90905-3f34-4cdd-82db-03a195eb23ba_1024x1024.webp", alt: "Golf group minibus transfer Ireland" },
  { src: "/images/transfers/large.jpg", alt: "Executive transport Ireland" },
  { src: "/images/transfers/Disney-Magic-scaled.jpg", alt: "Cruise ship transfer Cork Ireland" },
  { src: "/images/transfers/WhatsApp+Image+2023-07-31+at+15.05.43.webp", alt: "Private minibus Ireland" },
];

/** Service type values must match EnquiryForm dropdown exactly for prefill. */
const transferOptions = [
  {
    title: "Golf transfers",
    serviceParam: "Golf Transfers" as const,
    description:
      "A core specialty. We cater to tee times, clubs, and multi-course itineraries. Corporate golf days and society outings welcome.",
    bullets: [
      "Tee-time friendly scheduling",
      "Golf bags and luggage space",
      "Multi-course and multi-day trips",
      "Corporate golf and society outings",
    ],
  },
  {
    title: "Airport transfers (all Irish airports)",
    serviceParam: "Airport Transfer" as const,
    description:
      "Meet-and-greet or kerbside pickup at Dublin, Cork, Shannon, Kerry, and Knock. We track your flight and adjust for delays so you are never left waiting.",
    bullets: [
      "Dublin Airport (DUB)",
      "Cork Airport (ORK)",
      "Shannon Airport (SNN)",
      "Kerry Airport (KIR)",
      "Ireland West Airport Knock (NOC)",
    ],
  },
  {
    title: "Cruise ship transfers (Cork / Cobh)",
    serviceParam: "Private Tour" as const,
    description:
      "Port of Cork and Cobh cruise terminal. We work around your ship's arrival and departure times so you make your sailing without stress.",
    bullets: [
      "Port of Cork",
      "Cobh cruise terminal",
      "Timed to your ship schedule",
      "Group and private options",
    ],
  },
  {
    title: "City-to-city transfers",
    serviceParam: "Executive / Corporate" as const,
    description:
      "Comfortable point-to-point journeys between major cities and towns. Ideal for business, relocation, or a relaxed way to move between bases.",
    bullets: [
      "Dublin ↔ Galway",
      "Dublin ↔ Cork",
      "Cork ↔ Killarney",
      "Shannon ↔ Limerick",
      "Custom routes on request",
    ],
  },
  {
    title: "Hotel-to-hotel transfers & events",
    serviceParam: "Executive / Corporate" as const,
    description:
      "Weddings, conferences, and group travel. One vehicle or a small fleet — we coordinate pickups, drop-offs, and timing so your day runs smoothly.",
    bullets: [
      "Wedding and event transport",
      "Conference and corporate groups",
      "Multi-stop itineraries",
      "Hotel, venue, and airport combinations",
    ],
  },
];

const whyChooseBullets = [
  "Professional drivers with local knowledge",
  "Comfortable vehicles with ample luggage space",
  "Reliable timing and clear communication",
  "Door-to-door pickup and drop-off",
  "Golf bags and group-friendly transfers",
  "Calm, premium experience from start to finish",
];

const howItWorksSteps = [
  "Share your dates and pickup details",
  "We confirm availability and plan the best route",
  "You receive a tailored plan (no obligation)",
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Do you provide airport meet & greet?",
    answer:
      "Yes. We can arrange meet-and-greet at the arrivals hall or kerbside pickup. We monitor flight times and adjust for delays so we are there when you land.",
  },
  {
    question: "Can you accommodate luggage and golf clubs?",
    answer:
      "Yes. Our vehicles have space for suitcases and golf bags. Tell us your group size and luggage when you book so we assign the right vehicle.",
  },
  {
    question: "Is this private or shared?",
    answer:
      "All our transfers are private — the vehicle is for you and your party only. We do not run shared shuttle services.",
  },
  {
    question: "Can we add scenic stops?",
    answer:
      "Yes. Many clients add a short stop en route. Tell us your preferences and we will factor it into the timing and route.",
  },
  {
    question: "Can you work around cruise ship schedules?",
    answer:
      "Yes. We plan around your ship's arrival and departure times at Cork/Cobh and other ports. We keep in touch so you never miss your sailing.",
  },
  {
    question: "Do you provide child seats?",
    answer:
      "Yes. Tell us the ages and number of children when you book and we will provide appropriate child seats or boosters at no extra charge.",
  },
  {
    question: "How far in advance should we book?",
    answer:
      "We recommend booking as soon as your dates are set, especially for peak season, golf, and cruise transfers. Short notice is often possible — just ask.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We cover Cork, Kerry, Clare, Limerick, Galway, Dublin, and the regions between. Airport and port transfers connect to all of Ireland.",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function TransfersPage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[360px] w-full">
          <Image
            src="/hero.jpg"
            alt="Ireland landscape"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--color-ink)]/25" />
        </div>
        <div className="mx-auto -mt-32 max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="hero-panel px-6 py-8 md:px-10 md:py-10">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                Transfers
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl lg:text-5xl">
                Transfers & Executive Transport
              </h1>
              <p className="mt-4 max-w-2xl text-base text-ink-muted">
                High-end private transfers across Ireland — calm, punctual,
                discreet.
              </p>
              <p className="mt-2 text-sm text-ink-muted">{regionsLine}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/reservation"
                  className="btn btn-primary"
                  aria-label="Book now for free – go to reservation form"
                >
                  Book now free
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline inline-flex items-center gap-2"
                  aria-label="Get more info on WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  Get more info
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Minibus / transfer imagery */}
        <Reveal>
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Our vehicles
            </p>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-[var(--text-primary)]">
              Premium minibus & executive transport
            </h2>
            <p className="mt-3 text-[var(--text-secondary)] max-w-2xl">
              Comfortable, well-maintained vehicles for groups and individuals
              across Ireland.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {transferImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-ivory-muted)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Transfer options */}
        <Reveal>
          <div className="mt-20 md:mt-28">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
              Transfer options
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-2xl">
              From airport meet-and-greet to golf and cruise transfers — we
              cover the journeys that matter.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-8 md:gap-10">
          {transferOptions.map((option) => (
            <Reveal key={option.title}>
              <article className="panel overflow-hidden p-6 md:p-8">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  {option.title}
                </h3>
                <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
                  {option.description}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-[var(--text-secondary)]">
                  {option.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/reservation?service=${encodeURIComponent(option.serviceParam)}`}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 rounded"
                >
                  Book now free →
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Why choose us */}
        <Reveal>
          <section className="mt-20 md:mt-28">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
              Why book transfers with Atlantic Drive Tours
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-[var(--text-secondary)]"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* How it works */}
        <Reveal>
          <section className="mt-20 md:mt-28 section-warm rounded-xl border border-[var(--color-line)] px-6 py-10 md:px-10 md:py-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
              How it works
            </h2>
            <ol className="mt-8 space-y-6">
              {howItWorksSteps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-medium text-white"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="text-[var(--text-secondary)] pt-0.5">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <Link
              href="/reservation"
              className="btn btn-primary mt-8 inline-flex"
            >
              Book now free
            </Link>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section className="mt-20 md:mt-28">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
              Frequently asked questions
            </h2>
            <dl className="mt-8 space-y-8">
              {faqs.map((faq) => (
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

        {/* Final CTA */}
        <Reveal>
          <section className="mt-20 md:mt-28 section-warm rounded-xl border border-[var(--color-line)] px-6 py-10 md:px-10 md:py-12">
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
              Not sure what transfer you need?
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
              Tell us your dates, pickup location, and group size — we&apos;ll
              recommend the best option.
            </p>
            <Link href="/reservation" className="btn btn-primary mt-6 inline-flex">
              Book now free
            </Link>
          </section>
        </Reveal>
      </div>
    </article>
  );
}
