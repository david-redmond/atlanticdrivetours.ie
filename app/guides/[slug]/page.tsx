import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  HowToJsonLd,
  JsonLd,
} from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { baseUrl, companyName } from "@/lib/constants";
import { getGuide, getGuideSlugs } from "@/data/guides";
import { getTourBySlug } from "@/data/tours";
import { getCounty } from "@/data/locations";
import { getPillar } from "@/data/pillars";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide" };
  return buildPageMetadata({
    title: `${guide.title} | Atlantic Drive Tours`,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    image: guide.image,
    imageAlt: guide.imageAlt,
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const relatedTours = guide.relatedTourSlugs
    .map((s) => getTourBySlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const relatedCounties = guide.relatedCountySlugs
    .map((s) => getCounty(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const relatedPillars = guide.relatedPillarSlugs
    .map((s) => getPillar(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    image: `${baseUrl}${guide.image}`,
    datePublished: guide.datePublished,
    dateModified: guide.datePublished,
    author: { "@type": "Organization", name: companyName, url: baseUrl },
    publisher: {
      "@type": "Organization",
      name: companyName,
      logo: { "@type": "ImageObject", url: `${baseUrl}/logo.png` },
    },
    mainEntityOfPage: `${baseUrl}/guides/${guide.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ]}
      />
      <FaqJsonLd faqs={guide.faqs} />
      {guide.howToSteps && (
        <HowToJsonLd
          name={guide.title}
          description={guide.metaDescription}
          steps={guide.howToSteps}
        />
      )}
      <article className="min-h-screen">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[44vh] min-h-[320px] w-full">
            <Image
              src={guide.image}
              alt={guide.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[var(--color-ink)]/35" />
          </div>
          <div className="mx-auto -mt-28 max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div className="hero-panel px-6 py-8 md:px-10 md:py-10">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">
                  {guide.category} · {guide.readingMinutes} min read
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl">
                  {guide.title}
                </h1>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          {/* Intro */}
          <Reveal>
            <section>
              {guide.intro.map((para, i) => (
                <p
                  key={i}
                  className={`text-lg text-[var(--text-secondary)] leading-relaxed ${i > 0 ? "mt-4" : ""}`}
                >
                  {para}
                </p>
              ))}
            </section>
          </Reveal>

          {/* Key takeaway (AEO answer box) */}
          {guide.keyTakeaway && (
            <Reveal>
              <aside className="mt-8 rounded-xl border border-[var(--color-line)] section-warm px-6 py-6">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">
                  Quick answer
                </p>
                <p className="mt-3 text-base font-medium text-[var(--text-primary)]">
                  {guide.keyTakeaway.question}
                </p>
                <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
                  {guide.keyTakeaway.answer}
                </p>
              </aside>
            </Reveal>
          )}

          {/* Sections */}
          {guide.sections.map((section) => (
            <Reveal key={section.heading}>
              <section className="mt-12">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule">
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
                  <ul className="mt-4 space-y-2">
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

          {/* Comparison table */}
          {guide.comparison && (
            <Reveal>
              <section className="mt-12">
                {guide.comparison.caption && (
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule">
                    {guide.comparison.caption}
                  </h2>
                )}
                <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--color-line)]">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="section-warm">
                        {guide.comparison.columns.map((col) => (
                          <th
                            key={col}
                            scope="col"
                            className="border-b border-[var(--color-line)] px-4 py-3 font-semibold text-[var(--text-primary)]"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {guide.comparison.rows.map((row, ri) => (
                        <tr key={ri} className="align-top">
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`border-b border-[var(--color-line)] px-4 py-3 text-[var(--text-secondary)] ${ci === 0 ? "font-medium text-[var(--text-primary)]" : ""}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </Reveal>
          )}

          {/* FAQ */}
          <Reveal>
            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule">
                Frequently asked questions
              </h2>
              <dl className="mt-6 space-y-6">
                {guide.faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="font-medium text-[var(--text-primary)]">
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

          {/* Related links */}
          {(relatedTours.length > 0 ||
            relatedCounties.length > 0 ||
            relatedPillars.length > 0) && (
            <Reveal>
              <section className="mt-12">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] accent-rule">
                  Keep exploring
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {relatedTours.map((tour) => (
                    <Link
                      key={tour.slug}
                      href={`/tours/${tour.slug}`}
                      className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
                    >
                      {tour.title}
                    </Link>
                  ))}
                  {relatedPillars.map((pillar) => (
                    <Link
                      key={pillar.slug}
                      href={`/${pillar.slug}`}
                      className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
                    >
                      {pillar.title}
                    </Link>
                  ))}
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

          {/* CTA */}
          <Reveal>
            <section className="mt-14 section-warm rounded-xl border border-[var(--color-line)] px-6 py-10 md:px-10 md:py-12">
              <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                Ready to plan your private tour?
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
                Tell us your dates and what you&apos;d like to see — we&apos;ll
                design the perfect day. No obligation.
              </p>
              <Link href="/reservation" className="btn btn-primary mt-6 inline-flex">
                Book now free
              </Link>
            </section>
          </Reveal>
        </div>
      </article>
    </>
  );
}
