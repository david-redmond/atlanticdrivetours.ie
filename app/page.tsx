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
  whatsappNumber,
  whatsappPrefill,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Private Tours & Executive Transport",
  description:
    "Premium, personal tours and executive transport across Ireland for international guests.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Private Tours & Executive Transport",
    description:
      "Premium, personal tours and executive transport across Ireland for international guests.",
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
  ],
  sameAs: [],
};

export default function HomePage() {
  return (
    <>
      <section className="relative">
        <div className="relative h-[72vh] min-h-[520px] w-full">
          <Image
            src="/hero.jpg"
            alt="Ireland landscape"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#2b241c]/20" />
        </div>
        <div className="mx-auto -mt-40 max-w-6xl px-6">
          <Reveal>
            <div className="hero-panel px-8 py-10 md:px-12">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                Atlantic Drive Tours
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink md:text-5xl">
                Private Tours & Executive Transport Across Ireland
              </h1>
              <p className="mt-4 max-w-2xl text-base text-ink-muted">
                Premium, personal travel—crafted for international guests.
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                Based in Ireland · Trusted by international guests · Private chauffeur-led experiences
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#enquiry" className="btn btn-primary">
                  Book now free
                </a>
                <a href={whatsappLink} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn btn-ghost">
                  Call
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-xs text-ink-muted">
                <span>Professional drivers</span>
                <span className="border-l border-line pl-6">Comfortable vehicles</span>
                <span className="border-l border-line pl-6">Local knowledge</span>
                <span className="border-l border-line pl-6">Reliable scheduling</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Tours
            </p>
            <h2 className="mt-4 text-2xl md:text-3xl">Private travel, precisely delivered.</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Private Ireland Tours (tours + multi-day)",
              benefit: "Curated routes with a calm, unhurried pace.",
            },
            {
              title: "Custom itineraries",
              benefit: "Tailored planning around your interests and timing.",
            },
            {
              title: "Golf transfers",
              benefit: "Seamless tee-time transport with local insight.",
            },
            {
              title: "Airport transfers",
              benefit: "Meet-and-greet arrivals, door-to-door comfort.",
            },
            {
              title: "Executive / corporate transport",
              benefit: "Discreet, punctual travel for business and VIP guests.",
            },
          ].map((card) => (
            <Reveal key={card.title}>
              <div className="panel p-6 md:p-8">
                <h3 className="font-medium text-ink">{card.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{card.benefit}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-warm">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                Why choose us
              </p>
              <h2 className="mt-4 text-2xl md:text-3xl">
                Why choose Atlantic Drive Tours
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              <ul className="space-y-4 text-sm text-ink-muted">
                <li className="flex gap-3">
                  <span className="text-accent" aria-hidden>—</span>
                  Licensed professional drivers
                </li>
                <li className="flex gap-3">
                  <span className="text-accent" aria-hidden>—</span>
                  Discreet executive vehicles
                </li>
                <li className="flex gap-3">
                  <span className="text-accent" aria-hidden>—</span>
                  Custom itineraries (no rushed schedules)
                </li>
              </ul>
              <ul className="space-y-4 text-sm text-ink-muted">
                <li className="flex gap-3">
                  <span className="text-accent" aria-hidden>—</span>
                  Clear communication &amp; punctuality
                </li>
                <li className="flex gap-3">
                  <span className="text-accent" aria-hidden>—</span>
                  Airport-to-hotel coordination
                </li>
                <li className="flex gap-3">
                  <span className="text-accent" aria-hidden>—</span>
                  Trusted by international guests
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-warm">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                Signature Experiences
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-2 stagger">
                {[
                  "Multi-day private tours",
                  "Golf itineraries & transfers",
                  "Airport-to-hotel seamless arrivals",
                  "Corporate & VIP transport",
                ].map((item) => (
                  <div key={item} className="panel p-6 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Trusted by international guests
            </p>
            <h2 className="mt-4 text-2xl md:text-3xl">
              Quietly five-star, consistently personal.
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-10">
            <Reviews />
          </div>
        </Reveal>
      </section>

      <section className="section-warm">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                Gallery
              </p>
              <h2 className="mt-4 text-2xl md:text-3xl accent-rule">
                Ireland in its best light.
              </h2>
            </div>
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

      <section id="enquiry" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                Book now free
              </p>
              <h2 className="mt-4 text-2xl md:text-3xl accent-rule">
                Tell us about your plans.
              </h2>
              <p className="mt-4 text-sm text-neutral-700">
                Share your dates, group size, and preferred experience. We will reply with
                availability and a tailored proposal.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="panel p-8">
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
