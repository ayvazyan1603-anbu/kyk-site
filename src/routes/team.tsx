import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Award, Shield, Star, Trophy } from "lucide-react";
import { meta, teamPage } from "@/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: meta.team.title },
      { name: "description", content: meta.team.description },
      { property: "og:title", content: meta.team.title },
      { property: "og:description", content: meta.team.description },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  const headCoach = teamPage.coaches[0];
  const otherCoaches = teamPage.coaches.slice(1);
  const [activeTouchIndex, setActiveTouchIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Page Header */}
      <section className="pt-36 sm:pt-40 pb-12 sm:pb-16 text-center px-6">
        <span className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">
          Մարզիչներ
        </span>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl font-semibold text-balance">
          {teamPage.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-base sm:text-lg text-balance">
          {teamPage.subtitle}
        </p>
      </section>

      {/* Head Coach Showcase Card (Top) */}
      {headCoach && (
        <section className="mx-auto max-w-6xl px-6 mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink via-ink/95 to-ink text-white shadow-2xl p-6 sm:p-10 lg:p-12"
          >
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary-glow/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Image Column */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl group">
                  <img
                    src={headCoach.image}
                    alt={headCoach.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      Գլխավոր մարզիչ
                    </span>
                    <span className="rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-medium text-white/90">
                      {headCoach.dan}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Column */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary-glow font-semibold">
                  <Shield className="h-4 w-4" />
                  {headCoach.position}
                </div>

                <h2 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
                  {headCoach.name}
                </h2>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Chip icon={<Award className="h-3.5 w-3.5" />}>{headCoach.dan}</Chip>
                  <Chip>{headCoach.experience}</Chip>
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary-glow font-semibold">
                    <Trophy className="h-4 w-4" />
                    Ձեռքբերումներ
                  </div>
                  <p className="mt-2 text-white/90 text-sm sm:text-base leading-relaxed">
                    {headCoach.achievements}
                  </p>
                </div>

                <p className="mt-6 text-white/70 text-sm sm:text-base leading-relaxed">
                  {headCoach.bio}
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 4 Coaches Grid (Bottom) - Info reveals on hover */}
      {otherCoaches.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              Մեր թիմը
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-semibold">
              Մարզչական կազմ
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCoaches.map((coach, i) => {
              const isTouchActive = activeTouchIndex === i;
              return (
                <motion.div
                  key={`${coach.name}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() =>
                    setActiveTouchIndex((prev) => (prev === i ? null : i))
                  }
                  className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-card shadow-lg cursor-pointer select-none"
                >
                  {/* Coach Photo */}
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient for default view */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent transition-opacity duration-300",
                      isTouchActive
                        ? "opacity-0"
                        : "opacity-100 group-hover:opacity-0"
                    )}
                  />

                  {/* Default Info (Bottom of card) */}
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 p-5 z-10 transition-all duration-300",
                      isTouchActive
                        ? "translate-y-4 opacity-0 pointer-events-none"
                        : "group-hover:translate-y-4 group-hover:opacity-0"
                    )}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
                      {coach.position}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-white">
                      {coach.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white/90 border border-white/20">
                        {coach.dan}
                      </span>
                      <span className="text-xs text-white/60">
                        {coach.experience}
                      </span>
                    </div>
                  </div>

                  {/* Hover / Tap Details Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-6 bg-ink/90 backdrop-blur-md transition-all duration-300",
                      isTouchActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-transform duration-300",
                        isTouchActive
                          ? "translate-y-0"
                          : "translate-y-3 group-hover:translate-y-0"
                      )}
                    >
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary-glow">
                        {coach.position}
                      </span>
                      <h3 className="mt-1 font-display text-2xl font-bold text-white">
                        {coach.name}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-primary/20 border border-primary/40 px-2.5 py-0.5 text-xs font-medium text-white">
                          {coach.dan}
                        </span>
                        <span className="rounded-full bg-white/10 border border-white/20 px-2.5 py-0.5 text-xs font-medium text-white/80">
                          {coach.experience}
                        </span>
                      </div>

                      <div className="mt-3 border-t border-white/10 pt-2.5">
                        <p className="text-[11px] font-semibold text-primary-glow uppercase tracking-wider">
                          Ձեռքբերումներ
                        </p>
                        <p className="text-xs text-white/90 mt-0.5 line-clamp-2">
                          {coach.achievements}
                        </p>
                      </div>

                      <p className="mt-2 text-xs text-white/70 line-clamp-3 leading-relaxed">
                        {coach.bio}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function Chip({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur">
      {icon}
      {children}
    </span>
  );
}
