"use client";

import { useState } from "react";
import { reviews } from "@/lib/reviews";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const total = reviews.length;

  const prev = () => setIndex((current) => (current - 1 + total) % total);
  const next = () => setIndex((current) => (current + 1) % total);

  return (
    <div className="space-y-6">
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={`${review.name}-${review.country}`}
            className="rounded-xl border border-[var(--color-line)] bg-white/95 p-6 shadow-sm"
          >
            <div className="mb-3 flex gap-0.5 text-[var(--color-accent)]" aria-hidden>
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </div>
            <p className="text-[var(--text-primary)] leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
            <p className="mt-4 text-xs tracking-wide text-[var(--text-secondary)]">
              {review.name} · {review.country}
            </p>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <div className="rounded-xl border border-[var(--color-line)] bg-white/95 p-6 shadow-sm">
          <div className="mb-3 flex gap-0.5 text-[var(--color-accent)]" aria-hidden>
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} className="h-4 w-4" />
            ))}
          </div>
          <p className="text-[var(--text-primary)] leading-relaxed">&ldquo;{reviews[index].quote}&rdquo;</p>
          <p className="mt-4 text-xs tracking-wide text-[var(--text-secondary)]">
            {reviews[index].name} · {reviews[index].country}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            className="rounded-md border border-[var(--color-line)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--color-ivory-muted)] transition-colors"
            aria-label="Previous review"
          >
            Previous
          </button>
          <span className="text-xs text-[var(--text-secondary)]">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={next}
            className="rounded-md border border-[var(--color-line)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--color-ivory-muted)] transition-colors"
            aria-label="Next review"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
