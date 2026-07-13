import { motion } from "motion/react";
import { Award, Trophy, Medal, Tent, GraduationCap, Star, User, Users } from "lucide-react";
import { federation } from "@/content";
import { SectionReveal } from "@/components/layout/SectionReveal";

const ICONS = [Award, Trophy, Medal, Tent, GraduationCap, Star, User, Users];

export function Federation() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32 text-white">
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs uppercase tracking-[0.35em] text-primary-glow">Ֆեդերացիա</span>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-balance">
              {federation.title}
            </h2>
            <p className="mt-5 text-white/70 text-lg text-balance">{federation.subtitle}</p>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {federation.items.map((it, i) => {
            const Icon = ICONS[i] ?? Award;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-glow/20 text-primary-glow">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{it.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
