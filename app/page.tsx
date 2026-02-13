import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import Reviews from "@/components/Reviews";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";
import { galleryImages } from "@/lib/gallery";
import {
  baseUrl,
  companyName,
  phone,
  serviceArea,
  whatsappNumber,
  whatsappPrefill,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Private Tours & Executive Transport in Ireland | Atlantic Drive Tours",
  description:
    "Premium private tours Ireland, luxury tours Ireland, executive transport and airport transfers. Private driver tours from Cork, Kerry, Galway, Dublin. Golf transfers, cruise ship transfers Cork Cobh.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Private Tours & Executive Transport in Ireland | Atlantic Drive Tours",
    description:
      "Premium private tours, executive transport, and airport transfers across Ireland. Cork, Kerry, Clare, Limerick, Galway and Dublin.",
    url: baseUrl,
    type: "website",
  },
};

const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(whatsappPrefill)}`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TouristTrip", "TransportationService"],
  name: companyName,
  url: baseUrl,
  areaServed: "Ireland",
  telephone: phone,
  serviceType: [
    "Private tours",
    "Multi-day private tours",
    "Golf transfers",
    "Airport transfers",
    "Executive transport",
    "Cruise ship transfers",
  ],
  sameAs: [],
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
      "Door-to-door private driver tours with tickets and lunch included. From Cork, Kerry, Galway and Dublin.",
    href: "/tours",
    anchor: "View private day tours",
  },
  {
    title: "Multi-day private tours",
    description:
      "Tailored multi-day itineraries with your own chauffeur. One vehicle, one pace, your schedule.",
    href: "/tours",
    anchor: "View private tours",
  },
  {
    title: "Golf transfers & itineraries",
    description:
      "Golf transfers Ireland: Lahinch, Ballybunion, Old Head, Adare Manor. Bags and tee times handled.",
    href: "/transfers",
    anchor: "Golf transfers",
  },
  {
    title: "Airport transfers",
    description:
      "Dublin, Cork, Shannon, Kerry and Knock airports. Meet & greet, luggage space, punctual pickups.",
    href: "/transfers",
    anchor: "Airport transfers",
  },
  {
    title: "Cruise ship transfers (Cork / Cobh)",
    description:
      "Cruise ship transfers from Cobh to Kinsale, Blarney, Cork and beyond. Timed to your docking.",
    href: "/transfers",
    anchor: "Cruise transfers",
  },
  {
    title: "Executive / corporate transport",
    description:
      "Private chauffeur for business and VIP travel. Discreet, punctual, comfortable vehicles.",
    href: "/transfers",
    anchor: "Executive transport",
  },
];

const popularRoutes = [
  "Dublin Airport to Galway private transfer",
  "Cork Airport to Killarney",
  "Shannon Airport to Limerick and Clare",
  "Cruise ship pickup from Cobh to Kinsale, Blarney or Cork",
  "Golf transfers to Lahinch, Ballybunion, Old Head, Adare Manor",
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — warm, premium, SEO H1 */}
      <section className="relative" aria-label="Welcome">
        <div className="relative h-[72vh] min-h-[520px] w-full">
          <Image
            src="/hero.jpg"
            alt="Scenic Irish landscape: green hills and coastline, typical of private tour routes in Cork, Kerry and the Wild Atlantic Way"
            fill
            priority
            className="object-cover"
            sizes="100vw"
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
                <Link href="#enquiry" className="btn btn-primary">
                  Book now free
                </Link>
                <Link
                  href="/tours"
                  className="btn btn-outline"
                >
                  Explore private tours
                </Link>
                <a
                  href={whatsappLink}
                  className="btn btn-ghost inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get more info on WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  Get more info
                </a>
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

      {/* 2. Choose your experience — intent routing */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20" aria-labelledby="choose-experience-heading">
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
                  Tickets included
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
                Airport transfers, cruise ship pickups from Cork and Cobh, golf transfers, and corporate chauffeur travel across Ireland.
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

      {/* 3. Signature services — SEO + conversion grid */}
      <section className="section-warm" aria-labelledby="signature-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
          <Reveal>
            <h2 id="signature-heading" className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
              Signature private tours & transfers
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[var(--text-secondary)]">
              Private chauffeur-led travel across Cork, Kerry, Clare, Limerick, Galway and Dublin. Luxury tours Ireland and executive transport, tailored to you.
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
                <li key={route} className="flex gap-3">
                  <span className="text-[var(--color-accent)] shrink-0">·</span>
                  {route}
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
            <Reviews />
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