import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Favorites from "@/components/Favorites";
import NitroBrew from "@/components/NitroBrew";
import PressMarquee from "@/components/PressMarquee";
import ParallaxStory from "@/components/ParallaxStory";
import VisitUs from "@/components/VisitUs";
import Highlights from "@/components/Highlights";
import { getSettings } from "@/lib/settings";

export default async function Home() {
  const settings = await getSettings();

  return (
    <main className="flex min-h-screen flex-col">
      <Hero settings={settings} />
      <Features settings={settings} />
      <Favorites settings={settings} />
      <NitroBrew settings={settings} />
      <PressMarquee settings={settings} />
      <ParallaxStory settings={settings} />
      <VisitUs settings={settings} />
      <Highlights />
    </main>
  );
}
