import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { emailLog } from "@/lib/email-log";
import { escapeHtml, formatTimestamp } from "@/lib/email-utils";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional(),
  message: z.string().min(10, "Please enter your message."),
});

function buildContactEmailHtml(params: {
  name: string;
  email: string;
  phone: string | undefined;
  message: string;
  timestamp: string;
  ip: string;
}): string {
  const { name, email, phone, message, timestamp, ip } = params;
  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safePhone = phone ? escapeHtml(phone.trim()) : "";
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");
  const safeTime = escapeHtml(formatTimestamp(timestamp));
  const safeIp = escapeHtml(ip);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact form — Atlantic Drive Tours</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #1a1a1a; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden;">
          <tr>
            <td style="padding: 24px 24px 16px; border-bottom: 3px solid #0d9488;">
              <h1 style="margin:0; font-size: 20px; font-weight: 600; color: #0f766e;">New contact message</h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #64748b;">Atlantic Drive Tours — website contact form</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px; background-color: #f0fdfa;">
              <p style="margin:0 0 8px; font-size: 12px; font-weight: 600; color: #0f766e; text-transform: uppercase; letter-spacing: 0.04em;">Reply to</p>
              <p style="margin:0; font-size: 16px;"><a href="mailto:${safeEmail}" style="color: #0d9488; font-weight: 600; text-decoration: none;">${safeEmail}</a></p>
              ${safePhone ? `<p style="margin: 8px 0 0; font-size: 15px; color: #475569;">Phone: ${safePhone}</p>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px 0;">
              <p style="margin:0 0 6px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">From</p>
              <p style="margin:0; font-size: 16px; font-weight: 500; color: #1a1a1a;">${safeName}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 24px 24px;">
              <p style="margin:0 0 8px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">Message</p>
              <div style="padding: 16px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #0d9488;">
                <p style="margin:0; font-size: 15px; color: #334155; white-space: pre-wrap;">${safeMessage}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 24px 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin:0; font-size: 11px; color: #94a3b8;">Submitted ${safeTime} · IP ${safeIp}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

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
  emailLog.start("contact");
  try {
    const payload = await req.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      const first = parsed.error.errors[0];
      emailLog.validationFailed(
        "contact",
        first?.message ?? "Invalid input.",
        first?.path
      );
      return NextResponse.json(
        { ok: false, error: first?.message ?? "Invalid input." },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.ok) {
      emailLog.rateLimited("contact", ip);
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try later." },
        { status: 429 }
      );
    }

    const { name, email, phone, message } = parsed.data;
    const timestamp = new Date().toISOString();

    emailLog.validationOk("contact", {
      hasName: !!name,
      hasEmail: !!email,
      hasPhone: !!phone,
      hasMessage: !!message,
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;
    const emailFrom = process.env.EMAIL_FROM;

    const missingEnv: string[] = [];
    if (!resendApiKey) missingEnv.push("RESEND_API_KEY");
    if (!emailTo) missingEnv.push("EMAIL_TO");
    if (!emailFrom) missingEnv.push("EMAIL_FROM");

    if (missingEnv.length > 0) {
      emailLog.envMissing("contact", missingEnv);
      console.log("Contact payload (dev fallback):", { name, email, phone, message, timestamp });
      return NextResponse.json({ ok: true });
    }

    emailLog.sendStart("contact");

    const toAddress = emailTo as string;
    const fromAddress = emailFrom as string;

    const html = buildContactEmailHtml({
      name,
      email,
      phone,
      message,
      timestamp,
      ip,
    });

    const resend = new Resend(resendApiKey);
    const result = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      subject: `Contact: ${name.trim()} — Atlantic Drive Tours`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        ...(phone ? [`Phone: ${phone}`] : []),
        `Message: ${message}`,
        `Submitted: ${timestamp}`,
        `IP: ${ip}`,
      ].join("\n"),
      html,
    });

    if (result.error) {
      const errMsg = result.error.message ?? String(result.error);
      const errCode = (result.error as { code?: unknown })?.code;
      emailLog.sendError("contact", errMsg, errCode);
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    emailLog.sendOk("contact", result.data?.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    emailLog.unexpectedError("contact", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
