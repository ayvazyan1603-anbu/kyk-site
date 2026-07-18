import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, ctas } from "@/content";
import { IMAGES } from "@/config/images";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: nav.home },
  { to: "/team", label: nav.team },
  { to: "/gallery", label: nav.gallery },
  { to: "/contact", label: nav.contact },
] as const;

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-300",
          scrolled ? "glass py-2 shadow-[0_10px_40px_-20px_rgba(15,61,145,0.35)]" : "bg-white py-3 shadow-sm",
        )}
      >
        <Link to="/" className="flex items-center gap-3 group" aria-label="Dragon Dojo">
          <img
            src={IMAGES.logo}
            alt="Dragon Dojo"
            width={44}
            height={44}
            className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
          />
          <span className="hidden sm:block font-display text-lg font-semibold tracking-tight text-foreground">
            Dragon Dojo
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-foreground/70" }}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/register"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.03] hover:shadow-primary/40"
          >
            {ctas.freeShort}
          </Link>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-4 mt-2 glass rounded-2xl p-4 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-foreground/80 hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-base font-semibold text-primary-foreground"
            >
              {ctas.freeShort}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
