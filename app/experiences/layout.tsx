import type { Metadata } from "next";
import { baseUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Multi-day and curated travel experiences in Ireland with Atlantic Drive Tours.",
  alternates: { canonical: `${baseUrl}/experiences` },
  openGraph: {
    title: "Experiences | Atlantic Drive Tours",
    description:
      "Multi-day and curated travel experiences in Ireland with Atlantic Drive Tours.",
    url: `${baseUrl}/experiences`,
    type: "website",
  },
};

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
