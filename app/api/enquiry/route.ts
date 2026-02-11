import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/validators";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateLimitMap = new Map<
  string,
  { count: number; resetAt: number }
>();

const getClientIp = (req: NextRequest) => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  const realIp = req.headers.get("x-real-ip");
  return realIp ?? "unknown";
};

const checkRateLimit = (ip: string) => {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false };
  }
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return { ok: true };
};

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const parsed = enquirySchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.errors[0]?.message ?? "Invalid input." },
        { status: 400 }
      );
    }

    if (
      parsed.data.companyWebsite &&
      parsed.data.serviceType !== "Executive / Corporate"
    ) {
      return NextResponse.json(
        { ok: false, error: "Spam detected." },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try later." },
        { status: 429 }
      );
    }

    const dates =
      parsed.data.dates ??
      [parsed.data.startDate, parsed.data.endDate].filter(Boolean).join(" – ");

    const {
      name,
      email,
      phoneOrWhatsapp,
      country,
      serviceType,
      groupSize,
      pickupLocation,
      message,
      companyWebsite,
    } = parsed.data;

    const timestamp = new Date().toISOString();
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    const emailPayload = {
      name,
      email,
      phoneOrWhatsapp,
      country,
      serviceType,
      groupSize,
      dates,
      pickupLocation,
      message,
      ...(companyWebsite && { companyWebsite }),
      timestamp,
      ip,
      userAgent,
    };

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;
    const emailFrom = process.env.EMAIL_FROM;

    if (!resendApiKey || !emailTo || !emailFrom) {
      console.log("Enquiry payload (dev fallback):", emailPayload);
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: "New Enquiry — Atlantic Drive Tours",
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone/WhatsApp: ${phoneOrWhatsapp}`,
        `Country: ${country}`,
        `Service: ${serviceType}`,
        `Group Size: ${groupSize}`,
        `Dates: ${dates}`,
        `Pickup Location: ${pickupLocation}`,
        ...(companyWebsite ? [`Company Website: ${companyWebsite}`] : []),
        `Message: ${message}`,
        `Timestamp: ${timestamp}`,
        `IP: ${ip}`,
        `User Agent: ${userAgent}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry error:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
