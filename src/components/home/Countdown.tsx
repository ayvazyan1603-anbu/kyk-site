import { useEffect, useState } from "react";
import { site, countdown } from "@/content";
import { SectionReveal } from "@/components/layout/SectionReveal";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms / 3_600_000) % 24);
  const m = Math.floor((ms / 60_000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

export function Countdown() {
  const target = new Date(site.nextGroupStart);
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cells: [number, string][] = [
    [t.d, countdown.labels.d],
    [t.h, countdown.labels.h],
    [t.m, countdown.labels.m],
    [t.s, countdown.labels.s],
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionReveal>
        <div className="rounded-3xl border border-border bg-gradient-to-br from-secondary/60 to-background p-10 sm:p-16 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">Հաշվարկ</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold text-balance">
            {site.nextGroupLabel}
          </h2>
          <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
            {cells.map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-card border border-border py-6 sm:py-8">
                <div className="font-display text-4xl sm:text-6xl font-semibold text-primary tabular-nums">
                  {mounted ? String(v).padStart(2, "0") : "--"}
                </div>
                <div className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
