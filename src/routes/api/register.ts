import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  parentName: z.string().trim().min(2).max(120),
  childName: z.string().trim().min(2).max(120),
  childAge: z.coerce.number().int().min(3).max(18),
  phone: z.string().trim().min(6).max(40),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const Route = createFileRoute("/api/register")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY || !CHAT_ID) {
          console.error("Missing env: LOVABLE_API_KEY / TELEGRAM_API_KEY / TELEGRAM_CHAT_ID");
          return new Response("Server not configured", { status: 500 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
        }
        const v = parsed.data;

        const text =
          `🥋 <b>Նոր հայտ · ԱՐԵՍ Կիոկուշին</b>\n\n` +
          `👤 Ծնող: <b>${escapeHtml(v.parentName)}</b>\n` +
          `🧒 Երեխա: <b>${escapeHtml(v.childName)}</b>\n` +
          `🎂 Տարիք: <b>${v.childAge}</b>\n` +
          `📞 Հեռախոս: <b>${escapeHtml(v.phone)}</b>` +
          (v.message ? `\n\n💬 ${escapeHtml(v.message)}` : "");

        const tgRes = await fetch(
          "https://connector-gateway.lovable.dev/telegram/sendMessage",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "X-Connection-Api-Key": TELEGRAM_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: CHAT_ID,
              text,
              parse_mode: "HTML",
              disable_web_page_preview: true,
            }),
          },
        );

        if (!tgRes.ok) {
          const errBody = await tgRes.text().catch(() => "");
          console.error(`Telegram send failed [${tgRes.status}]:`, errBody);
          return new Response(`Telegram send failed [${tgRes.status}]: ${errBody}`, { status: 502 });
        }
        const tgJson = (await tgRes.json().catch(() => ({}))) as { ok?: boolean; description?: string };
        if (tgJson.ok === false) {
          console.error("Telegram API returned ok:false", tgJson);
          return new Response(`Telegram: ${tgJson.description ?? "error"}`, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
