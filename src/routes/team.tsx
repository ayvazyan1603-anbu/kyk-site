import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { meta, teamPage } from "@/content";

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
  return (
    <>
      <section className="pt-40 pb-16 text-center px-6">
        <span className="text-xs uppercase tracking-[0.35em] text-primary">Մարզիչներ</span>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl font-semibold text-balance">
          {teamPage.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground text-lg text-balance">
          {teamPage.subtitle}
        </p>
      </section>

      {teamPage.coaches.map((c, i) => (
        <CoachSection key={c.name} coach={c} index={i} />
      ))}
    </>
  );
}

function CoachSection({
  coach,
  index,
}: {
  coach: (typeof teamPage.coaches)[number];
  index: number;
}) {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ink text-white">
      <div className="sticky top-0 h-[100svh] w-full">
        <img
          src={coach.image}
          alt={coach.name}
          loading={index === 0 ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-6xl font-semibold text-primary-glow/70">
                0{index + 1}
              </span>
              <span className="text-xs uppercase tracking-[0.35em] text-white/60">
                {coach.position}
              </span>
            </div>
            <h2 className="mt-4 font-display text-5xl sm:text-7xl font-semibold text-balance">
              {coach.name}
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              <Chip>{coach.dan}</Chip>
              <Chip>{coach.experience}</Chip>
            </div>
            <p className="mt-6 text-white/85 leading-relaxed text-lg text-balance">
              {coach.achievements}
            </p>
            <p className="mt-4 text-white/70 leading-relaxed text-balance">{coach.bio}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur">
      {children}
    </span>
  );
}
