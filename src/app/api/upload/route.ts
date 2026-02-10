import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import path from "path";
import { writeFile } from "fs/promises";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");
        const nameWithoutExt = path.parse(filename).name;

        const isVideo = file.type.startsWith("video/");
        let finalFilename: string;
        let finalBuffer: Buffer;
        let finalType: string;

        if (isVideo) {
            finalFilename = `${nameWithoutExt}-${Date.now()}${path.extname(filename)}`;
            finalBuffer = buffer;
            finalType = file.type;
        } else {
            // Convert to WebP and resize if too large
            const optimizedBuffer = await sharp(buffer)
                .resize({ width: 1920, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();

            finalFilename = `${nameWithoutExt}-${Date.now()}.webp`;
            finalBuffer = optimizedBuffer;
            finalType = "image/webp";
        }

        const filePath = path.join(process.cwd(), "public/uploads", finalFilename);
        await writeFile(filePath, finalBuffer);

        // Save to DB using raw SQL
        const result = await db.query(
            'INSERT INTO media (name, url, type, size) VALUES ($1, $2, $3, $4) RETURNING *',
            [finalFilename, `/uploads/${finalFilename}`, finalType, finalBuffer.length]
        );

        const media = result.rows[0];

        return NextResponse.json({ success: true, url: media.url, id: media.id });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }
}
