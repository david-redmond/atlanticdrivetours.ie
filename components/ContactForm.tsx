"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const fieldClass =
  "w-full rounded-md border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-ink focus:border-[var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)] min-h-[44px]";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState> & { form?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const nextErrors: Partial<FormState> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) nextErrors.message = "Please enter your message.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          message: form.message.trim(),
        }),
      });

      const json = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setErrors({ form: json.error ?? "Something went wrong. Please try again." });
        setIsSubmitting(false);
        return;
      }

      router.push("/thank-you");
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="on"
      className="space-y-6"
    >
      {errors.form && (
        <p className="text-sm text-red-600" role="alert">
          {errors.form}
        </p>
      )}

      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          value={form.name}
          onChange={handleChange}
          required
          aria-required="true"
        />
        {errors.name && (
          <p className="mt-2 text-xs text-red-600" role="alert">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          value={form.email}
          onChange={handleChange}
          required
          aria-required="true"
        />
        {errors.email && (
          <p className="mt-2 text-xs text-red-600" role="alert">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-ink">
          Phone <span className="text-ink-muted">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={fieldClass}
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className={fieldClass}
          value={form.message}
          onChange={handleChange}
          required
          aria-required="true"
          placeholder="How can we help?"
        />
        {errors.message && (
          <p className="mt-2 text-xs text-red-600" role="alert">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full min-h-[48px] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
