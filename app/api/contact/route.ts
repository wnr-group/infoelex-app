import { contactSchema } from "@/components/site/contact-schema";

/**
 * Validates an enquiry and forwards it to CONTACT_WEBHOOK_URL (any endpoint that accepts JSON:
 * a Zapier/Make hook, Slack incoming webhook, a mail relay...). No webhook configured → 503,
 * so enquiries are never reported as sent when nothing received them.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Please check the highlighted fields." }, { status: 422 });
  }
  // Honeypot tripped: pretend success so bots learn nothing.
  if (parsed.data.website) return Response.json({ ok: true });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.error("[contact] CONTACT_WEBHOOK_URL is not set; enquiry not delivered.");
    return Response.json({ error: "Our enquiry form is temporarily unavailable." }, { status: 503 });
  }

  try {
    const { website: _honeypot, ...payload } = parsed.data;
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return Response.json({ error: "We could not send your message. Please try again." }, { status: 502 });
  }
}
