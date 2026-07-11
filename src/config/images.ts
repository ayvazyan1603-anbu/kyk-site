// Central image registry. Never hardcode image paths elsewhere.
// Replace files at these exact paths to swap visuals — filenames are fixed.

export const IMAGES = {
  logo: "/images/logo/logo.png",
  favicon: "/favicon.png",
  heroPoster: "/images/hero/hero.jpg",
  heroVideo: "/videos/hero.mp4", // optional; falls back to poster if missing
  coaches: [
    "/images/team/coach1.jpg",
    "/images/team/coach2.jpg",
    "/images/team/coach3.jpg",
  ],
  gallery: Array.from({ length: 12 }, (_, i) => `/images/gallery/gallery${i + 1}.jpg`),
  federation: Array.from({ length: 4 }, (_, i) => `/images/federation/federation${i + 1}.jpg`),
  reviews: Array.from({ length: 4 }, (_, i) => `/images/reviews/review${i + 1}.jpg`),
} as const;
