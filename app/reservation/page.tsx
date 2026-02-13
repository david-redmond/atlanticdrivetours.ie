import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import {
  baseUrl,
  serviceArea,
  whatsappNumber,
  whatsappPrefill,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book now free",
  description:
    "No payment today. Enquire about private tours and executive transport across Ireland. We'll confirm availability and send a tailored plan.",
  alternates: { canonical: `${baseUrl}/reservation` },
  openGraph: {
    title: "Book now free",
    description:
      "No payment today. Enquire about private tours and executive transport across Ireland.",
    url: `${baseUrl}/reservation`,
    type: "website",
  },
};

function buildWhatsAppLink(tourName?: string): string {
  const base = whatsappNumber.replace(/\D/g, "");
  const text = tourName
    ? `Hi Atlantic Drive Tours, I'm interested in: ${tourName}. ${whatsappPrefill}`
    : whatsappPrefill;
  return `https://wa.me/${base}?text=${encodeURIComponent(text)}`;
}

type ReservationPageProps = {
  searchParams: Promise<{ tour?: string }> | { tour?: string };
};

export default async function ReservationPage({
  searchParams,
}: ReservationPageProps) {
  const params =
    searchParams instanceof Promise ? await searchParams : searchParams;
  const initialTour =
    typeof params.tour === "string" && params.tour.length > 0
      ? params.tour
      : undefined;

  const whatsappLink = buildWhatsAppLink(initialTour);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Book now free
            </p>
            <h1 className="mt-4 text-3xl md:text-4xl">Book now free</h1>
            <p className="mt-4 text-sm text-neutral-700">
              No payment today. Share your dates and preferences and we&apos;ll
              confirm availability and send a tailored plan. {serviceArea}.
            </p>
            <p className="mt-4">
              <a
                href={whatsappLink}
                className="inline-flex items-center gap-2 text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-2 hover:text-[var(--color-brand)] hover:decoration-[var(--color-brand)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get more info on WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                Get more info
              </a>
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="panel p-8">
            <EnquiryForm initialTour={initialTour} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
