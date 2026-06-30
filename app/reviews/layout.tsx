import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Guest Reviews & Testimonials | Atlantic Drive Tours",
  description:
    "What international guests say about their private tours and executive transfers with Atlantic Drive Tours across Cork, Kerry, Clare, Limerick and Galway.",
  path: "/reviews",
});

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
