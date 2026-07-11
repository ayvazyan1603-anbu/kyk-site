import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { site, statsSection } from "@/content";
import { SectionReveal } from "@/components/layout/SectionReveal";

function useCount(target: number, active: boolean, ms = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, ms]);
  return n;
}

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const n = useCount(value, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-6xl sm:text-7xl font-semibold text-primary tabular-nums">
        {n}
        <span className="text-primary-glow">{suffix}</span>
      </div>
      <div className="mt-3 text-sm sm:text-base uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionReveal>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">Փաստեր</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-balance">
            {statsSection.title}
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">{statsSection.subtitle}</p>
        </div>
      </SectionReveal>
      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {site.stats.map((s) => (
          <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  );
}
