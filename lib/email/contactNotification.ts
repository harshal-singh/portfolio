import {
  buildContactEmailHtml,
  buildContactEmailText,
  type ContactEmailPayload,
} from "@/lib/email/contactEmailTemplate";
import { Resend } from "resend";

export type { ContactEmailPayload };

function isResendTestSender(from: string): boolean {
  return /onboarding@resend\.dev/i.test(from);
}

function resolveNotifyTo(payload: ContactEmailPayload): string {
  return (
    process.env.RESEND_TEST_RECIPIENT ??
    process.env.CONTACT_NOTIFY_EMAIL ??
    payload.notifyTo
  );
}

export async function sendContactNotification(
  payload: ContactEmailPayload,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return false;
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";
  const to = resolveNotifyTo(payload);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://harshal-singh.vercel.app";
  const receivedAt = new Date().toISOString();

  if (isResendTestSender(from)) {
    console.info(
      `[contact] Resend test sender — delivering to ${to}. Must match your Resend account email until a domain is verified.`,
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: `New contact · ${payload.name}`,
    text: buildContactEmailText(payload, receivedAt),
    html: buildContactEmailHtml(payload, receivedAt, siteUrl),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return false;
  }

  return true;
}
