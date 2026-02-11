import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { baseUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description: "Private tours and premium transport services across Ireland.",
  alternates: { canonical: `${baseUrl}/services` },
  openGraph: {
    title: "Services",
    description: "Private tours and premium transport services across Ireland.",
    url: `${baseUrl}/services`,
    type: "website",
  },
};

const sections = [
  {
    title: "Private Tours",
    points: [
      "Day tours and multi-day journeys",
      "Curated routes across Ireland",
      "Flexible pacing for your group",
      "Comfortable, premium vehicles",
      "Experienced local drivers",
    ],
  },
  {
    title: "Golf Transfers",
    points: [
      "Door-to-course transfers",
      "Multi-course itineraries",
      "Early starts and late returns",
      "Luggage and equipment assistance",
      "Trusted local knowledge",
    ],
  },
  {
    title: "Airport Transfers",
    points: [
      "Meet-and-greet arrivals",
      "Flight-tracking coordination",
      "Direct hotel transfers",
      "Discreet, professional service",
      "Ideal for first-time visitors",
    ],
  },
  {
    title: "Executive Transport",
    points: [
      "Corporate and VIP travel",
      "Discreet, punctual drivers",
      "On-demand itineraries",
      "Comfortable, quiet vehicles",
      "Multi-stop scheduling",
    ],
  },
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Services
          </p>
          <h1 className="mt-4 text-3xl md:text-4xl">
            Refined travel services for discerning guests.
          </h1>
          <p className="mt-4 text-sm text-neutral-700">
            We provide calm, reliable transport and private tours across Ireland. Each
            itinerary is shaped around your dates, interests, and pace.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 stagger">
        {sections.map((section) => (
          <div key={section.title} className="panel p-8">
            <h2 className="text-xl accent-rule">{section.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {section.points.map((point) => (
                <li key={point} className="border-b border-line pb-2">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-16 section-warm px-8 py-10 border border-line">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Request Availability
            </p>
            <p className="mt-3 text-lg">
              Share your dates and service needs. We will respond quickly with
              availability.
            </p>
          </div>
          <Link href="/contact" className="btn btn-outline">
            Request Availability
          </Link>
        </div>
        </div>
      </Reveal>
    </section>
  );
}
