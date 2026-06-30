import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

type Experience = {
  id: string;
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  href: string;
  image: string;
  imageAlt: string;
};

const experiences: Experience[] = [
  {
    id: "wild-atlantic-way",
    title: "The Wild Atlantic Way",
    duration: "Multi-day",
    description:
      "A flowing private journey along Ireland's spectacular western seaboard — cliffs, peninsulas and harbour villages, at your own pace.",
    highlights: [
      "Cliffs of Moher and the Burren",
      "Ring of Kerry and Dingle Peninsula",
      "Connemara and the Galway coast",
      "Hotels and pace tailored to you",
    ],
    href: "/wild-atlantic-way",
    image: "/images/cliffs-of-moher.jpg",
    imageAlt: "Cliffs of Moher on the Wild Atlantic Way",
  },
  {
    id: "kerry",
    title: "Kingdom of Kerry",
    duration: "1–2 days",
    description:
      "The very best of County Kerry — the iconic Ring of Kerry and the wild, intimate Dingle Peninsula, with mountains, beaches and Atlantic views.",
    highlights: [
      "Ring of Kerry full loop",
      "Slea Head Drive on Dingle",
      "Killarney National Park",
      "Kerry Cliffs and the Skellig coast",
    ],
    href: "/ireland/kerry",
    image: "/images/ring-of-kerry.jpg",
    imageAlt: "Ring of Kerry scenery in County Kerry",
  },
  {
    id: "cork-cobh",
    title: "Cork Harbour & Cobh",
    duration: "Day / cruise shore day",
    description:
      "Blarney Castle, gourmet Kinsale and the Titanic heritage of Cobh — perfect for cruise guests and Cork stays, timed around your day.",
    highlights: [
      "Blarney Castle & the Blarney Stone",
      "Kinsale harbour town",
      "Cobh and the Titanic story",
      "Guaranteed return for cruise guests",
    ],
    href: "/cobh-cruise-excursions",
    image: "/images/cobh.jpeg",
    imageAlt: "The harbour town of Cobh in County Cork",
  },
  {
    id: "golf",
    title: "Golf escapes",
    duration: "Tailored",
    description:
      "Premium golf transfers and itineraries across the south-west's great links courses, with tee-time scheduling and room for the clubs.",
    highlights: [
      "Ballybunion, Lahinch and Tralee",
      "Old Head of Kinsale and Waterville",
      "Adare Manor — 2027 Ryder Cup host",
      "Rest-day sightseeing for the group",
    ],
    href: "/golf-transfers-ireland",
    image: "/images/transfers/Journal5_GolfTravel_82f90905-3f34-4cdd-82db-03a195eb23ba_1024x1024.webp",
    imageAlt: "Golf travel transfer in Ireland",
  },
  {
    id: "adare-ryder-cup",
    title: "Adare Manor & the 2027 Ryder Cup",
    duration: "Tailored / event week",
    description:
      "Seamless private transport for the 2027 Ryder Cup at Adare Manor — airport transfers, daily course shuttles and tailored sightseeing. Demand will be exceptional; plan early.",
    highlights: [
      "Airport transfers from Shannon, Cork and Kerry",
      "Daily transport to and from Adare Manor",
      "Group and corporate itineraries",
      "Rest-day sightseeing along the Wild Atlantic Way",
    ],
    href: "/adare-manor-ryder-cup-2027",
    image: "/images/transfers/large.jpg",
    imageAlt: "Executive private transport for the 2027 Ryder Cup at Adare Manor",
  },
];

const whyChoose = [
  {
    title: "Comfortable vehicles",
    description: "Well-maintained, spacious vehicles with room for luggage and golf bags.",
  },
  {
    title: "Local driver-guides",
    description: "Genuine knowledge, great stories, and honest local recommendations.",
  },
  {
    title: "Personalised service",
    description: "Everything tailored to you — your pace, your interests, your party only.",
  },
];

export default function ExperiencesPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "Experiences", path: "/experiences" }]} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Reveal>
          <header className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Experiences
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--text-primary)]">
              Curated private experiences in Ireland
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              A starting point, not a fixed menu. Every experience is private
              and fully tailored — tell us what inspires you and we&apos;ll build
              the perfect itinerary.
            </p>
          </header>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {experiences.map((exp) => (
            <Reveal key={exp.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white shadow-sm">
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[var(--text-primary)]">
                    {exp.duration}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    {exp.title}
                  </h2>
                  <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <span className="mt-0.5 text-[var(--color-accent)]">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-1 flex-wrap items-end gap-3">
                    <Link
                      href={exp.href}
                      className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                    >
                      Explore this experience →
                    </Link>
                    <Link
                      href="/reservation"
                      className="btn btn-primary ml-auto"
                    >
                      Book now free
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Why choose */}
        <Reveal>
          <section className="mt-20 md:mt-28 section-warm rounded-xl border border-[var(--color-line)] px-6 py-10 md:px-10 md:py-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
              Why travel with us
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {whyChoose.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <section className="mt-16 md:mt-24 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)]">
              Ready to explore Ireland?
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">
              Tell us your dates and interests and we&apos;ll craft a private
              experience around you. No payment today.
            </p>
            <Link href="/reservation" className="btn btn-primary mt-8 inline-flex">
              Book now free
            </Link>
          </section>
        </Reveal>
      </div>
    </>
  );
}
