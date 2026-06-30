import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { buildPageMetadata } from "@/lib/seo";
import { pillars } from "@/data/pillars";

const pillar = pillars["adare-manor-ryder-cup-2027"];

export const metadata: Metadata = buildPageMetadata({
  title: `${pillar.title} | Atlantic Drive Tours`,
  description: pillar.metaDescription,
  path: `/${pillar.slug}`,
  image: pillar.image,
  imageAlt: pillar.imageAlt,
});

export default function Page() {
  return <PillarPage pillar={pillar} />;
}
