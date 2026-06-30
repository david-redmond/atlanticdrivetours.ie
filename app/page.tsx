import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import TrackedLink from "@/components/TrackedLink";
import Reviews from "@/components/Reviews";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";
import HeroVideo from "@/components/HeroVideo";
import { galleryImages } from "@/lib/gallery";
import { allTours } from "@/data/tours";
import { defaultOgImage } from "@/lib/seo";
import {
  baseUrl,
  companyName,
  phone,
  serviceArea,
  socialLinks,
  whatsappNumber,
  whatsappPrefill,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute:
      "Private Tours & Executive Transport in Ireland | Atlantic Drive Tours",
  },
  description:
    "Premium private driver tours and executive transfers in Cork, Kerry, Clare, Limerick & Galway. Door-to-door pickup, tickets & lunch included. Golf transfers, airport transfers and Cobh cruise excursions. Enquire free — no payment today.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Private Tours & Executive Transport in Ireland | Atlantic Drive Tours",
    description:
      "Premium private tours, executive transport, and airport transfers in the south-west of Ireland. Cork, Kerry, Clare, Limerick and Galway.",
    url: baseUrl,
    siteName: companyName,
    locale: "en_IE",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Tours & Executive Transport in Ireland | Atlantic Drive Tours",
    description:
      "Premium private tours, executive transport, and airport transfers in the south-west of Ireland.",
    images: [defaultOgImage.url],
  },
};

const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(whatsappPrefill)}`;

const serviceTypes = [
  "Private day tours",
  "Multi-day private tours",
  "Golf transfers",
  "Airport transfers",
  "Cruise ship transfers",
  "Executive transport",
];

const organizationId = `${baseUrl}/#organization`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": organizationId,
      name: companyName,
      url: baseUrl,
      image: `${baseUrl}/hero.jpg`,
      logo: `${baseUrl}/logo.png`,
      telephone: phone,
      priceRange: "$$$",
      knowsLanguage: ["en"],
      areaServed: ["Cork", "Kerry", "Clare", "Limerick", "Galway"].map(
        (name) => ({ "@type": "AdministrativeArea", name })
      ),
      makesOffer: serviceTypes.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
      sameAs: [socialLinks.facebook, socialLinks.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: companyName,
      publisher: { "@id": organizationId },
    },
  ],
};

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

const signatureServices = [
  {
    title: "Private day tours in Ireland",
    description:
      "Door-to-door private driver tours with tickets and lunch included. From Cork, Kerry, Clare, Limerick and Galway.",
    href: "/tours",
    anchor: "View private day tours",
  },
  {
    title: "Multi-day private tours",
    description:
      "Tailored multi-day itineraries with your own chauffeur along the Wild Atlantic Way. One vehicle, one pace, your schedule.",
    href: "/wild-atlantic-way",
    anchor: "Wild Atlantic Way tours",
  },
  {
    title: "Golf transfers & itineraries",
    description:
      "Golf transfers Ireland: Lahinch, Ballybunion, Old Head, Adare Manor. Bags and tee times handled.",
    href: "/golf-transfers-ireland",
    anchor: "Golf transfers Ireland",
  },
  {
    title: "Airport transfers",
    description:
      "Shannon, Cork, Kerry and Knock airports. Meet & greet, luggage space, punctual pickups.",
    href: "/transfers",
    anchor: "Airport transfers",
  },
  {
    title: "Cruise ship transfers (Cork / Cobh)",
    description:
      "Cruise ship transfers from Cobh to Kinsale, Blarney, Cork and beyond. Timed to your docking.",
    href: "/cobh-cruise-excursions",
    anchor: "Cobh cruise excursions",
  },
  {
    title: "Executive / corporate transport",
    description:
      "Private chauffeur for business and VIP travel. Discreet, punctual, comfortable vehicles.",
    href: "/transfers",
    anchor: "Executive transport",
  },
];

const popularRoutes: { label: string; href?: string }[] = [
  {
    label: "Shannon Airport to Cliffs of Moher private tour",
    href: "/tours/cliffs-of-moher-bunratty",
  },
  { label: "Cork Airport to Killarney", href: "/ireland/kerry" },
  { label: "Shannon Airport to Limerick and Clare", href: "/ireland/clare" },
  {
    label: "Cruise ship pickup from Cobh to Kinsale, Blarney or Cork",
    href: "/cobh-cruise-excursions",
  },
  {
    label: "Golf transfers to Lahinch, Ballybunion, Old Head, Adare Manor",
    href: "/golf-transfers-ireland",
  },
];

const exploreCounties = [
  { name: "Cork", slug: "cork" },
  { name: "Kerry", slug: "kerry" },
  { name: "Clare", slug: "clare" },
  { name: "Limerick", slug: "limerick" },
  { name: "Galway", slug: "galway" },
];

const featuredTourSlugs = [
  "cliffs-of-moher-bunratty",
  "ring-of-kerry-private-tour",
  "dingle-peninsula-private-tour",
];

