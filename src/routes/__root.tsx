import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StickyNav } from "../components/layout/StickyNav";
import { Footer } from "../components/layout/Footer";
import { ScrollToTop } from "../components/layout/ScrollToTop";
import { site } from "../content";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-semibold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Էջը չի գտնվել</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Դուք որոնում եք էջ, որը գոյություն չունի կամ տեղափոխվել է։
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Վերադառնալ գլխավոր
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Էջը չբեռնվեց</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ինչ-որ բան սխալ գնաց։ Փորձեք թարմացնել կամ վերադառնալ գլխավոր։
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Փորձել կրկին
          </button>
          <a
            href="/"
            className="rounded-full border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            Գլխավոր
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0F3D91" },
      { title: `${site.brand.short} · Կիոկուշին Կարատեի Ակումբ` },
      {
        name: "description",
        content:
          "Պրոֆեսիոնալ Կիոկուշին կարատեի դպրոց 5–14 տարեկան երեխաների համար։ Առաջին մարզումն անվճար է։",
      },
      { name: "author", content: site.brand.en },
      { property: "og:site_name", content: site.brand.en },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian:wght@400;500;600;700&family=Noto+Serif+Armenian:wght@500;600;700&display=swap",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/icons/icon-192.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsClub",
          name: site.brand.en,
          alternateName: site.brand.short,
          description: "Kyokushin karate club for children 5–14 in Yerevan, Armenia.",
          telephone: site.contact.phoneTel,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.contact.address,
            addressLocality: "Yerevan",
            addressCountry: "AM",
          },
          sameAs: [
            `https://instagram.com/${site.contact.instagramHandle}`,
            `https://t.me/${site.contact.telegramHandle}`,
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="hy">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <StickyNav />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </QueryClientProvider>
  );
}
