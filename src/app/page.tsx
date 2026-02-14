import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Favorites from "@/components/Favorites";
import NitroBrew from "@/components/NitroBrew";
import PressMarquee from "@/components/PressMarquee";
import ParallaxStory from "@/components/ParallaxStory";
import LocationsSection from "@/components/LocationsSection";
import Highlights from "@/components/Highlights";
import { getSettings } from "@/lib/settings";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getLocations() {
  try {
    const result = await db.query("SELECT * FROM locations WHERE is_active = true ORDER BY created_at DESC");
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return [];
  }
}

export default async function Home() {
  const settings = await getSettings();
  const locations = await getLocations();

  return (
    <main className="flex min-h-screen flex-col">
      <Hero settings={settings} />
      <Features settings={settings} />
      <Favorites settings={settings} />
      <NitroBrew settings={settings} />
      <PressMarquee settings={settings} />
      <ParallaxStory settings={settings} />
      <LocationsSection locations={locations} />
      <Highlights />
    </main>
  );
}
