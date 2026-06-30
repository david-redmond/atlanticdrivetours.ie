import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import TrackedLink from "@/components/TrackedLink";
import { whatsappNumber } from "@/lib/constants";
import { getTourBySlug } from "@/data/tours";
import { getCounty } from "@/data/locations";
import { getGuide } from "@/data/guides";
import type { Pillar } from "@/data/pillars";

function whatsappLinkFor(title: string) {
  const text = `Hi Atlantic Drive Tours, I'm interested in ${title}. My dates are: `;
  return `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export default function PillarPage({ pillar }: { pillar: Pillar }) {
  const relatedTours = pillar.relatedTourSlugs
    .map((slug) => getTourBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const relatedCounties = pillar.relatedCountySlugs
    .map((slug) => getCounty(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const relatedGuides = (pillar.relatedGuideSlugs ?? [])
    .map((slug) => getGuide(slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));
  const whatsappLink = whatsappLinkFor(pillar.title);
  const reservationHref = pillar.serviceParam
    ? `/reservation?service=${encodeURIComponent(pillar.serviceParam)}`
    : "/reservation";

  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: pillar.title, path: `/${pillar.slug}` }]} />
      <FaqJsonLd faqs={pillar.faqs} />
      <article className="min-h-screen">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[50vh] min-h-[360px] w-full">
            <Image
              src={pillar.image}
              alt={pillar.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[var(--color-ink)]/30" />
          </div>
          <div className="mx-auto -mt-32 max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div className="hero-panel px-6 py-8 md:px-10 md:py-10">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">
                  {pillar.eyebrow}
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl lg:text-5xl">
                  {pillar.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-ink-muted">
                  {pillar.heroTagline}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <TrackedLink
                    href={reservationHref}
                    event="cta_click"
                    eventParams={{ location: "pillar_hero", pillar: pillar.slug }}
                    className="btn btn-primary"
                  >
                    Book now free
                  </TrackedLink>
                  <TrackedLink
                    href={whatsappLink}
                    external
                    event="whatsapp_click"
                    eventParams={{ location: "pillar_hero", pillar: pillar.slug }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Ask on WhatsApp
                  </TrackedLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Intro */}
          <Reveal>
            <section className="max-w-3xl">
              {pillar.intro.map((para, i) => (
                <p
                  key={i}
                  className={`text-[var(--text-secondary)] leading-relaxed ${i > 0 ? "mt-4" : ""}`}
                >
                  {para}
                </p>
              ))}
            </section>
          </Reveal>

          {/* Sections */}
          {pillar.sections.map((section) => (
            <Reveal key={section.heading}>
              <section className="mt-14 md:mt-20">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                  {section.heading}
                </h2>
                {section.body.map((para, i) => (
                  <p
                    key={i}
                    className={`text-[var(--text-secondary)] leading-relaxed ${i === 0 ? "mt-4" : "mt-3"}`}
                  >
                    {para}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[var(--text-secondary)]"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}

          {/* Related tours */}
          {relatedTours.length > 0 && (
            <Reveal>
              <section className="mt-16 md:mt-24">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                  Related private tours
                </h2>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {relatedTours.map((tour) => (
                    <Link
                      key={tour.slug}
                      href={`/tours/${tour.slug}`}
                      className="group block overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={tour.images[0]?.src ?? pillar.image}
                          alt={tour.images[0]?.alt ?? tour.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          {tour.title}
                        </h3>
                        <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                          {tour.shortDescription}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
                          View tour →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* Related counties */}
          {relatedCounties.length > 0 && (
            <Reveal>
              <section className="mt-16 md:mt-24">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                  Explore by county
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {relatedCounties.map((county) => (
                    <Link
                      key={county.slug}
                      href={`/ireland/${county.slug}`}
                      className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
                    >
                      County {county.name}
                    </Link>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* Related guides */}
          {relatedGuides.length > 0 && (
            <Reveal>
              <section className="mt-16 md:mt-24">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                  Read before you go
                </h2>
                <ul className="mt-6 space-y-3">
                  {relatedGuides.map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        href={`/guides/${guide.slug}`}
                        className="group inline-flex items-baseline gap-2 text-[var(--color-accent)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
                      >
                        <span className="font-medium">{guide.title}</span>
                        <span aria-hidden>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {/* FAQ */}
          <Reveal>
            <section className="mt-16 md:mt-24">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                Frequently asked questions
              </h2>
              <dl className="mt-8 space-y-8">
                {pillar.faqs.map((faq) => (
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

          {/* CTA */}
          <Reveal>
            <section className="mt-16 md:mt-24 section-warm rounded-xl border border-[var(--color-line)] px-6 py-10 md:px-10 md:py-12">
              <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                Ready to plan your trip?
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
                Tell us your dates and what you have in mind — we&apos;ll reply
                with a tailored plan. No obligation.
              </p>
              <TrackedLink
                href={reservationHref}
                event="cta_click"
                eventParams={{ location: "pillar_bottom", pillar: pillar.slug }}
                className="btn btn-primary mt-6 inline-flex"
              >
                Book now free
              </TrackedLink>
            </section>
          </Reveal>
        </div>
      </article>
    </>
  );
}
