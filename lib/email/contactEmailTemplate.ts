import { emailFontFamilies } from "@/lib/email/emailFonts";

export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  notifyTo: string;
}

/** Portfolio dark theme — inline hex only (email clients ignore CSS variables). */
export const contactEmailTheme = {
  background: "#09090b",
  foreground: "#fafafa",
  muted: "#a1a1aa",
  mutedForeground: "#8a8a93",
  surface: "#18181b",
  surfaceElevated: "#27272a",
  border: "rgba(255, 255, 255, 0.1)",
  borderHex: "#27272a",
  borderSubtle: "rgba(255, 255, 255, 0.06)",
  borderSubtleHex: "#1f1f23",
  accent: "#4caf50",
  accentHover: "#43a047",
  accentForeground: "#09090b",
  accentMuted: "rgba(76, 175, 80, 0.12)",
} as const;

const fonts = emailFontFamilies;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMessageHtml(message: string): string {
  return escapeHtml(message).replace(/\n/g, "<br />");
}

function formatTimestamp(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function fieldRow(
  label: string,
  valueHtml: string,
  c: typeof contactEmailTheme,
): string {
  return `
    <tr>
      <td style="padding:0 0 16px;">
        <p style="margin:0 0 6px;font-family:${fonts.mono};font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${c.muted};">
          ${label}
        </p>
        ${valueHtml}
      </td>
    </tr>`;
}

export function buildContactEmailText(
  payload: ContactEmailPayload,
  receivedAt: string,
): string {
  return [
    "New portfolio contact form message",
    "----------------------------------",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Received: ${formatTimestamp(receivedAt)}`,
    "",
    "Message:",
    payload.message,
    "",
    `Reply to ${payload.name}: ${payload.email}`,
  ].join("\n");
}

export function buildContactEmailHtml(
  payload: ContactEmailPayload,
  receivedAt: string,
  siteUrl: string,
): string {
  const c = contactEmailTheme;
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const message = formatMessageHtml(payload.message);
  const timestamp = escapeHtml(formatTimestamp(receivedAt));
  const siteHost = escapeHtml(siteUrl.replace(/^https?:\/\//, ""));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>New message from ${name}</title>
  <style>
    @media only screen and (max-width: 520px) {
      .email-shell { padding: 20px 12px !important; }
      .email-card { border-radius: 14px !important; }
      .email-body { padding: 24px 20px !important; }
      .email-title { font-size: 26px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${c.background};color:${c.foreground};font-family:${fonts.sans};font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-shell" style="background-color:${c.background};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-card" style="max-width:560px;background-color:${c.surface};border:1px solid ${c.borderSubtleHex};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="height:4px;background-color:${c.accent};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td class="email-body" style="padding:32px 32px 8px;">
              <p style="margin:0 0 24px;font-family:${fonts.heading};font-size:24px;font-weight:700;letter-spacing:-0.02em;text-transform:lowercase;color:${c.foreground};">
                harshal singh<span style="color:${c.accent};">.</span>
              </p>
              <p style="margin:0 0 10px;font-family:${fonts.mono};font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:${c.accent};">
                Contact · New message
              </p>
              <h1 class="email-title" style="margin:0;font-family:${fonts.heading};font-size:32px;line-height:1.1;font-weight:600;letter-spacing:-0.03em;color:${c.foreground};">
                New message from ${name}
              </h1>
              <p style="margin:14px 0 0;font-family:${fonts.sans};font-size:15px;line-height:1.65;color:${c.muted};">
                Someone submitted your portfolio contact form.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 32px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${c.borderSubtleHex};padding-top:24px;">
                ${fieldRow(
                  "From",
                  `<p style="margin:0;font-family:${fonts.heading};font-size:18px;font-weight:600;color:${c.foreground};">${name}</p>`,
                  c,
                )}
                ${fieldRow(
                  "Email",
                  `<p style="margin:0;font-family:${fonts.sans};font-size:15px;"><a href="mailto:${email}" style="color:${c.accent};text-decoration:none;font-weight:500;">${email}</a></p>`,
                  c,
                )}
                ${fieldRow(
                  "Received",
                  `<p style="margin:0;font-family:${fonts.mono};font-size:13px;color:${c.mutedForeground};">${timestamp}</p>`,
                  c,
                )}
                <tr>
                  <td style="padding:0 0 8px;">
                    <p style="margin:0 0 10px;font-family:${fonts.mono};font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${c.muted};">
                      Message
                    </p>
                    <div style="padding:16px 18px;background-color:${c.surfaceElevated};border:1px solid ${c.borderSubtleHex};border-left:3px solid ${c.accent};border-radius:12px;font-family:${fonts.sans};font-size:15px;line-height:1.75;color:${c.foreground};">
                      ${message}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="border-radius:8px;background-color:${c.accent};">
                    <a href="mailto:${email}?subject=${encodeURIComponent("Re: Harshal Singh - Portfolio Inquiry")}"
                       style="display:block;padding:14px 24px;font-family:${fonts.sans};font-size:15px;font-weight:600;text-align:center;text-decoration:none;color:${c.accentForeground};">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 32px;background-color:${c.background};border-top:1px solid ${c.borderSubtleHex};">
              <p style="margin:0;font-family:${fonts.mono};font-size:11px;line-height:1.6;color:${c.muted};">
                Sent via
                <a href="${escapeHtml(siteUrl)}" style="color:${c.mutedForeground};text-decoration:underline;">${siteHost}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Sample payload for local email preview. */
export function sampleContactEmailPayload(): ContactEmailPayload {
  return {
    name: "Alex Morgan",
    email: "alex.morgan@company.com",
    message:
      "Hi Harshal,\n\nI came across your portfolio and would love to discuss a frontend role on our product team. Your Next.js and performance work stood out.\n\nAre you open to a quick call next week?\n\nBest,\nAlex",
    notifyTo: "harshal.wrk@gmail.com",
  };
}
