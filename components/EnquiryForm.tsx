"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { enquirySchema, type EnquiryInput } from "@/lib/validators";
import { trackEvent } from "@/lib/analytics";

const serviceOptions: EnquiryInput["serviceType"][] = [
  "Private Tour",
  "Multi-day Tour",
  "Golf Transfers",
  "Airport Transfer",
  "Executive / Corporate",
];

const groupSizeOptions: EnquiryInput["groupSize"][] = [
  "1–2",
  "3–6",
  "7–12",
  "13–24",
  "25+",
];

const countryOptions = [
  "United States",
  "United Kingdom",
  "Ireland",
  "Germany",
  "France",
  "Australia",
  "Canada",
  "Spain",
  "Netherlands",
  "Other",
];

type Errors = Partial<Record<keyof EnquiryInput, string>> & {
  form?: string;
};

const initialFormState = {
  name: "",
  email: "",
  phoneOrWhatsapp: "",
  country: "",
  countrySelect: "",
  serviceType: "Private Tour" as EnquiryInput["serviceType"],
  groupSize: "1–2" as EnquiryInput["groupSize"],
  startDate: "",
  endDate: "",
  pickupLocation: "",
  message: "",
  consent: false,
  companyWebsite: "",
  tour: "",
};

const fieldClass =
  "w-full rounded-md border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-ink focus:border-[var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)] min-h-[44px]";
const labelClass = "mb-2 block text-sm font-medium text-ink";
const sectionTitleClass =
  "text-sm font-medium uppercase tracking-wider text-neutral-500 mb-4";

const FORM_ID = "enquiry-form";
const SUBMIT_BUTTON_ID = "enquiry-submit";

function isValidServiceType(
  value: string
): value is EnquiryInput["serviceType"] {
  return serviceOptions.includes(value as EnquiryInput["serviceType"]);
}

type EnquiryFormProps = {
  initialTour?: string;
  initialService?: string;
};

