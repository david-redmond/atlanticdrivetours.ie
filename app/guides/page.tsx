import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { guides } from "@/data/guides";

export const metadata: Metadata = buildPageMetadata({
  title: "Ireland Travel Guides & Tips | Atlantic Drive Tours",
  description:
    "Practical guides to touring the west of Ireland — when to visit, how to see the Cliffs of Moher, Ring of Kerry vs Dingle, and planning a cruise shore day at Cobh.",
  path: "/guides",
  absoluteTitle: true,
});

export default function GuidesHubPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "Guides", path: "/guides" }]} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Reveal>
          <header className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Travel guides
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--text-primary)]">
              Planning your trip to Ireland
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Honest, practical advice from local driver-guides — when to come,
              what to see, and how to make the most of your time on the Wild
              Atlantic Way.
            </p>
          </header>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Reveal key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">
                    {guide.category} · {guide.readingMinutes} min read
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                    {guide.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {guide.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
                    Read guide →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
