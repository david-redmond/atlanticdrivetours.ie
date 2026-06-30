import Link from "next/link";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { reviews } from "@/lib/reviews";

function Stars() {
  return (
    <div className="mb-3 flex gap-0.5 text-[var(--color-accent)]" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "Reviews", path: "/reviews" }]} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Reveal>
          <header className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Guest reviews
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--text-primary)]">
              What our guests say
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Quietly five-star and consistently personal. Here&apos;s a
              selection of feedback from international guests who&apos;ve
              travelled with us across the south-west of Ireland.
            </p>
          </header>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Reveal key={`${review.name}-${review.country}`}>
              <blockquote className="flex h-full flex-col rounded-xl border border-[var(--color-line)] bg-white/95 p-6 shadow-sm">
                <Stars />
                <p className="flex-1 text-[var(--text-primary)] leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <footer className="mt-4 text-xs tracking-wide text-[var(--text-secondary)]">
                  {review.name} · {review.country}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <section className="mt-16 md:mt-24 section-warm rounded-xl border border-[var(--color-line)] px-6 py-10 md:px-10 md:py-12 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)]">
              Travelled with us?
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">
              We&apos;d love to hear about your trip — and if you&apos;re still
              planning, we&apos;d love to help. Tell us your dates and
              we&apos;ll do the rest.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/reservation" className="btn btn-primary">
                Book now free
              </Link>
              <Link href="/tours" className="btn btn-outline">
                View private tours
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
