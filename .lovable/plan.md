
# ԱՐԵՍ Կիոկուշին Կարատեի Ակումբ — Website Plan (v2)

Premium, fully-Armenian marketing site for **ARES Kyokushin Karate Club** targeting parents of children 5–14. Built on the project's existing TanStack Start + React + TypeScript + Tailwind v4 stack, using Motion for animations. All visible text in Armenian.

**Emotional goal:** Not a typical sports-club site — a premium academy. Large cinematic imagery, generous white space, smooth animations, elegant typography, Apple/Nike-inspired layout. Parents should immediately feel this is a place where children grow stronger, more disciplined, and more confident — physically and mentally.

## Global decisions

- **Brand name everywhere:** `ԱՐԵՍ Կիոկուշին Կարատեի Ակումբ` (short form `ԱՐԵՍ`). Footer: `© 2026 ARES Kyokushin Karate Club`.
- **Logo:** generated wordmark/kanji lockup for "ԱՐԵՍ" saved as `/public/images/logo/logo.png` — user can swap file.
- **All copy in one file:** `src/content.ts` — every headline, paragraph, label, stat, FAQ, testimonial, coach bio, nav item, meta title/description. Components import from `content.ts` only. No text hardcoded in components.
- **No AI-generated photos of people.** Coach, child, and training images are placeholder blocks (solid brand color + kanji watermark + filename hint) with fixed filenames so the user drops in real photos later. Only non-people assets (logo, textures, favicon, gallery abstracts) may be generated.
- **Stack adjustment:** brief said Next.js; project uses TanStack Start — same SSR/SEO capabilities. Motion (Framer Motion successor) for animations, `lucide-react` for icons, `react-hook-form` + `zod` for the form.

## Routes

| File | URL |
|---|---|
| `src/routes/index.tsx` | `/` |
| `src/routes/team.tsx` | `/team` |
| `src/routes/register.tsx` | `/register` |
| `src/routes/contact.tsx` | `/contact` |
| `src/routes/gallery.tsx` | `/gallery` |
| `src/routes/api/register.ts` | Telegram submission |

Each leaf route defines its own `head()` — Armenian title, description, og:title, og:description, og:url, canonical.

## Home page (new order)

1. **Hero** — full-screen. Uses `<video autoplay muted loop playsinline poster="/images/hero/hero.jpg" src="/videos/hero.mp4">`; browser gracefully falls back to the poster image if the video file is missing. Dark gradient overlay, ARES logo, headline, subtitle, two CTAs (`Գրանցվել մարզման` / `Առաջին մարզումն ԱՆՎՃԱՐ է`), animated scroll indicator.
2. **Ինչու՞ ընտրել Կիոկուշինը** — 8 icon cards with premium hover. → **CTA banner**: `Գրանցվել անվճար մարզմանը`.
3. **Մեր մարզումների մասին** — alternating image/text, parallax reveals.
4. **Ինչպե՞ս է անցնում առաջին մարզումը** — 5-step vertical stepper: `Ծանոթություն` → `Թեթև մարզում` → `Առաջին տեխնիկան` → `Ծանոթություն մարզչի հետ` → `Հետադարձ կապ ծնողին`.
5. **Մեր Ֆեդերացիան** — timeline: գոտու քննություններ, մրցումներ, առաջնություններ, հավաք-մարզումներ, սեմինարներ, ցուցադրական միջոցառումներ. → **CTA banner**: `Գրանցվել անվճար մարզմանը`.
6. **Countdown** — `Մինչև նոր խմբի մեկնարկը` — large elegant countdown to a target date defined in `content.ts` (`nextGroupStart`). Auto-recomputes days/hours/minutes client-side.
7. **Պատկերասրահ preview** — 6-image masonry + `Դիտել բոլորը`.
8. **Վիճակագրություն** — 4 animated counters (values in `content.ts`).
9. **Կարծիքներ** — testimonial slider.
10. **Հաճախ տրվող հարցեր** — accordion FAQ (radix), 6–8 Armenian Q&A pairs (price, age, uniform, safety, schedule, first lesson, competitions, parents watching). → final **CTA banner**.

## Team page

Cinematic full-viewport sticky-background scroll for 3 coaches (`coach1.jpg`, `coach2.jpg`, `coach3.jpg` — placeholder blocks). Motion `useScroll`/`useTransform` crossfades backgrounds; foreground shows name, position, Dan, experience, achievements, biography (all from `content.ts`).

## Register page

- Glass card form: Ծնողի ԱԱՀ, Երեխայի ԱԱՀ, Երեխայի տարիք, Հեռախոսահամար, Հաղորդագրություն (opt).
- Zod validation + Armenian error messages.
- Submits to `POST /api/register`, which uses the **Telegram connector** (linked via `standard_connectors--connect`) to call `/telegram/sendMessage` with `LOVABLE_API_KEY` + `TELEGRAM_API_KEY`. `TELEGRAM_CHAT_ID` stored via `add_secret`.
- Success: cinematic fade-in ✓ + Armenian thank-you.
- Below form, three large contact CTAs — **each parent picks their channel**:
  - `Զանգահարել հիմա` → `tel:`
  - `Գրել Telegram-ում` → `https://t.me/<handle>`
  - `Գրել WhatsApp-ում` → `https://wa.me/<intl-number>`

## Contact page

Google Maps embed, address, phone, Instagram, Telegram, WhatsApp, working hours, plus the same 3-CTA row.

## Gallery page

