import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/validators";
import { emailLog } from "@/lib/email-log";
import { escapeHtml, formatTimestamp } from "@/lib/email-utils";
import { companyName, phone, whatsappNumber } from "@/lib/constants";

function buildEnquiryEmailHtml(params: {
  name: string;
  email: string;
  phoneOrWhatsapp: string;
  country: string;
  serviceType: string;
  groupSize: string;
  dates: string;
  dateFlexibility: string | undefined;
  preferredContact: string | undefined;
  pickupLocation: string;
  message: string | undefined;
  tour: string | undefined;
  companyWebsite: string | undefined;
  addOns?: string[];
  attribution?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    referrer?: string;
    landingPath?: string;
  };
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
    dateFlexibility,
    preferredContact,
    pickupLocation,
    message,
    tour,
    companyWebsite,
    addOns,
    attribution,
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
  const safeMessage = message?.trim()
    ? safe(message).replace(/\n/g, "<br />")
    : "<em style=\"color:#94a3b8;\">No notes provided.</em>";
  const safeFlexibility = dateFlexibility?.trim() ? safe(dateFlexibility.trim()) : "";
  const safePreferredContact = preferredContact?.trim()
    ? safe(preferredContact.trim())
    : "";
  const safeTour = tour?.trim() ? safe(tour.trim()) : "";
  const safeAddOns =
    addOns && addOns.length > 0 ? safe(addOns.join(", ")) : "";
  const safeCompany = companyWebsite?.trim() ? safe(companyWebsite.trim()) : "";
  const safeTime = escapeHtml(formatTimestamp(timestamp));
  const safeIp = escapeHtml(ip);

  const detailRow = (label: string, value: string) =>
    `<tr><td style="padding: 6px 0; font-size: 12px; color: #64748b; width: 120px; vertical-align: top;">${escapeHtml(label)}</td><td style="padding: 6px 0; font-size: 15px; color: #1a1a1a;">${value}</td></tr>`;

  const attributionRows = attribution
    ? (
        [
          ["Source", attribution.utmSource],
          ["Medium", attribution.utmMedium],
          ["Campaign", attribution.utmCampaign],
          ["Term", attribution.utmTerm],
          ["Content", attribution.utmContent],
          ["Referrer", attribution.referrer],
          ["Landing page", attribution.landingPath],
        ] as [string, string | undefined][]
      )
        .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
        .map(([label, v]) => detailRow(label, escapeHtml((v as string).trim())))
        .join("")
    : "";

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
                ${safeFlexibility ? detailRow("Flexibility", safeFlexibility) : ""}
                ${detailRow("Pickup", safePickup)}
                ${safePreferredContact ? detailRow("Preferred contact", safePreferredContact) : ""}
                ${safeTour ? detailRow("Tour", safeTour) : ""}
                ${safeAddOns ? detailRow("Add-ons", safeAddOns) : ""}
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
          ${
            attributionRows
              ? `<tr>
            <td style="padding: 16px 24px 0; border-top: 1px solid #e2e8f0;">
              <p style="margin:0 0 8px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">Lead source</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${attributionRows}
              </table>
            </td>
          </tr>`
              : ""
          }
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

function buildGuestConfirmationHtml(params: {
  name: string;
  serviceType: string;
  groupSize: string;
  dates: string;
  pickupLocation: string;
}): string {
  const { name, serviceType, groupSize, dates, pickupLocation } = params;
  const safe = (s: string) => escapeHtml(s.trim());
  const firstName = safe(name).split(" ")[0] || safe(name);
  const waDigits = whatsappNumber.replace(/\D/g, "");
  const waHref = `https://wa.me/${waDigits}`;
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  const detailRow = (label: string, value: string) =>
    `<tr><td style="padding: 6px 0; font-size: 12px; color: #64748b; width: 120px; vertical-align: top;">${escapeHtml(label)}</td><td style="padding: 6px 0; font-size: 15px; color: #1a1a1a;">${value}</td></tr>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've received your enquiry — ${escapeHtml(companyName)}</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #1a1a1a; background-color: #eef5ef;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #eef5ef; padding: 24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden;">
          <tr>
            <td style="padding: 24px 24px 16px; border-bottom: 3px solid #0F2A1D;">
              <h1 style="margin:0; font-size: 20px; font-weight: 600; color: #0F2A1D;">Thank you, ${firstName} — we've got your enquiry</h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #64748b;">${escapeHtml(companyName)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px;">
              <p style="margin:0 0 12px; font-size: 15px; color: #334155;">We'll personally reply with availability and a tailored plan — usually <strong>within 24 hours, often the same day</strong>. There's no payment today.</p>
              <p style="margin:0; font-size: 12px; font-weight: 600; color: #0F2A1D; text-transform: uppercase; letter-spacing: 0.04em;">Your enquiry</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 8px;">
                ${detailRow("Service", safe(serviceType))}
                ${detailRow("Group size", safe(groupSize))}
                ${detailRow("Dates", safe(dates))}
                ${detailRow("Pickup", safe(pickupLocation))}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 4px 24px 20px;">
              <div style="padding: 16px; background-color: #f0f5f1; border-radius: 6px; border-left: 4px solid #0F2A1D;">
                <p style="margin:0 0 6px; font-size: 14px; color: #334155;">Want a faster reply, or to add details? Message or call us:</p>
                <p style="margin:0; font-size: 15px;">
                  <a href="${waHref}" style="color: #0F2A1D; font-weight: 600; text-decoration: none;">WhatsApp us</a>
                  &nbsp;·&nbsp;
                  <a href="${telHref}" style="color: #0F2A1D; font-weight: 600; text-decoration: none;">${escapeHtml(phone)}</a>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin:0; font-size: 14px; color: #475569;">Many guests pair this with an airport transfer or a second day in another region — just mention it in your reply and we'll build it into your quote.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 24px 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin:0; font-size: 11px; color: #94a3b8;">This is an automated confirmation. Please don't share payment details by email — we never ask for them.</p>
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
      dateFlexibility,
      preferredContact,
      pickupLocation,
      message,
      companyWebsite,
      tour,
      addOns,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      referrer,
      landingPath,
    } = parsed.data;

    const attribution = {
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      referrer,
      landingPath,
    };
    const hasAttribution = Object.values(attribution).some(
      (v) => typeof v === "string" && v.trim().length > 0
    );

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
      ...(dateFlexibility && { dateFlexibility }),
      ...(preferredContact && { preferredContact }),
      pickupLocation,
      message,
      ...(companyWebsite && { companyWebsite }),
      ...(tour && tour.trim() && { tour: tour.trim() }),
      ...(addOns && addOns.length > 0 && { addOns }),
      ...(hasAttribution && { attribution }),
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
      // In production a missing email config means leads are silently lost.
      // Fail loudly so monitoring catches it and the guest is told to retry/contact us.
      if (process.env.NODE_ENV === "production") {
        console.error(
          `Enquiry email NOT sent — missing required env in production: ${missingEnv.join(", ")}`
        );
        return NextResponse.json(
          { ok: false, error: "Something went wrong. Please try again." },
          { status: 500 }
        );
      }
      console.log("Enquiry payload (dev fallback):", emailPayload);
      return NextResponse.json({ ok: true });
    }

    emailLog.sendStart("enquiry");

    const toAddress = emailTo as string;
    const fromAddress = emailFrom as string;

    const html = buildEnquiryEmailHtml({
      name,
      email,
      phoneOrWhatsapp,
      country,
      serviceType,
      groupSize,
      dates,
      dateFlexibility: dateFlexibility?.trim() || undefined,
      preferredContact: preferredContact?.trim() || undefined,
      pickupLocation,
      message,
      tour: tour?.trim() || undefined,
      companyWebsite: companyWebsite?.trim() || undefined,
      addOns: addOns && addOns.length > 0 ? addOns : undefined,
      attribution: hasAttribution ? attribution : undefined,
      timestamp,
      ip,
    });

    const resend = new Resend(resendApiKey);
    const result = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `Enquiry: ${serviceType} — ${groupSize} — ${name.trim()} — Atlantic Drive Tours`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone/WhatsApp: ${phoneOrWhatsapp}`,
        `Country: ${country}`,
        `Service: ${serviceType}`,
        `Group Size: ${groupSize}`,
        `Dates: ${dates}`,
        ...(dateFlexibility?.trim() ? [`Flexibility: ${dateFlexibility.trim()}`] : []),
        `Pickup Location: ${pickupLocation}`,
        ...(preferredContact?.trim() ? [`Preferred contact: ${preferredContact.trim()}`] : []),
        ...(companyWebsite ? [`Company Website: ${companyWebsite}`] : []),
        ...(tour && tour.trim() ? [`Tour: ${tour.trim()}`] : []),
        ...(addOns && addOns.length > 0 ? [`Add-ons: ${addOns.join(", ")}`] : []),
        `Message: ${message?.trim() ? message : "(none provided)"}`,
        ...(hasAttribution
          ? [
              "--- Lead source ---",
              ...(utmSource ? [`Source: ${utmSource}`] : []),
              ...(utmMedium ? [`Medium: ${utmMedium}`] : []),
              ...(utmCampaign ? [`Campaign: ${utmCampaign}`] : []),
              ...(utmTerm ? [`Term: ${utmTerm}`] : []),
              ...(utmContent ? [`Content: ${utmContent}`] : []),
              ...(referrer ? [`Referrer: ${referrer}`] : []),
              ...(landingPath ? [`Landing page: ${landingPath}`] : []),
            ]
          : []),
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

    // Guest auto-confirmation — best-effort; never fail the request if it errors.
    try {
      const guestResult = await resend.emails.send({
        from: fromAddress,
        to: email,
        replyTo: toAddress,
        subject: `We've received your enquiry — ${companyName}`,
        text: [
          `Hi ${name.trim()},`,
          "",
          "Thank you for your enquiry. We'll personally reply with availability and a tailored plan, usually within 24 hours (often the same day). No payment today.",
          "",
          "Your enquiry:",
          `Service: ${serviceType}`,
          `Group size: ${groupSize}`,
          `Dates: ${dates}`,
          `Pickup: ${pickupLocation}`,
          "",
          `Prefer a faster reply? WhatsApp https://wa.me/${whatsappNumber.replace(/\D/g, "")} or call ${phone}.`,
          "",
          `${companyName}`,
        ].join("\n"),
        html: buildGuestConfirmationHtml({
          name,
          serviceType,
          groupSize,
          dates,
          pickupLocation,
        }),
      });
      if (guestResult.error) {
        emailLog.sendError(
          "enquiry",
          `guest confirmation failed: ${guestResult.error.message ?? String(guestResult.error)}`
        );
      } else {
        emailLog.sendOk("enquiry", guestResult.data?.id);
      }
    } catch (guestErr) {
      emailLog.sendError(
        "enquiry",
        `guest confirmation threw: ${guestErr instanceof Error ? guestErr.message : String(guestErr)}`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    emailLog.unexpectedError("enquiry", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
