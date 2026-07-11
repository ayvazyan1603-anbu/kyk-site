import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ctas } from "@/content";
import { SectionReveal } from "./SectionReveal";

export function CtaBanner({ label = ctas.freeShort }: { label?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionReveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-glow px-8 py-14 sm:px-14 sm:py-20 text-center shadow-[0_30px_80px_-30px_rgba(15,61,145,0.6)]">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0%,transparent_40%),radial-gradient(circle_at_80%_80%,white_0%,transparent_40%)]" />
          <h3 className="relative font-display text-3xl sm:text-5xl font-semibold text-white text-balance">
            Առաջին մարզումն անվճար է
          </h3>
          <p className="relative mt-4 text-white/80 text-lg">Փորձի՛ր առանց պարտավորության։</p>
          <Link
            to="/register"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary shadow-xl transition-transform hover:scale-105"
          >
            {label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionReveal>
    </section>
  );
}
