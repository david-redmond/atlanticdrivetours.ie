/**
 * Tour data for listing and detail pages.
 * Tours are stored in data/tours.json (array of objects). Add new tours there.
 * This file exports types and helpers that read from the JSON.
 */

import toursJson from "./tours.json";

export type TourImage = {
  src: string;
  alt: string;
  credit?: string;
};

export type TourItineraryStep = {
  time?: string;
  label: string;
  description?: string;
};

export type TourFaq = {
  question: string;
  answer: string;
};

export type TourStory = {
  title?: string;
  text: string;
};

export type TourData = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  duration: string;
  durationHours?: number;
  startingFrom?: string;
  includes: string[];
  highlights: string[];
  itinerary: TourItineraryStep[];
  whatToBring: string[];
  faqs: TourFaq[];
  images: TourImage[];
  testimonials?: { name: string; location?: string; quote: string; date?: string }[];
  stories?: TourStory[];
};

/** All tours from data/tours.json. Add new tour objects to that file. */
export const allTours: TourData[] = toursJson as TourData[];

export function getTourBySlug(slug: string): TourData | undefined {
  return allTours.find((t) => t.slug === slug);
}

export function getTourSlugs(): string[] {
  return allTours.map((t) => t.slug);
}
