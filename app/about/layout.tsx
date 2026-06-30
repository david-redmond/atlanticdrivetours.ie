import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Your Driver-Guide | Atlantic Drive Tours",
  description:
    "Meet the owner-operated team behind Atlantic Drive Tours — licensed, local driver-guides offering private tours and executive transfers across the south-west of Ireland.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
