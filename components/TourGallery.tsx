"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import type { TourImage } from "@/data/tours";

type TourGalleryProps = {
  images: TourImage[];
  className?: string;
};

export default function TourGallery({ images, className = "" }: TourGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close]);

  if (!images.length) return null;

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${className}`}>
        {images.map((img, index) => (
          <button
            key={`${img.src}-${index}`}
            type="button"
            onClick={() => open(index)}
            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[var(--color-ivory-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>
      {images.some((img) => img.credit) && (
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Image credits:{" "}
          {[...new Set(images.map((img) => img.credit).filter(Boolean))].join(", ")}
        </p>
      )}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 text-white/90 hover:text-white text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[90vh] object-contain rounded"
              sizes="90vw"
            />
            {images[lightboxIndex].credit && (
              <p className="mt-2 text-sm text-white/80 text-center">
                {images[lightboxIndex].credit}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
