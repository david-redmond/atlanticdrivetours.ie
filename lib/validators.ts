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
      "Executive / Corporate",
    ]),
    groupSize: z.enum(["1–2", "3–6", "7–12", "13–24", "25+"]),
    startDate: z.string().min(1, "Please select start date."),
    endDate: z.string().min(1, "Please select end date."),
    dates: z.string().optional(),
    pickupLocation: z.string().min(2, "Please enter a pickup location."),
    message: z.string().min(10, "Please share a few details."),
    consent: z.literal(true, {
      errorMap: () => ({ message: "You must consent to be contacted to continue." }),
    }),
    companyWebsite: z.string().optional(),
    tour: z.string().optional(),
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
  );

export type EnquiryInput = z.infer<typeof enquirySchema>;
