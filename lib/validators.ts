import { z } from "zod";

export const enquirySchema = z
  .object({
    name: z.string().min(2, "Please enter your name."),
    email: z.string().email("Please enter a valid email."),
    phoneOrWhatsapp: z
      .string()
      .min(5, "Please enter a phone or WhatsApp number."),
    country: z.string().min(2, "Please enter your country."),
    serviceType: z.enum([
      "Private Tour",
      "Multi-day Tour",
      "Golf Transfers",
      "Airport Transfer",
      "Cruise Transfer",
      "Executive / Corporate",
    ]),
    groupSize: z.enum(["1–2", "3–6", "7–12", "13–24", "25+"]),
    startDate: z.string().min(1, "Please select a date."),
    endDate: z.string().optional(),
    dates: z.string().optional(),
    pickupLocation: z.string().min(2, "Please enter a pickup location."),
    // Notes are optional to reduce friction; share as much or as little as you like.
    message: z.string().optional(),
    dateFlexibility: z.string().optional(),
    preferredContact: z.string().optional(),
    consent: z.literal(true, {
      errorMap: () => ({ message: "You must consent to be contacted to continue." }),
    }),
    companyWebsite: z.string().optional(),
    tour: z.string().optional(),
    // Optional add-ons to increase trip value (multi-select on the form).
    addOns: z.array(z.string().max(80)).max(12).optional(),
    // First-touch lead attribution (optional, captured client-side).
    utmSource: z.string().max(200).optional(),
    utmMedium: z.string().max(200).optional(),
    utmCampaign: z.string().max(200).optional(),
    utmTerm: z.string().max(200).optional(),
    utmContent: z.string().max(200).optional(),
    referrer: z.string().max(500).optional(),
    landingPath: z.string().max(500).optional(),
  })
  .refine(
    (data) => {
      if (data.serviceType !== "Executive / Corporate") return true;
      return (data.companyWebsite ?? "").trim().length > 0;
    },
    {
      message: "Company website is required for executive bookings.",
      path: ["companyWebsite"],
    }
  )
  .refine(
    (data) => {
      // Multi-day tours need an end date; single-day services do not.
      if (data.serviceType !== "Multi-day Tour") return true;
      return (data.endDate ?? "").trim().length > 0;
    },
    {
      message: "Please select an end date for a multi-day tour.",
      path: ["endDate"],
    }
  );

export type EnquiryInput = z.infer<typeof enquirySchema>;
