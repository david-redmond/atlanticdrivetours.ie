import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/gallery",
    "/transfers",
    "/tours",
    "/tours/cliffs-of-moher-bunratty",
    "/contact",
    "/reservation",
    "/thank-you",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
