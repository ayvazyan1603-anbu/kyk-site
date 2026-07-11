import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Instagram, Send, MessageCircle } from "lucide-react";
import { meta, contactPage, site } from "@/content";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { ContactCtas } from "./register";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: meta.contact.title },
      { name: "description", content: meta.contact.description },
      { property: "og:title", content: meta.contact.title },
      { property: "og:description", content: meta.contact.description },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-40 pb-24">
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.35em] text-primary">Կապ</span>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl font-semibold text-balance">
          {contactPage.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground text-lg text-balance">
          {contactPage.subtitle}
        </p>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <SectionReveal>
          <div className="overflow-hidden rounded-3xl border border-border shadow-lg aspect-[4/3]">
            <iframe
              title="Google Maps"
              src={site.contact.mapEmbed}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="space-y-6">
            <InfoCard icon={<MapPin className="h-5 w-5" />} title={contactPage.addressLabel}>
              {site.contact.address}
            </InfoCard>
            <InfoCard icon={<Phone className="h-5 w-5" />} title={contactPage.phoneLabel}>
              <a href={`tel:${site.contact.phoneTel}`} className="hover:text-primary">
                {site.contact.phoneDisplay}
              </a>
            </InfoCard>
            <InfoCard icon={<Clock className="h-5 w-5" />} title={contactPage.hoursLabel}>
              {site.contact.hours}
            </InfoCard>
            <InfoCard
              icon={<Instagram className="h-5 w-5" />}
              title={contactPage.socialsLabel}
            >
              <div className="flex flex-wrap gap-3">
                <a href={`https://instagram.com/${site.contact.instagramHandle}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
                  <Instagram className="h-4 w-4" /> @{site.contact.instagramHandle}
                </a>
                <a href={`https://t.me/${site.contact.telegramHandle}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
                  <Send className="h-4 w-4" /> @{site.contact.telegramHandle}
                </a>
                <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </InfoCard>
          </div>
        </SectionReveal>
      </div>

      <div className="mt-16">
        <ContactCtas />
      </div>
    </div>
  );
}

function InfoCard({
  icon, title, children,
}: {
  icon: React.ReactNode; title: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold uppercase tracking-widest text-xs text-muted-foreground">
          {title}
        </h3>
      </div>
      <div className="mt-3 text-lg text-foreground">{children}</div>
    </div>
  );
}
