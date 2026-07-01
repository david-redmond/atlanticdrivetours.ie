import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { companyName, serviceArea } from "@/lib/constants";

// NOTE FOR OWNER: personalise the driver-guide section below with the real
// driver's name, photo (add to /public/images), years of experience and
// credentials (SPSV licence number, advanced-driving qualifications, languages).
// Named, photographed driver-guides are the single biggest trust signal for
// this kind of business and a major competitor gap.

const credentials = [
  "Licensed SPSV (Small Public Service Vehicle) operator",
  "Fully insured, comfortable, well-maintained vehicles",
  "Local, born-and-raised knowledge of the south-west",
  "First-aid aware and safety-focused driving",
];

const values = [
  {
    title: "Private, never shared",
    description:
      "Every tour and transfer is for your party only — no shared coaches, no strangers, no fixed timetable.",
  },
  {
    title: "Calm and unrushed",
    description:
      "We build the day around your pace, with time to linger where it matters and skip what doesn't.",
  },
  {
    title: "Genuine local insight",
    description:
      "Stories, hidden viewpoints and honest recommendations you won't find on a coach tour.",
  },
  {
    title: "Reliable and discreet",
    description:
      "Punctual pickups, clear communication, and the kind of quiet professionalism guests remember.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "About", path: "/about" }]} />
      <article className="min-h-screen">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[44vh] min-h-[320px] w-full">
            <Image
              src="/images/ring-of-kerry.jpg"
              alt="The Wild Atlantic Way coastline of south-west Ireland"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[var(--color-ink)]/35" />
          </div>
          <div className="mx-auto -mt-28 max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div className="hero-panel px-6 py-8 md:px-10 md:py-10">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">
                  About us
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl lg:text-5xl">
                  Your private driver-guide in the south-west of Ireland
                </h1>
                <p className="mt-4 max-w-2xl text-base text-ink-muted">
                  Owner-operated, locally rooted, and built around one idea:
                  premium private travel that feels personal.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Our story */}
          <Reveal>
            <section className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                Our story
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                {companyName} began with a simple belief: the best way to see
                Ireland is privately, unhurried, and in the company of someone
                who knows and loves the place. We are an owner-operated service,
                which means the person planning your trip is the same person
                driving you — invested in every detail of your day.
              </p>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                We focus on the south-west — {serviceArea} — the most
                spectacular corner of the country, and the region we know best.
                From the Cliffs of Moher to the Ring of Kerry, from Cork&apos;s
                harbour towns to the courses of the Wild Atlantic Way, we share
                it the way it deserves to be seen.
              </p>
            </section>
          </Reveal>

          {/* Driver-guide / credentials */}
          <Reveal>
            <section className="mt-16 md:mt-24 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                  Meet your driver-guide
                </h2>
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                  Born and raised in the south-west, your driver-guide combines
                  a professional, safety-first approach with a genuine
                  storyteller&apos;s love of the region. You&apos;ll travel with someone
                  who knows which viewpoint catches the morning light, where to
                  stop for the best lunch, and how to stay a step ahead of the
                  tour buses.
                </p>
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                  Whether it&apos;s a once-in-a-lifetime day at the Cliffs of Moher,
                  a multi-day journey along the coast, or a golf or cruise
                  transfer that has to run like clockwork, you&apos;re in safe,
                  experienced hands.
                </p>
              </div>
              <div className="panel p-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Credentials & assurance
                </h3>
                <ul className="mt-4 space-y-3">
                  {credentials.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                    >
                      <span className="mt-0.5 text-[var(--color-accent)]">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>

          {/* Values */}
          <Reveal>
            <section className="mt-16 md:mt-24">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                What we stand for
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {values.map((v) => (
                  <article
                    key={v.title}
                    className="panel p-6 border-l-4 border-[var(--color-accent)]"
                  >
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
                      {v.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          {/* What we do */}
          <Reveal>
            <section className="mt-16 md:mt-24">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] accent-rule">
                What we do
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="panel p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    Private tours
                  </h3>
                  <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
                    Day tours and multi-day journeys across the south-west, with
                    door-to-door pickup and a tailored, relaxed pace.
                  </p>
                  <Link
                    href="/tours"
                    className="mt-4 inline-flex text-sm font-medium text-[var(--color-accent)] hover:underline"
                  >
                    View private tours →
                  </Link>
                </div>
                <div className="panel p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    Transfers & executive transport
                  </h3>
                  <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
                    Airport meet-and-greet, cruise shore transfers from Cobh,
                    golf transfers and corporate travel — punctual and discreet.
                  </p>
                  <Link
                    href="/transfers"
                    className="mt-4 inline-flex text-sm font-medium text-[var(--color-accent)] hover:underline"
                  >
                    View transfers →
                  </Link>
                </div>
              </div>
            </section>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <section className="mt-16 md:mt-24 section-warm rounded-xl border border-[var(--color-line)] px-6 py-10 md:px-10 md:py-12">
              <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                Travel with someone who knows Ireland
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
                Tell us your dates and what you have in mind — we&apos;ll reply
                with a tailored plan. No payment today.
              </p>
              <Link href="/reservation" className="btn btn-primary mt-6 inline-flex">
                Book now free
              </Link>
            </section>
          </Reveal>
        </div>
      </article>
    </>
  );
}
