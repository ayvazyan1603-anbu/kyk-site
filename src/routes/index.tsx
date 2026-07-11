import { createFileRoute } from "@tanstack/react-router";
import { meta } from "@/content";
import { Hero } from "@/components/home/Hero";
import { WhyKyokushin } from "@/components/home/WhyKyokushin";
import { AboutTrainings } from "@/components/home/AboutTrainings";
import { FirstLessonSteps } from "@/components/home/FirstLessonSteps";
import { Federation } from "@/components/home/Federation";
import { Countdown } from "@/components/home/Countdown";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Stats } from "@/components/home/Stats";
import { Reviews } from "@/components/home/Reviews";
import { Faq } from "@/components/home/Faq";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: meta.home.title },
      { name: "description", content: meta.home.description },
      { property: "og:title", content: meta.home.title },
      { property: "og:description", content: meta.home.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <WhyKyokushin />
      <CtaBanner />
      <AboutTrainings />
      <FirstLessonSteps />
      <Federation />
      <CtaBanner />
      <Countdown />
      <GalleryPreview />
      <Stats />
      <Reviews />
      <Faq />
      <CtaBanner />
    </>
  );
}
