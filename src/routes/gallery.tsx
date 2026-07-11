import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { meta, galleryPage } from "@/content";
import { IMAGES } from "@/config/images";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: meta.gallery.title },
      { name: "description", content: meta.gallery.description },
      { property: "og:title", content: meta.gallery.title },
      { property: "og:description", content: meta.gallery.description },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);

  const open = useCallback((i: number) => setActive(i), []);
  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((v) => (v === null ? v : (v - 1 + IMAGES.gallery.length) % IMAGES.gallery.length)),
    [],
  );
  const next = useCallback(
    () => setActive((v) => (v === null ? v : (v + 1) % IMAGES.gallery.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, prev, next]);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -80) next();
    else if (info.offset.x > 80) prev();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pt-40 pb-24">
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.35em] text-primary">Կադրեր</span>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl font-semibold text-balance">
          {galleryPage.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground text-lg text-balance">
          {galleryPage.subtitle}
        </p>
      </div>

      <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-4">
        {IMAGES.gallery.map((src, i) => (
          <motion.button
            key={src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            onClick={() => open(i)}
            className="group mb-4 block w-full overflow-hidden rounded-2xl bg-secondary break-inside-avoid"
          >
            <img
              src={src}
              alt={`Կադր ${i + 1}`}
              loading="lazy"
              className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 backdrop-blur-xl"
            onClick={close}
          >
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Փակել"
              className="absolute top-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Նախորդ"
              className="absolute left-4 sm:left-8 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Հաջորդ"
              className="absolute right-4 sm:right-8 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.img
              key={IMAGES.gallery[active]}
              src={IMAGES.gallery[active]}
              alt={`Կադր ${active + 1}`}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={onDragEnd}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl cursor-grab active:cursor-grabbing"
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80">
              {active + 1} / {IMAGES.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
