import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { baseUrl, phone, serviceArea, whatsappNumber, whatsappPrefill } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Request Availability",
  description: "Enquire about private tours and executive transport across Ireland.",
  alternates: { canonical: `${baseUrl}/contact` },
  openGraph: {
    title: "Request Availability",
    description:
      "Enquire about private tours and executive transport across Ireland.",
    url: `${baseUrl}/contact`,
    type: "website",
  },
};

const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /\D/g,
  ""
)}?text=${encodeURIComponent(whatsappPrefill)}`;

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Request Availability
            </p>
            <h1 className="mt-4 text-3xl md:text-4xl">Plan your journey.</h1>
            <p className="mt-4 text-sm text-neutral-700">
              Nationwide coverage across Ireland. Share your dates and preferences
              and we will reply with availability.
            </p>
            <div className="mt-8 space-y-2 text-sm text-neutral-700">
              <p>{serviceArea}</p>
              <a className="block underline" href={`tel:${phone.replace(/\s/g, "")}`}>
                Call {phone}
              </a>
              <a className="block underline" href={whatsappLink}>
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="panel p-8">
            <EnquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
