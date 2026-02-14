import { db } from "@/lib/db";
import ContactClient from "./ContactClient";

export const dynamic = "force-dynamic";

async function getSettings() {
    try {
        const result = await db.query("SELECT key, value FROM settings");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result.rows.reduce((acc: any, row: any) => {
            acc[row.key] = row.value;
            return acc;
        }, {});
    } catch {
        return {};
    }
}

export default async function ContactPage() {
    const settings = await getSettings();
    return <ContactClient settings={settings} />;
}