Grid of all photos. Clicking opens a **premium lightbox**: dark backdrop, spring-scale entrance, keyboard arrows + **swipe navigation** (touch drag threshold), close on backdrop/Esc, image counter, preloads neighbors.

## Shared

- **Sticky nav** in `__root.tsx`, glass-blur on scroll: `Գլխավոր · Մեր թիմը · Գրանցում · Պատկերասրահ · Կապ` + right-side CTA `Անվճար մարզում`.
- **Footer**: logo, quick nav, phone, WhatsApp, Telegram, Instagram, `© 2026 ARES Kyokushin Karate Club`.
- **PageLoader** splash (ARES kanji fade), **ScrollToTop** button after 400px, `scroll-behavior: smooth`.
- **`SectionReveal`** wrapper (Motion) for fade/slide-up on view.
- **`CtaBanner`** reusable component (used after Why / Federation / FAQ).

## Admin-friendly assets (fixed filenames)

```
public/
  videos/hero.mp4                        # optional; hero video slot
  images/
    logo/logo.png                        # generated wordmark
    hero/hero.jpg                        # video poster fallback
    team/coach1.jpg coach2.jpg coach3.jpg
    gallery/gallery1.jpg … gallery12.jpg
    federation/federation1.jpg … federation4.jpg
    reviews/review1.jpg … review4.jpg
  favicon.png                            # brand favicon
  manifest.webmanifest                   # installable (manifest-only PWA)
  icons/icon-192.png, icon-512.png       # PWA icons
```

Human placeholders (coaches, gallery, reviews, federation) are neutral branded blocks — never AI-generated faces. `src/config/images.ts` centralizes every path; components never string-concatenate URLs.

## Telegram wiring

1. Prompt `standard_connectors--connect` (`telegram`).
2. Ask user for `TELEGRAM_CHAT_ID`, store via `add_secret`.
3. Server route validates input (Zod), formats Armenian message, POSTs to `https://connector-gateway.lovable.dev/telegram/sendMessage` with `Authorization: Bearer $LOVABLE_API_KEY` + `X-Connection-Api-Key: $TELEGRAM_API_KEY`. Errors surface provider status/body; success returns `{ ok: true }`.

## PWA (manifest-only, installable)

- `public/manifest.webmanifest` with name, short_name (ԱՐԵՍ), theme_color `#0F3D91`, background_color, `display: "standalone"`, icons.
- `<link rel="manifest">`, `theme-color`, `apple-touch-icon` in `__root.tsx` head.
- No service worker (per Lovable preview safety default).

## SEO

- `<html lang="hy">`.
- Per-route Armenian `title`, `description`, `og:title`, `og:description`, `og:url` (relative), `canonical` on leaves.
- `og:type: website` sitewide; Organization JSON-LD in `__root.tsx` (name, url, sameAs socials, telephone).
- No `og:image` yet (avoid a generic placeholder degrading the preview); wire in once the user provides a real hero photo.
- Semantic HTML, single H1 per page, Armenian `alt` text, lazy images.

## Design tokens (`src/styles.css`)

- `--primary` ≈ `#0F3D91` (oklch), white, black; `--primary-glow`, `--gradient-hero`, `--shadow-premium`, `--radius: 1rem`.
- Fonts loaded via `<link>` in `__root.tsx` head (Armenian-supporting): display `Noto Serif Armenian`, sans `Noto Sans Armenian`. Registered under `--font-display`, `--font-sans` in `@theme`.
- `@utility glass` for glassmorphism surfaces.

## New/changed files

```
src/content.ts                         # ALL Armenian copy + config
src/config/images.ts                   # all asset paths
src/components/
  layout/{StickyNav,Footer,PageLoader,ScrollToTop,SectionReveal,CtaBanner}.tsx
  home/{Hero,WhyKyokushin,AboutTrainings,FirstLessonSteps,Federation,Countdown,GalleryPreview,Stats,Reviews,Faq}.tsx
  team/CoachSection.tsx
  register/{RegisterForm,ContactCtas,SuccessAnimation}.tsx
  gallery/{GalleryGrid,Lightbox}.tsx
  contact/ContactInfo.tsx
src/routes/{index,team,register,contact,gallery}.tsx
src/routes/api/register.ts
public/{manifest.webmanifest, favicon.png, icons/*, images/**, videos/.gitkeep}
```

Modified: `src/routes/__root.tsx` (fonts, nav, footer, `<html lang="hy">`, manifest links, JSON-LD), `src/styles.css` (tokens, fonts registration, utilities), `package.json` (add `motion`, `zod`, `react-hook-form`, `@hookform/resolvers`).

## Build sequence

1. Install deps.
2. Connect Telegram; request `TELEGRAM_CHAT_ID` secret.
3. Update `styles.css` tokens + fonts + `__root.tsx` (lang, head, nav, footer, manifest, JSON-LD).
4. Generate **non-people** assets only: logo, favicon, PWA icons, abstract gallery textures. Write neutral branded placeholder blocks for coach/child/training slots with correct filenames.
5. Build `src/content.ts` + `src/config/images.ts` + shared layout components (nav, footer, loader, scroll-to-top, reveal, CTA banner).
6. Build all home sections in the new order; assemble `/`.
7. Build `/team` cinematic scroll.
8. Build `/register` form + `/api/register` Telegram route + success animation + 3-channel contact CTAs.
9. Build `/gallery` (grid + swipeable lightbox) and `/contact`.
10. Verify: preview home + mobile viewport, check build, spot-check Armenian rendering.
