import { motion } from "motion/react";
import { firstLesson } from "@/content";
import { SectionReveal } from "@/components/layout/SectionReveal";

export function FirstLessonSteps() {
  return (
    <section className="bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs uppercase tracking-[0.35em] text-primary">Առաջին քայլ</span>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-balance">
              {firstLesson.title}
            </h2>
            <p className="mt-5 text-muted-foreground text-lg text-balance">{firstLesson.subtitle}</p>
          </div>
        </SectionReveal>

        <div className="relative mt-16 pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          <div className="space-y-6">
            {firstLesson.steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <div className="absolute -left-[26px] top-6 grid h-4 w-4 place-items-center rounded-full bg-primary shadow-[0_0_0_6px_rgba(15,61,145,0.15)]" />
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-3xl font-semibold text-primary/40">{s.n}</span>
                    <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