const featuredTours = featuredTourSlugs
  .map((slug) => allTours.find((t) => t.slug === slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — warm, premium, SEO H1 */}
      <section className="relative" aria-label="Welcome">
        <div className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
          <HeroVideo
            src="/gallery/15114493_3840_2160_30fps.mp4"
            poster="/hero.jpg"
            alt="Scenic Irish landscape: green hills and coastline, typical of private tour routes in Cork, Kerry and the Wild Atlantic Way"
          />
          <div className="absolute inset-0 bg-[#0F2A1D]/25" />
        </div>
        <div className="mx-auto -mt-40 max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="hero-panel px-6 py-8 md:px-10 md:py-10">
              <p className="text-xs tracking-[0.2em] text-[var(--color-accent)]">
                {companyName}
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl">
                Private Tours & Executive Transport in Ireland
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
                Calm, premium travel with your own driver — tailored for international guests.
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {serviceArea.replace(/ and /g, " · ")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <TrackedLink
                  href="#enquiry"
                  event="cta_click"
                  eventParams={{ location: "home_hero" }}
                  className="btn btn-primary"
                >
                  Book now free
                </TrackedLink>
                <TrackedLink
                  href="/tours"
                  event="cta_click"
                  eventParams={{ location: "home_hero_tours" }}
                  className="btn btn-outline"
                >
                  Explore private tours
                </TrackedLink>
                <TrackedLink
                  href={whatsappLink}
                  external
                  event="whatsapp_click"
                  eventParams={{ location: "home_hero" }}
                  className="btn btn-ghost inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  ariaLabel="Get more info on WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  Get more info
                </TrackedLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--text-secondary)]">
                <span>Professional drivers</span>
                <span className="border-l border-[var(--color-line)] pl-6">Comfortable vehicles</span>
                <span className="border-l border-[var(--color-line)] pl-6">Local knowledge</span>
                <span className="border-l border-[var(--color-line)] pl-6">Reliable scheduling</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 1b. Featured tours — visual, tour-led entry point */}
      <section
        className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20"
        aria-labelledby="featured-tours-heading"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                Most loved
              </p>
              <h2
                id="featured-tours-heading"
                className="mt-3 text-2xl font-semibold text-[var(--text-primary)] md:text-3xl"
              >
                Featured private tours
              </h2>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                Our most-booked days out — door-to-door, at your pace, with your
                own driver-guide.
              </p>
            </div>
            <Link
              href="/tours"
              className="hidden text-sm font-medium text-[var(--color-accent)] hover:underline sm:inline-block"
            >
              View all tours →
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour) => (
            <Reveal key={tour.slug}>
              <Link
                href={`/tours/${tour.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={tour.images[0]?.src ?? "/hero.jpg"}
                    alt={tour.images[0]?.alt ?? tour.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="inline-flex items-center rounded-full bg-[var(--color-line)]/40 px-2.5 py-1 font-medium">
                      {tour.duration}
                    </span>
                    {tour.ticketsIncluded && (
                      <span className="inline-flex items-center rounded-full bg-[var(--color-line)]/40 px-2.5 py-1 font-medium">
                        Tickets included
                      </span>
                    )}
                    {tour.lunchIncluded && (
                      <span className="inline-flex items-center rounded-full bg-[var(--color-line)]/40 px-2.5 py-1 font-medium">
                        Lunch included
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {tour.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {tour.shortDescription}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-[var(--color-accent)] group-hover:underline">
                    View tour →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link href="/tours" className="btn btn-outline">
            View all tours
          </Link>
        </div>
      </section>

      {/* 2. Choose your experience — intent routing */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 md:pb-20" aria-labelledby="choose-experience-heading">
        <Reveal>
          <h2 id="choose-experience-heading" className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
            Choose your experience
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal>
            <Link
              href="/tours"
              className="group block overflow-hidden rounded-xl border border-[var(--color-line)] bg-white p-6 shadow-sm transition hover:border-[var(--color-accent)] hover:shadow-md md:p-8"
            >
              <h3 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                Private tours
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Curated private day tours and multi-day journeys. Your own driver, your pace — tickets and lunch included where it matters.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Tickets included where noted
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Door-to-door pickup
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Relaxed, unrushed pace
                </li>
              </ul>
              <span className="mt-5 inline-block text-sm font-medium text-[var(--color-accent)] group-hover:underline">
                View private tours →
              </span>
            </Link>
          </Reveal>
          <Reveal>
            <Link
              href="/transfers"
              className="group block overflow-hidden rounded-xl border border-[var(--color-line)] bg-white p-6 shadow-sm transition hover:border-[var(--color-accent)] hover:shadow-md md:p-8"
            >
              <h3 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                Transfers & executive transport
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Airport transfers, cruise ship pickups from Cork and Cobh, golf transfers, and corporate chauffeur travel across the south-west of Ireland.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Punctual meet & greet
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Luggage space
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Airport, cruise and golf ready
                </li>
              </ul>
              <span className="mt-5 inline-block text-sm font-medium text-[var(--color-accent)] group-hover:underline">
                View transfers →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 2b. Explore by county + guides — internal linking / discovery */}
      <section
        className="mx-auto max-w-6xl px-4 sm:px-6 pb-4 md:pb-8"
        aria-labelledby="explore-heading"
      >
        <Reveal>
          <h2
            id="explore-heading"
            className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl"
          >
            Explore Ireland by county
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--text-secondary)]">
            Private day tours and a personal driver-guide across the south-west.
            Pick a county, or read our travel guides to plan your trip.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-6 flex flex-wrap gap-3">
            {exploreCounties.map((county) => (
              <Link
                key={county.slug}
                href={`/ireland/${county.slug}`}
                className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--color-accent)]"
              >
                County {county.name}
              </Link>
            ))}
            <Link
              href="/ireland"
              className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--color-accent)]"
            >
              All counties →
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
            >
              Travel guides →
            </Link>
            <Link
              href="/experiences"
              className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
            >
              Experiences →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 3. Signature services — SEO + conversion grid */}
      <section className="section-warm" aria-labelledby="signature-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
          <Reveal>
            <h2 id="signature-heading" className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
              Signature private tours & transfers
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[var(--text-secondary)]">
              Private chauffeur-led travel across Cork, Kerry, Clare, Limerick and Galway. Luxury tours Ireland and executive transport, tailored to you.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {signatureServices.map((service) => (
              <Reveal key={service.title}>
                <div className="panel flex flex-col p-6">
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-4 text-sm font-medium text-[var(--color-accent)] hover:underline"
                  >
                    {service.anchor}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Atlantic Drive Tours — trust */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20" aria-labelledby="why-heading">
        <Reveal>
          <h2 id="why-heading" className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
            Why Atlantic Drive Tours
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
            We offer private chauffeur-led travel for your party only — no shared coaches, no rushed timetables. Clear communication, punctuality, and vehicles built for comfort and luggage. Trusted by international guests for airport arrivals, golf bags, cruise ship timing and multi-day private tours.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 text-sm text-[var(--text-secondary)]">
            <li className="flex gap-3">
              <span className="text-[var(--color-accent)] shrink-0">—</span>
              Private chauffeur-led travel (your party only)
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-accent)] shrink-0">—</span>
              Calm, unrushed pacing
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-accent)] shrink-0">—</span>
              Clear communication and punctuality
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-accent)] shrink-0">—</span>
              Trusted by international guests
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-accent)] shrink-0">—</span>
              Comfortable vehicles with luggage space
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-accent)] shrink-0">—</span>
              Golf bags, cruise timing, airport arrivals handled
            </li>
          </ul>
          <div className="mt-8">
            <Link href="#enquiry" className="btn btn-primary">
              Book now free
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 5. Popular routes — SEO block */}
      <section className="section-warm" aria-labelledby="routes-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
          <Reveal>
            <h2 id="routes-heading" className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
              Popular transfers & pickup routes
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[var(--text-secondary)]">
              Examples of private transfer routes we serve. Contact us for availability and a tailored quote.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-[var(--text-secondary)]">
              {popularRoutes.map((route) => (
                <li key={route.label} className="flex gap-3">
                  <span className="text-[var(--color-accent)] shrink-0">·</span>
                  {route.href ? (
                    <Link
                      href={route.href}
                      className="hover:text-[var(--color-accent)] hover:underline"
                    >
                      {route.label}
                    </Link>
                  ) : (
                    route.label
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 6. Testimonials — premium */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20" aria-labelledby="testimonials-heading">
        <Reveal>
          <h2 id="testimonials-heading" className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
            What guests say
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            Quietly five-star, consistently personal.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-10">
            <Reviews limit={3} />
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-8">
            <Link href="/reviews" className="btn btn-outline">
              Read more reviews
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 7. Gallery preview */}
      <section className="section-warm" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
          <Reveal>
            <h2 id="gallery-heading" className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
              Ireland in its best light
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
              A glimpse of the landscapes and moments you can experience on a private tour or transfer with us.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-10">
              <GalleryGrid images={galleryImages.slice(0, 6)} className="stagger" />
            </div>
          </Reveal>
          <div className="mt-8">
            <Link href="/gallery" className="btn btn-outline">
              View gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Booking CTA — reduced friction */}
      <section id="enquiry" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20" aria-labelledby="enquiry-heading">
        <div className="grid gap-12 md:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <div>
              <h2 id="enquiry-heading" className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
                Book now free
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                Tell us your dates, group size and what you have in mind. No payment today. We reply within 24 hours with availability and a tailored plan.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-xl border border-[var(--color-line)] bg-white/95 p-6 shadow-sm md:p-8">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}