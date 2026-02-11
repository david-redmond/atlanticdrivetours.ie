import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { baseUrl, phone, whatsappNumber, whatsappPrefill } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You",
  description: "We have received your enquiry.",
  alternates: { canonical: `${baseUrl}/thank-you` },
  openGraph: {
    title: "Thank You",
    description: "We have received your enquiry.",
    url: `${baseUrl}/thank-you`,
    type: "website",
  },
};

const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(whatsappPrefill)}`;

export default function ThankYouPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <Reveal>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Thank you</p>
          <h1 className="mt-4 text-3xl md:text-4xl">We have received your enquiry.</h1>
          <p className="mt-4 text-sm text-neutral-700">
            We will reply shortly with availability and next steps.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={whatsappLink} className="btn btn-outline">
              WhatsApp
            </a>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn btn-ghost">
              Call
            </a>
            <Link href="/" className="btn btn-ghost">
              Back to Home
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
