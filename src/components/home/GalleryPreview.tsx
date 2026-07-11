import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { galleryPreview, ctas } from "@/content";
import { IMAGES } from "@/config/images";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { cn } from "@/lib/utils";

export function GalleryPreview() {
  const shots = IMAGES.gallery.slice(0, 6);
  const spans = ["md:col-span-2 md:row-span-2", "", "", "", "md:col-span-2", ""];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionReveal>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-primary">Կադրեր</span>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-balance">
              {galleryPreview.title}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">{galleryPreview.subtitle}</p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors"
          >
            {ctas.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionReveal>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[220px]">
        {shots.map((src, i) => (
          <SectionReveal key={src} delay={i * 0.05}>
            <Link
              to="/gallery"
              className={cn(
                "group block h-full overflow-hidden rounded-2xl bg-secondary",
                spans[i],
              )}
            >
              <img
                src={src}
                alt="Մարզման պահ"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
            </Link>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
