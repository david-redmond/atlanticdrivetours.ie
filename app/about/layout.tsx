import type { Metadata } from "next";
import { baseUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Atlantic Drive Tours — private tours and executive transport across Ireland.",
  alternates: { canonical: `${baseUrl}/about` },
  openGraph: {
    title: "About | Atlantic Drive Tours",
    description:
      "Learn about Atlantic Drive Tours — private tours and executive transport across Ireland.",
    url: `${baseUrl}/about`,
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
