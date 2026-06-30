import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/constants";
import { getTourSlugs } from "@/data/tours";
import { getCountySlugs } from "@/data/locations";
import { getPillarSlugs } from "@/data/pillars";
import { getGuideSlugs } from "@/data/guides";

/** Public indexable paths only (omit post-form pages like /thank-you). */
const staticRoutes = [
  "",
  "/gallery",
  "/transfers",
  "/tours",
  "/ireland",
  "/guides",
  "/wild-atlantic-way",
  "/cobh-cruise-excursions",
  "/golf-transfers-ireland",
  "/adare-manor-ryder-cup-2027",
  "/contact",
  "/reservation",
  "/privacy",
  "/terms",
  "/cookies",
  "/disclaimer",
  "/about",
  "/experiences",
  "/reviews",
];

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

function seoForPath(path: string): {
  priority: number;
  changeFrequency: ChangeFrequency;
} {
  if (path === "") {
    return { priority: 1, changeFrequency: "weekly" };
  }
  if (path === "/tours") {
    return { priority: 0.95, changeFrequency: "weekly" };
  }
  if (path.startsWith("/tours/")) {
    return { priority: 0.9, changeFrequency: "monthly" };
  }
  if (path.startsWith("/ireland")) {
    return { priority: 0.85, changeFrequency: "monthly" };
  }
  if (
    [
      "/wild-atlantic-way",
      "/cobh-cruise-excursions",
      "/golf-transfers-ireland",
      "/adare-manor-ryder-cup-2027",
    ].includes(path)
  ) {
    return { priority: 0.85, changeFrequency: "monthly" };
  }
  if (path.startsWith("/guides")) {
    return { priority: 0.7, changeFrequency: "monthly" };
  }
  if (
    [
      "/gallery",
      "/transfers",
      "/contact",
      "/reservation",
      "/about",
      "/reviews",
      "/experiences",
    ].includes(path)
  ) {
    return { priority: 0.85, changeFrequency: "monthly" };
  }
  if (["/privacy", "/terms", "/cookies", "/disclaimer"].includes(path)) {
    return { priority: 0.35, changeFrequency: "yearly" };
  }
  return { priority: 0.7, changeFrequency: "monthly" };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const tourPaths = getTourSlugs().map((slug) => `/tours/${slug}`);
  const countyPaths = getCountySlugs().map((slug) => `/ireland/${slug}`);
  const guidePaths = getGuideSlugs().map((slug) => `/guides/${slug}`);
  // Pillar slugs are top-level routes already listed in staticRoutes, so we
  // only assert they exist here to keep the two lists in sync at build time.
  getPillarSlugs();

  const paths = [
    ...staticRoutes,
    ...tourPaths,
    ...countyPaths,
    ...guidePaths,
  ];

  return paths.map((path) => {
    const { priority, changeFrequency } = seoForPath(path);
    return {
      url: `${baseUrl}${path}`,
      lastModified,
      priority,
      changeFrequency,
    };
  });
}
