import type { Metadata } from "next";
import { baseUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Guest reviews and testimonials for Atlantic Drive Tours — private tours and transfers in Ireland.",
  alternates: { canonical: `${baseUrl}/reviews` },
  openGraph: {
    title: "Reviews | Atlantic Drive Tours",
    description:
      "Guest reviews and testimonials for Atlantic Drive Tours — private tours and transfers in Ireland.",
    url: `${baseUrl}/reviews`,
    type: "website",
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
