import Hero from "@/components/Hero";
import ImageShowcase from "@/components/ImageShowcase";
import ScrollRevealStory from "@/components/ScrollRevealStory";
import Favorites from "@/components/Favorites";
import NitroBrew from "@/components/NitroBrew";
import ParallaxStory from "@/components/ParallaxStory";
import LocationsSection from "@/components/LocationsSection";
import GalleryGrid from "@/components/GalleryGrid";
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
      <ImageShowcase settings={settings} />
      <Favorites settings={settings} />
      <ScrollRevealStory settings={settings} />
      <NitroBrew settings={settings} />
      <ParallaxStory settings={settings} />
      <LocationsSection locations={locations} />
      <GalleryGrid settings={settings} />
    </main>
  );
}
