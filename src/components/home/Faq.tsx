import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faq } from "@/content";
import { SectionReveal } from "@/components/layout/SectionReveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
      <SectionReveal>
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">Հարցեր</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-balance">
            {faq.title}
          </h2>
          <p className="mt-5 text-muted-foreground text-lg text-balance">{faq.subtitle}</p>
        </div>
      </SectionReveal>

      <div className="mt-14 divide-y divide-border border-y border-border">
        {faq.items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-primary"
                aria-expanded={isOpen}
              >
                <span className="font-display text-lg sm:text-xl font-semibold text-balance">
                  {it.q}
                </span>
                <Plus
                  className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-muted-foreground leading-relaxed">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
