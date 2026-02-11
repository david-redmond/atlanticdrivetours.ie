import type { Metadata } from "next";
import { baseUrl, companyName } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Website and service disclaimer.",
  alternates: { canonical: `${baseUrl}/disclaimer` },
  openGraph: {
    title: "Disclaimer",
    description: "Website and service disclaimer.",
    url: `${baseUrl}/disclaimer`,
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">Disclaimer</h1>
      <p className="mt-4 text-sm text-neutral-700">
        The information on this website is provided for general guidance only.
        {companyName} makes reasonable efforts to keep content accurate and up to
        date, but does not guarantee completeness or availability.
      </p>

      <div className="mt-10 space-y-8 text-sm text-neutral-700">
        <div>
          <h2 className="text-lg">Service availability</h2>
          <p className="mt-2">
            All services are subject to availability and confirmation. Routes and
            schedules may change due to weather, traffic, or operational factors.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Third-party links</h2>
          <p className="mt-2">
            This site may reference third-party services. We are not responsible for
            their content or policies.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Liability</h2>
          <p className="mt-2">
            {companyName} is not liable for indirect or consequential losses arising
            from the use of this website or our services.
          </p>
        </div>
      </div>
    </section>
  );
}
