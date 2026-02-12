import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const result = await db.query('SELECT key, value FROM settings');
        const settings = result.rows.reduce((acc, current) => {
            acc[current.key] = current.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const settings = await req.json();

        for (const [key, value] of Object.entries(settings)) {
            await db.query(
                'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT(key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP',
                [key, value as string]
            );
        }

        revalidatePath('/');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update settings:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
