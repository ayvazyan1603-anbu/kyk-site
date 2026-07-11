import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews } from "@/content";
import { SectionReveal } from "@/components/layout/SectionReveal";

export function Reviews() {
  const [i, setI] = useState(0);
  const n = reviews.items.length;

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(id);
  }, [n]);

  const item = reviews.items[i];

  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs uppercase tracking-[0.35em] text-primary">Կարծիքներ</span>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-balance">
              {reviews.title}
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">{reviews.subtitle}</p>
          </div>
        </SectionReveal>

        <div className="relative mt-16">
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-border bg-card p-8 sm:p-12 text-center shadow-sm"
              >
                <Quote className="mx-auto h-8 w-8 text-primary/30" />
                <p className="mt-6 font-display text-xl sm:text-2xl leading-relaxed text-balance">
                  «{item.text}»
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    loading="lazy"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="text-left">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setI((v) => (v - 1 + n) % n)}
              aria-label="Նախորդ"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {reviews.items.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Կարծիք ${k + 1}`}
                  className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-2 bg-primary/25"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((v) => (v + 1) % n)}
              aria-label="Հաջորդ"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
