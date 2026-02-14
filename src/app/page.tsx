import Hero from "@/components/Hero";
import ImageShowcase from "@/components/ImageShowcase";
import ScrollRevealStory from "@/components/ScrollRevealStory";
import Favorites from "@/components/Favorites";
import NitroBrew from "@/components/NitroBrew";
import ParallaxStory from "@/components/ParallaxStory";
import LocationsSection from "@/components/LocationsSection";
import GalleryGrid from "@/components/GalleryGrid";
import Features from "@/components/Features";
import PressMarquee from "@/components/PressMarquee";
import VisitUs from "@/components/VisitUs";
import Journal from "@/components/Journal";
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

async function getPosts() {
  try {
    const result = await db.query("SELECT * FROM posts WHERE published = true ORDER BY created_at DESC LIMIT 3");
    return result.rows.map(row => ({
      ...row,
      coverImage: row.cover_image || "/images/placeholder.png"
    }));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function Home() {
  const settings = await getSettings();
  const locations = await getLocations();
  const posts = await getPosts();

  return (
    <main className="flex min-h-screen flex-col">
      {settings.section_hero_visible !== "false" && <Hero settings={settings} />}
      {settings.section_showcase_visible !== "false" && <ImageShowcase settings={settings} />}
      {settings.section_features_visible !== "false" && <Features settings={settings} />}
      {settings.section_favorites_visible !== "false" && <Favorites settings={settings} />}
      {settings.section_scroll_visible !== "false" && <ScrollRevealStory settings={settings} />}
      {settings.section_nitro_visible !== "false" && <NitroBrew settings={settings} />}
      {settings.section_press_visible !== "false" && <PressMarquee settings={settings} />}
      {settings.section_journal_visible !== "false" && <Journal posts={posts} />}
      {settings.section_parallax_visible !== "false" && <ParallaxStory settings={settings} />}
      {settings.section_locations_visible !== "false" && <LocationsSection locations={locations} />}
      {settings.section_visit_visible !== "false" && <VisitUs settings={settings} />}
      {settings.section_gallery_visible !== "false" && <GalleryGrid settings={settings} />}
    </main>
  );
}
