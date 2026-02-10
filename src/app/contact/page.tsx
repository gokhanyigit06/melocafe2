import { db } from "@/lib/db";
import ContactClient from "./ContactClient";

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

export default async function ContactPage() {
    const settings = await getSettings();
    return <ContactClient settings={settings} />;
}
