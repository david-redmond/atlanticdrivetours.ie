import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { baseUrl, serviceArea } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Atlantic Drive Tours. ${serviceArea}. We'd love to hear from you.`,
  alternates: { canonical: `${baseUrl}/contact` },
  openGraph: {
    title: "Contact",
    description: `Get in touch with Atlantic Drive Tours. ${serviceArea}.`,
    url: `${baseUrl}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Get in touch
            </p>
            <h1 className="mt-4 text-3xl md:text-4xl">Contact us</h1>
            <p className="mt-4 text-sm text-neutral-700">
              Have a question or want to say hello? Send us a message and
              we&apos;ll get back to you. {serviceArea}.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="panel p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
