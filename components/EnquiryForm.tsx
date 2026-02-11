"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
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
};

const fieldClass =
  "w-full rounded-md border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-ink focus:border-[var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)]";

export default function EnquiryForm() {
  const router = useRouter();
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const parsed = useMemo(
    () => enquirySchema.safeParse(payloadForValidation),
    [payloadForValidation]
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

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {errors.form && (
        <p className="text-sm text-red-600" role="alert">
          {errors.form}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="name">
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
            <p className="mt-2 text-xs text-red-600" role="alert">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="email">
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
            <p className="mt-2 text-xs text-red-600" role="alert">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-ink"
            htmlFor="phoneOrWhatsapp"
          >
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
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="countrySelect">
            Country
          </label>
          <select
            id="countrySelect"
            name="countrySelect"
            className={fieldClass}
            value={
              countryOptions.includes(formState.country)
                ? formState.country
                : formState.countrySelect || (formState.country ? "Other" : "")
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
          >
            <option value="">Select country</option>
            {countryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {(formState.countrySelect === "Other" ||
            (formState.country && !countryOptions.includes(formState.country))) && (
            <>
              <label className="mb-2 mt-3 block text-sm font-medium text-ink" htmlFor="country">
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
                    (formState.country && !countryOptions.includes(formState.country))
                )}
              />
            </>
          )}
          {errors.country && (
            <p className="mt-2 text-xs text-red-600" role="alert">{errors.country}</p>
          )}
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-ink"
            htmlFor="serviceType"
          >
            Service Type
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
          {errors.serviceType && (
            <p className="mt-2 text-xs text-red-600" role="alert">{errors.serviceType}</p>
          )}
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-ink"
            htmlFor="groupSize"
          >
            Group Size
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
            <p className="mt-2 text-xs text-red-600" role="alert">{errors.groupSize}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="startDate">
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
            <p className="mt-2 text-xs text-red-600" role="alert">{errors.startDate}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="endDate">
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
            <p className="mt-2 text-xs text-red-600" role="alert">{errors.endDate}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label
            className="mb-2 block text-sm font-medium text-ink"
            htmlFor="pickupLocation"
          >
            Pickup Location
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
          />
          {errors.pickupLocation && (
            <p className="mt-2 text-xs text-red-600" role="alert">
              {errors.pickupLocation}
            </p>
          )}
        </div>
      </div>

      {isExecutive && (
        <div>
          <label
            className="mb-2 block text-sm font-medium text-ink"
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
        <label className="mb-2 block text-sm font-medium text-ink" htmlFor="message">
          Tell us about your plans
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={fieldClass}
          value={formState.message}
          onChange={handleChange}
          required
          aria-required="true"
        />
        {errors.message && (
          <p className="mt-2 text-xs text-red-600" role="alert">{errors.message}</p>
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
            className="mt-1 h-4 w-4 rounded border-[var(--color-line)] text-[var(--color-brand)] focus:ring-[var(--color-brand)]"
            required
            aria-required="true"
            aria-describedby="consent-desc"
          />
          <label id="consent-desc" className="text-sm text-ink" htmlFor="consent">
            I consent to Atlantic Drive Tours contacting me about this enquiry. My details will not be used for marketing or shared with third parties.
          </label>
        </div>
        {errors.consent && (
          <p className="mt-2 text-xs text-red-600" role="alert">{errors.consent}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting || !parsed.success}
      >
        {isSubmitting ? "Submitting..." : "Request availability"}
      </button>
      <p className="text-center text-xs text-ink-muted">
        We reply within 24 hours. No obligation. No spam.
      </p>
    </form>
  );
}
