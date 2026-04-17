import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/constants";
import { getTourSlugs } from "@/data/tours";

/** Public indexable paths only (omit post-form pages like /thank-you). */
const staticRoutes = [
  "",
  "/gallery",
  "/transfers",
  "/tours",
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
  const tourPaths = getTourSlugs().map((slug) => `/tours/${slug}`);
  const paths = [...staticRoutes, ...tourPaths];

  return paths.map((path) => {
    const { priority, changeFrequency } = seoForPath(path);
    return {
      url: `${baseUrl}${path}`,
      priority,
      changeFrequency,
    };
  });
}
