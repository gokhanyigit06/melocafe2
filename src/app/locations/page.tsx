import { db } from "@/lib/db";
import LocationsClient from "./LocationsClient";

async function getLocations() {
    try {
        const result = await db.query("SELECT * FROM locations WHERE is_active = 1 ORDER BY created_at DESC");
        return result.rows;
    } catch (e) {
        console.error(e);
        return [];
    }
}

async function getSettings() {
    try {
        const result = await db.query("SELECT key, value FROM settings");
        return result.rows.reduce((acc: any, row: any) => {
            acc[row.key] = row.value;
            return acc;
        }, {});
    } catch (e) {
        return {};
    }
}

export default async function LocationsPage() {
    const locations = await getLocations();
    const settings = await getSettings();

    return <LocationsClient initialLocations={locations} settings={settings} />;
}
