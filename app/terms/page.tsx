import type { Metadata } from "next";
import { baseUrl, companyName } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for booking and using our services.",
  alternates: { canonical: `${baseUrl}/terms` },
  openGraph: {
    title: "Terms of Service",
    description: "Terms for booking and using our services.",
    url: `${baseUrl}/terms`,
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">Terms of Service</h1>
      <p className="mt-4 text-sm text-neutral-700">
        These terms govern your use of the {companyName} website and the services we
        provide. By submitting an enquiry or booking a service, you agree to these
        terms.
      </p>

      <div className="mt-10 space-y-8 text-sm text-neutral-700">
        <div>
          <h2 className="text-lg">Bookings</h2>
          <p className="mt-2">
            All bookings are subject to availability and confirmation in writing.
            Itineraries and pricing are agreed before confirmation.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Payments</h2>
          <p className="mt-2">
            Payment terms will be provided with your booking confirmation. Deposits
            may be required to secure dates.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Cancellations</h2>
          <p className="mt-2">
            Cancellation terms depend on the nature of the service and will be
            provided in your booking confirmation.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Changes</h2>
          <p className="mt-2">
            We will make reasonable efforts to accommodate changes to schedules or
            routes when possible.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Conduct</h2>
          <p className="mt-2">
            Guests are expected to follow driver instructions and respect vehicle
            policies for safety and comfort.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Liability</h2>
          <p className="mt-2">
            {companyName} is not liable for delays caused by factors beyond our
            control, including weather, traffic, or third-party disruptions.
          </p>
        </div>
      </div>
    </section>
  );
}
