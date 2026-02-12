import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const result = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
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
            'INSERT INTO posts (title, slug, content, published, cover_image, excerpt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [data.title, data.slug, data.content, data.published, data.coverImage, data.excerpt]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Failed to create post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
