import type { Metadata } from "next";
import { baseUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How we use cookies and analytics.",
  alternates: { canonical: `${baseUrl}/cookies` },
  openGraph: {
    title: "Cookie Policy",
    description: "How we use cookies and analytics.",
    url: `${baseUrl}/cookies`,
    type: "website",
  },
};

export default function CookiesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">Cookie Policy</h1>
      <p className="mt-4 text-sm text-neutral-700">
        We use cookies to understand how visitors use our website and to improve
        the experience. Analytics cookies are optional and only set with your
        consent.
      </p>

      <div className="mt-10 space-y-8 text-sm text-neutral-700">
        <div>
          <h2 className="text-lg">Essential cookies</h2>
          <p className="mt-2">
            Essential cookies keep the site working and cannot be switched off.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Analytics cookies</h2>
          <p className="mt-2">
            We use Google Analytics 4 to understand page usage. These cookies are
            only activated after you accept analytics cookies in the banner.
          </p>
        </div>
        <div>
          <h2 className="text-lg">Manage preferences</h2>
          <p className="mt-2">
            You can update your preferences at any time using the Cookie Preferences
            link in the footer.
          </p>
        </div>
      </div>
    </section>
  );
}
