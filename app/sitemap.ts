import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/constants";
import { getTourSlugs } from "@/data/tours";

const staticRoutes = [
  "",
  "/gallery",
  "/transfers",
  "/tours",
  "/contact",
  "/reservation",
  "/thank-you",
  "/privacy",
  "/terms",
  "/cookies",
  "/disclaimer",
  "/about",
  "/experiences",
  "/reviews",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const tourUrls = getTourSlugs().map((slug) => `/tours/${slug}`);
  const routes = [...staticRoutes, ...tourUrls];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
