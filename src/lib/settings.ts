import { db } from "@/lib/db";

export async function getSettings() {
    try {
        const result = await db.query('SELECT key, value FROM settings');
        return result.rows.reduce((acc, current) => {
            acc[current.key] = current.value;
            return acc;
        }, {} as Record<string, string>);
    } catch (error) {
        console.error("Failed to fetch settings from DB:", error);
        return {};
    }
}
