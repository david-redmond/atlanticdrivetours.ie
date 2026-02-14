/**
 * Structured logging for Resend email flows. No PII or secrets.
 */

const PREFIX = "[Resend]";

export type EmailFlow = "enquiry" | "contact";

function payload(flow: EmailFlow, stage: string, data?: Record<string, unknown>) {
  const entry = { flow, stage, ...data };
  return `${PREFIX} ${JSON.stringify(entry)}`;
}

export const emailLog = {
  start(flow: EmailFlow) {
    console.log(payload(flow, "start", { status: "request_received" }));
  },

  validationFailed(flow: EmailFlow, error: string, path?: unknown) {
    console.error(payload(flow, "validation_failed", { error, path: String(path) }));
  },

  spamRejected(flow: EmailFlow) {
    console.error(payload(flow, "spam_rejected", { reason: "companyWebsite without Executive/Corporate" }));
  },

  rateLimited(flow: EmailFlow, ip: string) {
    console.error(payload(flow, "rate_limited", { ip: ip === "::1" ? "local" : "remote" }));
  },

  validationOk(flow: EmailFlow, fields: Record<string, boolean>) {
    console.log(payload(flow, "validation_ok", { fields }));
  },

  envMissing(flow: EmailFlow, missing: string[]) {
    console.error(payload(flow, "env_missing", { missing, status: "dev_fallback_no_email_sent" }));
  },

  sendStart(flow: EmailFlow) {
    console.log(payload(flow, "send_start", { status: "calling_resend" }));
  },

  sendOk(flow: EmailFlow, id: string | undefined) {
    console.log(payload(flow, "send_ok", { id: id ?? null, status: "email_sent" }));
  },

  sendError(flow: EmailFlow, message: string, code?: unknown) {
    console.error(payload(flow, "send_error", { message, code: code ?? null }));
  },

  unexpectedError(flow: EmailFlow, error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error(payload(flow, "unexpected_error", {
      message: err.message,
      name: err.name,
    }));
  },
};
