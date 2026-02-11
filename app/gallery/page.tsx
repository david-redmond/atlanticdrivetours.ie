import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";
import { galleryImages } from "@/lib/gallery";
import { baseUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A curated look at Ireland's landscapes and our journeys.",
  alternates: { canonical: `${baseUrl}/gallery` },
  openGraph: {
    title: "Gallery",
    description: "A curated look at Ireland's landscapes and our journeys.",
    url: `${baseUrl}/gallery`,
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Gallery
          </p>
          <h1 className="mt-4 text-3xl md:text-4xl">
            Landscapes, arrivals, and the quiet moments in between.
          </h1>
          <p className="mt-4 text-sm text-neutral-700">
            A glimpse of the routes and regions we cover. Expect a calm, refined travel
            experience with Ireland&apos;s best scenery at its heart.
          </p>
        </div>
      </Reveal>
      <Reveal>
        <div className="mt-12 panel p-6">
          <GalleryGrid images={galleryImages} className="stagger" />
        </div>
      </Reveal>
    </section>
  );
}
