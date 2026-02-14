import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/validators";
import { emailLog } from "@/lib/email-log";
import { escapeHtml, formatTimestamp } from "@/lib/email-utils";

function buildEnquiryEmailHtml(params: {
  name: string;
  email: string;
  phoneOrWhatsapp: string;
  country: string;
  serviceType: string;
  groupSize: string;
  dates: string;
  pickupLocation: string;
  message: string;
  tour: string | undefined;
  companyWebsite: string | undefined;
  timestamp: string;
  ip: string;
}): string {
  const {
    name,
    email,
    phoneOrWhatsapp,
    country,
    serviceType,
    groupSize,
    dates,
    pickupLocation,
    message,
    tour,
    companyWebsite,
    timestamp,
    ip,
  } = params;

  const safe = (s: string) => escapeHtml(s.trim());
  const safeName = safe(name);
  const safeEmail = safe(email);
  const safePhone = safe(phoneOrWhatsapp);
  const safeCountry = safe(country);
  const safeServiceType = safe(serviceType);
  const safeGroupSize = safe(groupSize);
  const safeDates = safe(dates);
  const safePickup = safe(pickupLocation);
  const safeMessage = safe(message).replace(/\n/g, "<br />");
  const safeTour = tour?.trim() ? safe(tour.trim()) : "";
  const safeCompany = companyWebsite?.trim() ? safe(companyWebsite.trim()) : "";
  const safeTime = escapeHtml(formatTimestamp(timestamp));
  const safeIp = escapeHtml(ip);

  const detailRow = (label: string, value: string) =>
    `<tr><td style="padding: 6px 0; font-size: 12px; color: #64748b; width: 120px; vertical-align: top;">${escapeHtml(label)}</td><td style="padding: 6px 0; font-size: 15px; color: #1a1a1a;">${value}</td></tr>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking enquiry — Atlantic Drive Tours</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #1a1a1a; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden;">
          <tr>
            <td style="padding: 24px 24px 16px; border-bottom: 3px solid #0d9488;">
              <h1 style="margin:0; font-size: 20px; font-weight: 600; color: #0f766e;">New booking enquiry</h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #64748b;">Atlantic Drive Tours — reservation form</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px; background-color: #f0fdfa;">
              <p style="margin:0 0 8px; font-size: 12px; font-weight: 600; color: #0f766e; text-transform: uppercase; letter-spacing: 0.04em;">Reply to</p>
              <p style="margin:0; font-size: 16px;"><a href="mailto:${safeEmail}" style="color: #0d9488; font-weight: 600; text-decoration: none;">${safeEmail}</a></p>
              <p style="margin: 6px 0 0; font-size: 15px; color: #475569;">Phone / WhatsApp: ${safePhone}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 24px 0;">
              <p style="margin:0 0 8px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">Traveller</p>
              <p style="margin:0; font-size: 16px; font-weight: 500; color: #1a1a1a;">${safeName}</p>
              <p style="margin: 4px 0 0; font-size: 14px; color: #64748b;">${safeCountry}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <p style="margin:0 0 12px; font-size: 12px; font-weight: 600; color: #0f766e; text-transform: uppercase; letter-spacing: 0.04em;">Booking details</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${detailRow("Service", safeServiceType)}
                ${detailRow("Group size", safeGroupSize)}
                ${detailRow("Dates", safeDates)}
                ${detailRow("Pickup", safePickup)}
                ${safeTour ? detailRow("Tour", safeTour) : ""}
                ${safeCompany ? detailRow("Company website", safeCompany) : ""}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 24px 24px;">
              <p style="margin:0 0 8px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">Message</p>
              <div style="padding: 16px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #0d9488;">
                <p style="margin:0; font-size: 15px; color: #334155;">${safeMessage}</p>
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
  emailLog.start("enquiry");
  try {
    const payload = await req.json();
    const parsed = enquirySchema.safeParse(payload);

    if (!parsed.success) {
      const first = parsed.error.errors[0];
      emailLog.validationFailed(
        "enquiry",
        first?.message ?? "Invalid input.",
        first?.path
      );
      return NextResponse.json(
        { ok: false, error: first?.message ?? "Invalid input." },
        { status: 400 }
      );
    }

    if (
      parsed.data.companyWebsite &&
      parsed.data.serviceType !== "Executive / Corporate"
    ) {
      emailLog.spamRejected("enquiry");
      return NextResponse.json(
        { ok: false, error: "Spam detected." },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.ok) {
      emailLog.rateLimited("enquiry", ip);
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
      tour,
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
      ...(tour && tour.trim() && { tour: tour.trim() }),
      timestamp,
      ip,
      userAgent,
    };

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;
    const emailFrom = process.env.EMAIL_FROM;

    emailLog.validationOk("enquiry", {
      hasName: !!name,
      hasEmail: !!email,
      hasPhoneOrWhatsapp: !!phoneOrWhatsapp,
      hasCountry: !!country,
      hasServiceType: !!serviceType,
      hasGroupSize: !!groupSize,
      hasDates: !!dates,
      hasPickupLocation: !!pickupLocation,
      hasMessage: !!message,
    });

    const missingEnv: string[] = [];
    if (!resendApiKey) missingEnv.push("RESEND_API_KEY");
    if (!emailTo) missingEnv.push("EMAIL_TO");
    if (!emailFrom) missingEnv.push("EMAIL_FROM");

    if (missingEnv.length > 0) {
      emailLog.envMissing("enquiry", missingEnv);
      console.log("Enquiry payload (dev fallback):", emailPayload);
      return NextResponse.json({ ok: true });
    }

    emailLog.sendStart("enquiry");

    const html = buildEnquiryEmailHtml({
      name,
      email,
      phoneOrWhatsapp,
      country,
      serviceType,
      groupSize,
      dates,
      pickupLocation,
      message,
      tour: tour?.trim() || undefined,
      companyWebsite: companyWebsite?.trim() || undefined,
      timestamp,
      ip,
    });

    const resend = new Resend(resendApiKey);
    const result = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: `Enquiry: ${serviceType} — ${name.trim()} — Atlantic Drive Tours`,
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
        ...(tour && tour.trim() ? [`Tour: ${tour.trim()}`] : []),
        `Message: ${message}`,
        `Timestamp: ${timestamp}`,
        `IP: ${ip}`,
        `User Agent: ${userAgent}`,
      ].join("\n"),
      html,
    });

    if (result.error) {
      const errMsg = result.error.message ?? String(result.error);
      const errCode = (result.error as { code?: unknown })?.code;
      emailLog.sendError("enquiry", errMsg, errCode);
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    emailLog.sendOk("enquiry", result.data?.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    emailLog.unexpectedError("enquiry", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
