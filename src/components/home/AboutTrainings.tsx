import { about } from "@/content";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { cn } from "@/lib/utils";

export function AboutTrainings() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionReveal>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">Մարզումներ</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-balance">
            {about.title}
          </h2>
          <p className="mt-5 text-muted-foreground text-lg text-balance">{about.subtitle}</p>
        </div>
      </SectionReveal>

      <div className="mt-20 space-y-24">
        {about.rows.map((row, i) => (
          <SectionReveal key={row.title} y={40}>
            <div
              className={cn(
                "grid items-center gap-10 lg:gap-16",
                "lg:grid-cols-2",
                i % 2 === 1 && "lg:[&>div:first-child]:order-2",
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={row.image}
                  alt={row.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
              </div>
              <div>
                <div className="font-display text-6xl font-semibold text-primary/15">0{i + 1}</div>
                <h3 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-balance">{row.title}</h3>
                <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{row.text}</p>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
