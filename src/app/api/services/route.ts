import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const result = await db.query('SELECT * FROM services ORDER BY created_at DESC');
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch services:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await req.json();

        const result = await db.query(
            'INSERT INTO services (title, description, image_url, price, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [data.title, data.description, data.imageUrl, data.price ? parseFloat(data.price) : null, data.isActive]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Failed to create service:", error);
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}
