import { Link } from "@tanstack/react-router";
import { Instagram, Send, Phone, MapPin, MessageCircle } from "lucide-react";
import { site, nav, footer } from "@/content";
import { IMAGES } from "@/config/images";

const links = [
  { to: "/", label: nav.home },
  { to: "/team", label: nav.team },
  { to: "/register", label: nav.register },
  { to: "/gallery", label: nav.gallery },
  { to: "/contact", label: nav.contact },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={IMAGES.logo} alt="ԱՐԵՍ" width={56} height={56} className="h-14 w-14 object-contain" />
            <div>
              <div className="font-display text-2xl font-semibold">{site.brand.short}</div>
              <div className="text-white/60 text-sm">{site.brand.tagline}</div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-white/70 leading-relaxed">
            {site.brand.full} — Երևանում գործող պրոֆեսիոնալ Կիոկուշին կարատեի դպրոց
            5–14 տարեկան երեխաների համար։
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/50">{footer.quickLinks}</h4>
          <ul className="mt-4 space-y-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/80 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/50">{footer.contactTitle}</h4>
          <ul className="mt-4 space-y-3 text-white/80">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-1 text-primary-glow" />
              <span>{site.contact.address}</span>
            </li>
            <li>
              <a href={`tel:${site.contact.phoneTel}`} className="flex items-center gap-3 hover:text-white">
                <Phone className="h-4 w-4 text-primary-glow" />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-4 pt-2">
              <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-white">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href={`https://t.me/${site.contact.telegramHandle}`} target="_blank" rel="noreferrer" aria-label="Telegram" className="hover:text-white">
                <Send className="h-5 w-5" />
              </a>
              <a href={`https://instagram.com/${site.contact.instagramHandle}`} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-white/50">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