export default function EnquiryForm({
  initialTour,
  initialService,
}: EnquiryFormProps) {
  const router = useRouter();
  const resolvedInitialService =
    initialService && isValidServiceType(initialService)
      ? (initialService as EnquiryInput["serviceType"])
      : undefined;
  const [formState, setFormState] = useState(() => ({
    ...initialFormState,
    serviceType: resolvedInitialService ?? initialFormState.serviceType,
  }));
  const [servicePrefilledFromParam] = useState(Boolean(resolvedInitialService));
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tourInputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (typeof initialTour === "string" && initialTour.trim()) {
      const tour = initialTour.trim();
      queueMicrotask(() =>
        setFormState((prev) => ({ ...prev, tour }))
      );
    }
  }, [initialTour]);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const el = document.getElementById(SUBMIT_BUTTON_ID);
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setStickyBarVisible(e ? !e.isIntersecting : false);
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const name = target.name;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resolvedCountry =
    formState.countrySelect === "Other"
      ? formState.country
      : formState.countrySelect || formState.country;

  const payloadForValidation = useMemo(
    () => ({
      ...formState,
      country: resolvedCountry,
      dates: undefined,
    }),
    [formState, resolvedCountry]
  );

  const isExecutive = formState.serviceType === "Executive / Corporate";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = enquirySchema.safeParse(payloadForValidation);
    if (!result.success) {
      const nextErrors: Errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof EnquiryInput | undefined;
        if (field) nextErrors[field] = err.message;
      });
      setErrors(nextErrors);
      // Scroll first invalid field into view (map schema 'country' to id 'countrySelect' or 'country')
      const firstField = Object.keys(nextErrors).find((k) => k !== "form");
      if (firstField) {
        const id =
          firstField === "country"
            ? formState.countrySelect === "Other"
              ? "country"
              : "countrySelect"
            : firstField;
        setTimeout(() => {
          const el = document.getElementById(String(id));
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
          if (el && "focus" in el && typeof (el as HTMLInputElement).focus === "function") {
            (el as HTMLInputElement).focus({ preventScroll: true });
          }
        }, 80);
      }
      return;
    }

    setIsSubmitting(true);

    const body = {
      ...result.data,
      dates: `${result.data.startDate} – ${result.data.endDate}`,
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !json.ok) {
        setErrors({
          form: json.error ?? "Something went wrong. Please try again.",
        });
        setIsSubmitting(false);
        return;
      }

      trackEvent("enquiry_submitted", {
        method: "enquiry_form",
        service_type: result.data.serviceType,
      });

      router.push("/thank-you");
    } catch (error) {
      console.error(error);
      setErrors({
        form: "Something went wrong. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  const focusTourField = () => {
    tourInputRef.current?.focus({ preventScroll: false });
  };

  return (
    <>
      <form
        id={FORM_ID}
        className="space-y-8 pb-24 md:pb-0"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="on"
      >
        {errors.form && (
          <p className="text-sm text-red-600" role="alert">
            {errors.form}
          </p>
        )}

        {formState.serviceType === "Private Tour" && formState.tour && (
          <div className="rounded-lg border border-[var(--color-line)] bg-neutral-50/80 px-4 py-3 text-sm">
            <p className="text-ink">
              You&apos;re booking: <strong>{formState.tour}</strong>
            </p>
            <button
              type="button"
              onClick={focusTourField}
              className="mt-2 text-sm text-[var(--color-brand)] underline underline-offset-2 hover:no-underline"
            >
              Edit
            </button>
          </div>
        )}

        {/* Section A: Your details */}
        <div>
          <h2 className={sectionTitleClass}>Your details</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className={fieldClass}
                value={formState.name}
                onChange={handleChange}
                required
                aria-required="true"
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={fieldClass}
                value={formState.email}
                onChange={handleChange}
                required
                aria-required="true"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="phoneOrWhatsapp">
                Phone / WhatsApp
              </label>
              <input
                id="phoneOrWhatsapp"
                name="phoneOrWhatsapp"
                type="tel"
                autoComplete="tel"
                className={fieldClass}
                value={formState.phoneOrWhatsapp}
                onChange={handleChange}
                required
                aria-required="true"
              />
              {errors.phoneOrWhatsapp && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.phoneOrWhatsapp}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section B: Trip basics — order: Service type, Group size, Country, Tour (only when Private Tour) */}
        <div>
          <h2 className={sectionTitleClass}>Trip basics</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="serviceType">
                Service type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                className={fieldClass}
                value={formState.serviceType}
                onChange={handleChange}
                required
                aria-required="true"
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {servicePrefilledFromParam && (
                <p className="mt-1.5 text-xs text-ink-muted">
                  Pre-selected based on what you clicked.
                </p>
              )}
              {errors.serviceType && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.serviceType}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass} htmlFor="groupSize">
                Group size
              </label>
              <select
                id="groupSize"
                name="groupSize"
                className={fieldClass}
                value={formState.groupSize}
                onChange={handleChange}
                required
                aria-required="true"
              >
                {groupSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.groupSize && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.groupSize}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass} htmlFor="countrySelect">
                Country
              </label>
              <select
                id="countrySelect"
                name="countrySelect"
                className={fieldClass}
                value={
                  countryOptions.includes(formState.country)
                    ? formState.country
                    : formState.countrySelect ||
                      (formState.country ? "Other" : "")
                }
                onChange={(e) => {
                  const v = e.target.value;
                  setFormState((prev) => ({
                    ...prev,
                    countrySelect: v,
                    country: v === "Other" ? prev.country : v,
                  }));
                }}
                required
                aria-required="true"
                autoComplete="country-name"
              >
                <option value="">Select country</option>
                {countryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {(formState.countrySelect === "Other" ||
                (formState.country &&
                  !countryOptions.includes(formState.country))) && (
                <>
                  <label
                    className="mb-2 mt-3 block text-sm font-medium text-ink"
                    htmlFor="country"
                  >
                    Country (other)
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    className={fieldClass}
                    value={formState.country}
                    onChange={handleChange}
                    required={Boolean(
                      formState.countrySelect === "Other" ||
                        (formState.country &&
                          !countryOptions.includes(formState.country))
                    )}
                  />
                </>
              )}
              {errors.country && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.country}
                </p>
              )}
            </div>
            {formState.serviceType === "Private Tour" && (
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="tour">
                  Tour
                </label>
                <input
                  ref={tourInputRef}
                  id="tour"
                  name="tour"
                  type="text"
                  className={fieldClass}
                  value={formState.tour}
                  onChange={handleChange}
                  placeholder="e.g. Private Cliffs of Moher + Bunratty Castle Day Tour"
                  aria-label="Tour or experience you're interested in (optional)"
                />
                <p className="mt-1 text-xs text-ink-muted">
                  Optional – pre-filled if you came from a tour page.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section C: Dates & pickup */}
        <div>
          <h2 className={sectionTitleClass}>Dates & pickup</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="startDate">
                Start date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className={fieldClass}
                value={formState.startDate}
                onChange={handleChange}
                required
                aria-required="true"
              />
              {errors.startDate && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.startDate}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass} htmlFor="endDate">
                End date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                className={fieldClass}
                value={formState.endDate}
                onChange={handleChange}
                required
                aria-required="true"
              />
              {errors.endDate && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.endDate}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="pickupLocation">
                Pickup location
              </label>
              <input
                id="pickupLocation"
                name="pickupLocation"
                type="text"
                autoComplete="street-address"
                className={fieldClass}
                value={formState.pickupLocation}
                onChange={handleChange}
                required
                aria-required="true"
                placeholder="e.g. Hotel name, address, or port"
              />
              {errors.pickupLocation && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.pickupLocation}
                </p>
              )}
            </div>
          </div>
        </div>

        {isExecutive && (
          <div>
            <label
              className={labelClass}
              htmlFor="companyWebsite"
            >
              Company website
            </label>
            <input
              id="companyWebsite"
              name="companyWebsite"
              type="url"
              autoComplete="url"
              className={fieldClass}
              value={formState.companyWebsite}
              onChange={handleChange}
              required={isExecutive}
              aria-required={isExecutive}
              placeholder="https://"
            />
            {errors.companyWebsite && (
              <p className="mt-2 text-xs text-red-600" role="alert">
                {errors.companyWebsite}
              </p>
            )}
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor="message">
            Notes
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={fieldClass}
            value={formState.message}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="e.g. dietary needs, accessibility, or special requests"
          />
          {errors.message && (
            <p className="mt-2 text-xs text-red-600" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              name="consent"
              checked={formState.consent}
              onChange={handleChange}
              className="mt-1 h-5 w-5 shrink-0 rounded border-[var(--color-line)] text-[var(--color-brand)] focus:ring-[var(--color-brand)]"
              required
              aria-required="true"
              aria-describedby="consent-desc"
              aria-invalid={Boolean(errors.consent)}
            />
            <label id="consent-desc" className="text-sm text-ink" htmlFor="consent">
              I consent to Atlantic Drive Tours contacting me about this
              enquiry. My details will not be used for marketing or shared with
              third parties.
            </label>
          </div>
          {errors.consent && (
            <p className="mt-2 text-xs text-red-600" role="alert">
              {errors.consent}
            </p>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-sm text-[var(--text-secondary)]">
            No payment today. We reply within 24 hours with availability and a tailored plan.
          </p>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            What happens next
          </p>
          <ol className="space-y-1 text-xs text-[var(--text-secondary)]" aria-label="What happens next">
            <li>1. Send enquiry</li>
            <li>2. We confirm availability</li>
            <li>3. You receive a tailored plan</li>
          </ol>
          <button
            ref={submitRef}
            id={SUBMIT_BUTTON_ID}
            type="submit"
            className="btn btn-primary w-full min-h-[48px] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting…" : "Book now free"}
          </button>
          <p className="text-center text-xs text-ink-muted">
            We reply within 24 hours. No obligation. No spam.
          </p>
        </div>
      </form>

      {/* Mobile-only sticky submit bar when main button is off-screen */}
      {mounted && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30 p-4 md:hidden transition-[transform,opacity,visibility] duration-300 ease-out"
          aria-hidden={!stickyBarVisible}
          style={{
            opacity: stickyBarVisible ? 1 : 0,
            visibility: stickyBarVisible ? "visible" : "hidden",
            pointerEvents: stickyBarVisible ? "auto" : "none",
            transform: stickyBarVisible ? "translateY(0)" : "translateY(100%)",
          }}
        >
          <div className="mx-auto max-w-md rounded-xl bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm border border-[var(--color-line)] p-3">
            <button
              type="submit"
              form={FORM_ID}
              className="btn btn-primary w-full min-h-[48px] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting…" : "Book now free"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
