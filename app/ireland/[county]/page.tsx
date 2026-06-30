import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd, FaqJsonLd, JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { baseUrl, companyName, whatsappNumber } from "@/lib/constants";
import { getCounty, getCountySlugs } from "@/data/locations";
import { getTourBySlug } from "@/data/tours";
import { getPillar } from "@/data/pillars";
import { getGuide } from "@/data/guides";

export function generateStaticParams() {
  return getCountySlugs().map((county) => ({ county }));
}

type PageProps = { params: Promise<{ county: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { county } = await params;
  const data = getCounty(county);
  if (!data) return { title: "Ireland" };
  return buildPageMetadata({
    title: `${data.title} | Atlantic Drive Tours`,
    description: data.metaDescription,
    path: `/ireland/${data.slug}`,
    image: data.image,
    imageAlt: data.imageAlt,
  });
}

function buildWhatsAppLink(countyName: string) {
  const text = `Hi Atlantic Drive Tours, I'd like a private tour in County ${countyName}. My dates are: `;
  return `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export default async function CountyPage({ params }: PageProps) {
  const { county } = await params;
  const data = getCounty(county);
  if (!data) notFound();

  const relatedTours = data.relatedTourSlugs
    .map((slug) => getTourBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const relatedPillars = (data.relatedPillarSlugs ?? [])
    .map((slug) => getPillar(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedGuides = (data.relatedGuideSlugs ?? [])
    .map((slug) => getGuide(slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));
  const whatsappLink = buildWhatsAppLink(data.name);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Private day tours and chauffeur transfers",
    name: `Private tours in County ${data.name}`,
    description: data.metaDescription,
    provider: {
      "@type": "TravelAgency",
      name: companyName,
      url: baseUrl,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `County ${data.name}, Ireland`,
    },
    url: `${baseUrl}/ireland/${data.slug}`,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Ireland", path: "/ireland" },
          { name: `County ${data.name}`, path: `/ireland/${data.slug}` },
        ]}
      />
      <FaqJsonLd faqs={data.faqs} />
      <article className="min-h-screen">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[50vh] min-h-[360px] w-full">
            <Image
              src={data.image}
              alt={data.imageAlt}
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
                  County {data.name}
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl lg:text-5xl">
                  {data.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-ink-muted">
                  {data.heroTagline}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/reservation" className="btn btn-primary">
                    Book now free
                  </Link>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Intro */}
          <Reveal>
            <section className="max-w-3xl">
              {data.intro.map((para, i) => (
                <p
                  key={i}
                  className={`text-[var(--text-secondary)] leading-relaxed ${i > 0 ? "mt-4" : ""}`}
                >
                  {para}
                </p>
              ))}
            </section>
          </Reveal>

          {/* Highlights */}
          <Reveal>
            <section className="mt-16 md:mt-24">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                Highlights of County {data.name}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {data.highlights.map((h) => (
                  <article
                    key={h.name}
                    className="panel p-6 border-l-4 border-[var(--color-accent)]"
                  >
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {h.name}
                    </h3>
                    <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
                      {h.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Related tours */}
          {relatedTours.length > 0 && (
            <Reveal>
              <section className="mt-16 md:mt-24">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                  Private tours in {data.name}
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
                          src={tour.images[0]?.src ?? data.image}
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

          {/* Related services (pillars) */}
          {relatedPillars.length > 0 && (
            <Reveal>
              <section className="mt-16 md:mt-24">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                  Specialist services in {data.name}
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {relatedPillars.map((pillar) => (
                    <Link
                      key={pillar.slug}
                      href={`/${pillar.slug}`}
                      className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
                    >
                      {pillar.title}
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
                  Plan your trip
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
                County {data.name} FAQs
              </h2>
              <dl className="mt-8 space-y-8">
                {data.faqs.map((faq) => (
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
                Plan your private day in County {data.name}
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
                Tell us your dates, group size and what you&apos;d like to see —
                we&apos;ll plan the perfect private itinerary. No obligation.
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
