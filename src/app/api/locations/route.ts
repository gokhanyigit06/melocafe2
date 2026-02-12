import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const result = await db.query("SELECT * FROM locations ORDER BY created_at DESC");
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch locations:", error);
        return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, address, description, image_url, directions_url, tag } = body;

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        await db.query(
            "INSERT INTO locations (title, address, description, image_url, directions_url, tag) VALUES (?, ?, ?, ?, ?, ?)",
            [title, address, description, image_url, directions_url, tag]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to create location:", error);
        return NextResponse.json({ error: "Failed to create location" }, { status: 500 });
    }
}
