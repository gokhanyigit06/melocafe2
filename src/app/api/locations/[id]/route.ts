import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const result = await db.query("SELECT * FROM locations WHERE id = ?", [id]);
        if (result.rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(result.rows[0]);
    } catch {
        return NextResponse.json({ error: "Failed to fetch location" }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const body = await req.json();
        const { title, address, description, image_url, directions_url, tag, is_active } = body;

        await db.query(
            "UPDATE locations SET title = ?, address = ?, description = ?, image_url = ?, directions_url = ?, tag = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            [title, address, description, image_url, directions_url, tag, is_active ? 1 : 0, id]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update location:", error);
        return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        await db.query("DELETE FROM locations WHERE id = ?", [id]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Failed to delete location" }, { status: 500 });
    }
}
