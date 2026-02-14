import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        // 1. Get media info from DB
        const result = await db.query('SELECT * FROM media WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Media not found" }, { status: 404 });
        }

        const media = result.rows[0];
        const filename = media.url.split('/').pop();

        // 2. Delete from DB
        await db.query('DELETE FROM media WHERE id = $1', [id]);

        // 3. Try to delete from filesystem
        if (filename) {
            const uploadDirs = [
                path.join(process.cwd(), "data/uploads"),
                path.join(process.cwd(), "public/uploads")
            ];

            for (const dir of uploadDirs) {
                const filePath = path.join(dir, filename);
                try {
                    await fs.unlink(filePath);
                } catch (err) {
                    // Ignore errors (file might not exist)
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete media error:", error);
        return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
    }
}
