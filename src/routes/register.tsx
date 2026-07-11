import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { Check, Phone, Send, MessageCircle } from "lucide-react";
import { meta, registerPage, site } from "@/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: meta.register.title },
      { name: "description", content: meta.register.description },
      { property: "og:title", content: meta.register.title },
      { property: "og:description", content: meta.register.description },
      { property: "og:url", content: "/register" },
    ],
    links: [{ rel: "canonical", href: "/register" }],
  }),
  component: RegisterPage,
});

const schema = z.object({
  parentName: z.string().trim().min(2, registerPage.errors.parentName).max(120),
  childName: z.string().trim().min(2, registerPage.errors.childName).max(120),
  childAge: z.coerce.number().int().min(3, registerPage.errors.childAge).max(18, registerPage.errors.childAge),
  phone: z.string().trim().min(6, registerPage.errors.phone).max(40),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});
type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

function RegisterPage() {
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormOutput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error("register failed", res.status, body);
        throw new Error(body || `HTTP ${res.status}`);
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error(e);
      setSubmitError(registerPage.errors.submit);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-40 pb-24">
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.35em] text-primary">Հայտ</span>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl font-semibold text-balance">
          {registerPage.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground text-lg text-balance">
          {registerPage.subtitle}
        </p>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-[0_30px_80px_-40px_rgba(15,61,145,0.35)]">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                  className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40"
                >
                  <Check className="h-12 w-12" strokeWidth={2.5} />
                </motion.div>
                <h2 className="mt-8 font-display text-4xl font-semibold">{registerPage.success.title}</h2>
                <p className="mt-4 text-muted-foreground text-lg">{registerPage.success.text}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
                noValidate
              >
                <Field label={registerPage.form.parentName} error={errors.parentName?.message}>
                  <input type="text" {...register("parentName")} className={inputCls(!!errors.parentName)} autoComplete="name" />
                </Field>
                <Field label={registerPage.form.childName} error={errors.childName?.message}>
                  <input type="text" {...register("childName")} className={inputCls(!!errors.childName)} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={registerPage.form.childAge} error={errors.childAge?.message}>
                    <input type="number" min={3} max={18} {...register("childAge")} className={inputCls(!!errors.childAge)} />
                  </Field>
                  <Field label={registerPage.form.phone} error={errors.phone?.message}>
                    <input type="tel" {...register("phone")} className={inputCls(!!errors.phone)} autoComplete="tel" placeholder="+374 …" />
                  </Field>
                </div>
                <Field label={registerPage.form.message} error={errors.message?.message}>
                  <textarea rows={4} {...register("message")} className={inputCls(false)} />
                </Field>

                {submitError && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.01] hover:shadow-primary/40 disabled:opacity-70"
                >
                  {isSubmitting ? registerPage.form.submitting : registerPage.form.submit}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <ContactCtas />
      </div>
    </div>
  );
}

function Field({
  label, children, error,
}: {
  label: string; children: React.ReactNode; error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground/80">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
function inputCls(err: boolean) {
  return cn(
    "block w-full rounded-2xl border bg-background px-4 py-3.5 text-base outline-none transition-shadow",
    "focus:ring-4 focus:ring-primary/15 focus:border-primary",
    err ? "border-destructive" : "border-border",
  );
}

export function ContactCtas() {
  const items = [
    { href: `tel:${site.contact.phoneTel}`, icon: Phone, label: "Զանգահարել հիմա", sub: site.contact.phoneDisplay, primary: true },
    { href: `https://wa.me/${site.contact.whatsapp}`, icon: MessageCircle, label: "Գրել WhatsApp-ում", sub: "Արագ պատասխան", primary: false },
    { href: `https://t.me/${site.contact.telegramHandle}`, icon: Send, label: "Գրել Telegram-ում", sub: `@${site.contact.telegramHandle}`, primary: false },
  ];
  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-secondary/60 to-background p-8 sm:p-10">
      <h3 className="font-display text-2xl font-semibold">{registerPage.contactHeadline}</h3>
      <p className="mt-2 text-muted-foreground">Ընտրեք ձեզ համար ամենահարմար ուղին։</p>
      <div className="mt-6 space-y-3">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className={cn(
              "group flex items-center gap-4 rounded-2xl border p-4 transition-all",
              it.primary
                ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:scale-[1.02]"
                : "border-border bg-card hover:border-primary/40 hover:bg-accent",
            )}
          >
            <span className={cn("grid h-11 w-11 place-items-center rounded-xl",
              it.primary ? "bg-white/15" : "bg-primary/10 text-primary")}>
              <it.icon className="h-5 w-5" />
            </span>
            <span className="flex-1">
              <span className="block font-semibold">{it.label}</span>
              <span className={cn("block text-sm", it.primary ? "text-white/75" : "text-muted-foreground")}>
                {it.sub}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
