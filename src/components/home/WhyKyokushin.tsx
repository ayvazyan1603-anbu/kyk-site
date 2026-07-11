import { motion } from "motion/react";
import {
  Shield, Sparkles, Heart, Target, Swords, Activity, Users, Mountain,
  type LucideIcon,
} from "lucide-react";
import { why } from "@/content";
import { SectionReveal } from "@/components/layout/SectionReveal";

const ICONS: Record<string, LucideIcon> = {
  Shield, Sparkles, Heart, Target, Swords, Activity, Users, Mountain,
};

export function WhyKyokushin() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionReveal>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">Ինչու՞ մենք</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-balance">
            {why.title}
          </h2>
          <p className="mt-5 text-muted-foreground text-lg text-balance">{why.subtitle}</p>
        </div>
      </SectionReveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {why.items.map((item, i) => {
          const Icon = ICONS[item.icon] ?? Shield;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-shadow hover:shadow-[0_20px_60px_-20px_rgba(15,61,145,0.35)]"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <h3 className="relative mt-6 font-display text-xl font-semibold">{item.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
