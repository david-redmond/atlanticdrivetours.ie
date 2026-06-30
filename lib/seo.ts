import type { Metadata } from "next";
import { baseUrl, companyName } from "@/lib/constants";

/** Shared default Open Graph / Twitter image. Replace with a branded 1200x630 asset at /public/og/default.jpg when available. */
export const defaultOgImage = {
  url: "/hero.jpg",
  width: 1200,
  height: 630,
  alt: `${companyName} — private driver tours and executive transfers in Ireland`,
};

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Path beginning with "/" (e.g. "/ireland/cork"). Use "" for the homepage. */
  path: string;
  /** Optional absolute or root-relative image URL. Falls back to the shared OG image. */
  image?: string;
  imageAlt?: string;
  /** @deprecated Titles are always treated as absolute now; this flag is ignored. */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

/**
 * Consistent metadata builder for every page: canonical, Open Graph, Twitter.
 * Keeps titles/descriptions/canonicals aligned and avoids the doubled-brand title bug.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  noindex,
}: BuildMetadataInput): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = image
    ? { url: image, width: 1200, height: 630, alt: imageAlt ?? title }
    : defaultOgImage;

  // Always absolute: callers pass a full title that already includes the brand,
  // so we must bypass the root layout's "%s | Atlantic Drive Tours" template
  // (otherwise the brand is appended twice).
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: companyName,
      locale: "en_IE",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}
