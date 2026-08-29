import { getPortfolioContent } from "@/lib/content/getContent";
import { sendContactNotification } from "@/lib/email/contactNotification";
import { appendContactMessage } from "@/lib/google/sheetsContact";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body as {
    name?: string;
    email?: string;
    message?: string;
  };

  const trimmedName = name?.trim() ?? "";
  const trimmedEmail = email?.trim() ?? "";
  const trimmedMessage = message?.trim() ?? "";

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (!EMAIL_RE.test(trimmedEmail)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (trimmedMessage.length > 5000) {
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });
  }

  const { profile } = await getPortfolioContent();

  const emailed = await sendContactNotification({
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
    notifyTo: profile.email,
  });

  // Optional: append to sheet when service account has write access
  const saved = await appendContactMessage(trimmedName, trimmedEmail, trimmedMessage);

  if (!emailed && !saved) {
    return NextResponse.json(
      {
        error:
          "Could not deliver your message. Email notifications may not be configured yet.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, emailed, saved });
}
