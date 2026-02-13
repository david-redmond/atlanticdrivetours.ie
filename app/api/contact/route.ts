import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional(),
  message: z.string().min(10, "Please enter your message."),
});

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateLimitMap = new Map<
  string,
  { count: number; resetAt: number }
>();

const getClientIp = (req: NextRequest) => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
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
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.errors[0]?.message ?? "Invalid input." },
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

    const { name, email, phone, message } = parsed.data;
    const timestamp = new Date().toISOString();

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;
    const emailFrom = process.env.EMAIL_FROM;

    if (!resendApiKey || !emailTo || !emailFrom) {
      console.log("Contact payload (dev fallback):", { name, email, phone, message, timestamp });
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: "Contact form — Atlantic Drive Tours",
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        ...(phone ? [`Phone: ${phone}`] : []),
        `Message: ${message}`,
        `Submitted: ${timestamp}`,
        `IP: ${ip}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
