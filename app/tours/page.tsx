import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { baseUrl } from "@/lib/constants";
import { allTours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Private Day Tours | Atlantic Drive Tours",
  description:
    "Premium private day tours across Ireland. Door-to-door pickup, tickets and lunch included. Cliffs of Moher, Bunratty Castle, and more.",
  alternates: { canonical: `${baseUrl}/tours` },
  openGraph: {
    title: "Private Day Tours | Atlantic Drive Tours",
    description:
      "Premium private day tours across Ireland. Door-to-door pickup, tickets and lunch included.",
    url: `${baseUrl}/tours`,
    type: "website",
  },
};

export default function ToursListingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <Reveal>
        <div className="max-w-3xl mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Tours
          </p>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
            Private day tours
          </h1>
          <p className="mt-4 text-[var(--text-secondary)]">
            Premium private day tours with door-to-door pickup. All entry tickets
            and lunch included where noted — so you can focus on the experience.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-10 md:gap-12">
        {allTours.map((tour) => (
          <Reveal key={tour.slug}>
            <Link
              href={`/tours/${tour.slug}`}
              className="block group"
            >
              <article className="panel overflow-hidden md:flex">
                <div className="relative h-56 md:h-auto md:w-2/5 md:min-h-[280px] shrink-0">
                  <Image
                    src={tour.images[0]?.src ?? "/images/Cliffs-of-Moher-1.jpg"}
                    alt={tour.images[0]?.alt ?? tour.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {tour.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">
                    {tour.shortDescription}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span>{tour.duration}</span>
                    {tour.startingFrom && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{tour.startingFrom}</span>
                      </>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-[var(--color-accent)] group-hover:underline">
                    View tour details →
                  </span>
                </div>
              </article>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 section-warm rounded-xl px-6 py-10 md:px-10 border border-[var(--color-line)]">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Not sure which tour fits? Tell us your dates and interests.
          </p>
          <Link href="/reservation" className="btn btn-primary mt-4 inline-flex">
            Book now free
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
