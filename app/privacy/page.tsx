import type { Metadata } from "next";
import { baseUrl, companyName } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your personal data.",
  alternates: { canonical: `${baseUrl}/privacy` },
  openGraph: {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal data.",
    url: `${baseUrl}/privacy`,
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-neutral-700">
        {companyName} respects your privacy and is committed to protecting your
        personal data. This policy explains how we collect, use, and store
        information when you contact us or use this website.
      </p>

      <div className="mt-10 space-y-8 text-sm text-neutral-700">
        <div>
          <h2 className="text-lg">What we collect</h2>
          <p className="mt-2">
            We collect the details you submit in the enquiry form, including your
            name, email, phone or WhatsApp number, country, travel dates, pickup
            location, and message content.
          </p>
        </div>
        <div>
          <h2 className="text-lg">How we use your data</h2>
          <p className="mt-2">
            We use your information to respond to your enquiry, provide availability,
            and deliver services you request. We do not sell your data.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Legal basis</h2>
          <p className="mt-2">
            Our legal basis for processing is consent (when you submit the enquiry
            form) and legitimate interest in responding to your request.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Data retention</h2>
          <p className="mt-2">
            We retain enquiries for as long as needed to respond and for reasonable
            business records, then securely delete or anonymize them.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Your rights</h2>
          <p className="mt-2">
            You may request access, correction, or deletion of your data. Contact us
            to exercise your rights.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Third-party services</h2>
          <p className="mt-2">
            We use Resend for email delivery and Google Analytics 4 only with your
            consent. These providers process data according to their own policies.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Contact</h2>
          <p className="mt-2">
            For privacy questions, please contact us through the enquiry form or by
            phone.
          </p>
        </div>
      </div>
    </section>
  );
}
