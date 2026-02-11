"use client";

import { useState } from "react";
import { reviews } from "@/lib/reviews";

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const total = reviews.length;

  const prev = () => setIndex((current) => (current - 1 + total) % total);
  const next = () => setIndex((current) => (current + 1) % total);

  return (
    <div className="space-y-8">
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {reviews.map((review) => (
          <div key={`${review.name}-${review.country}`} className="panel p-6">
            <p className="text-sm text-neutral-700">“{review.quote}”</p>
            <p className="mt-4 text-xs uppercase tracking-wide text-neutral-500">
              {review.name} · {review.country}
            </p>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <div className="panel p-6">
          <p className="text-sm text-neutral-700">“{reviews[index].quote}”</p>
          <p className="mt-4 text-xs uppercase tracking-wide text-neutral-500">
            {reviews[index].name} · {reviews[index].country}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-wide text-neutral-500">
          <button
            type="button"
            onClick={prev}
            className="border border-neutral-300 px-3 py-2"
          >
            Previous
          </button>
          <span>
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={next}
            className="border border-neutral-300 px-3 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
