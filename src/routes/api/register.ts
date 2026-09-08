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
        const BOT_TOKEN = process.env.BOT_TOKEN?.trim().replace(/^["']|["']$/g, "");
        const chatIdsRaw = process.env.CHAT_IDS || process.env.CHAT_ID || "";
        const chatIds = chatIdsRaw
          .split(/[,\s;]+/)
          .map((id) => id.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);

        if (!BOT_TOKEN || chatIds.length === 0) {
          console.error("Missing env: BOT_TOKEN / CHAT_ID");
          return Response.json(
            { error: "server_not_configured", message: "BOT_TOKEN or CHAT_ID is not configured in Vercel" },
            { status: 500 }
          );
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
          `🥋 <b>Նոր հայտ · Dragon Dojo</b>\n\n` +
          `👤 Ծնող: <b>${escapeHtml(v.parentName)}</b>\n` +
          `🧒 Երեխա: <b>${escapeHtml(v.childName)}</b>\n` +
          `🎂 Տարիք: <b>${v.childAge}</b>\n` +
          `📞 Հեռախոս: <b>${escapeHtml(v.phone)}</b>` +
          (v.message ? `\n\n💬 ${escapeHtml(v.message)}` : "");

        const results = await Promise.allSettled(
          chatIds.map((chatId) =>
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: "HTML",
                disable_web_page_preview: true,
              }),
            }).then(async (res) => {
              if (!res.ok) {
                const err = await res.text().catch(() => "");
                throw new Error(`Failed [${res.status}] for ${chatId}: ${err}`);
              }
              const json = (await res.json().catch(() => ({}))) as { ok?: boolean; description?: string };
              if (json.ok === false) {
                throw new Error(`Telegram error for ${chatId}: ${json.description ?? "unknown"}`);
              }
              return json;
            }),
          ),
        );

        const succeeded = results.filter((r) => r.status === "fulfilled");
        if (succeeded.length === 0) {
          const errors = results
            .filter((r): r is PromiseRejectedResult => r.status === "rejected")
            .map((r) => String(r.reason?.message || r.reason));
          console.error("All telegram sends failed", errors);
          return Response.json(
            { error: "telegram_failed", details: errors },
            { status: 502 }
          );
        }

        return Response.json({ ok: true, sent: succeeded.length });
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
