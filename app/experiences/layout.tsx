import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Curated Irish Experiences | Atlantic Drive Tours",
  description:
    "Curated private experiences across the south-west of Ireland — the Wild Atlantic Way, the Ring of Kerry, Cork's harbour towns and tailored multi-day journeys.",
  path: "/experiences",
  image: "/images/ring-of-kerry.jpg",
});

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
