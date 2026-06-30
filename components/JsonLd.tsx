import { baseUrl } from "@/lib/constants";

/** Renders an arbitrary JSON-LD object as a script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export type FaqItem = { question: string; answer: string };

/** FAQPage structured data — eligible for FAQ rich results. */
export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs?.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return <JsonLd data={data} />;
}

export type HowToStepItem = { name: string; text: string };

/** HowTo structured data — eligible for step-based rich results / AI answers. */
export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description?: string;
  steps: HowToStepItem[];
}) {
  if (!steps?.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    ...(description ? { description } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
  return <JsonLd data={data} />;
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList structured data. Pass paths beginning with "/" (Home is added automatically). */
export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${baseUrl}${c.path}`,
    })),
  };
  return <JsonLd data={data} />;
}
