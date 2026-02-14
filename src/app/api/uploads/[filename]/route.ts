
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ filename: string }> } // Correct type for Next.js 15+
) {
    const { filename } = await context.params;

    if (!filename) {
        return new NextResponse("Filename is required", { status: 400 });
    }

    // Security: Prevent directory traversal
    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
        return new NextResponse("Invalid filename", { status: 400 });
    }

    // Check persistent data directory first (Docker volume), then public/uploads
    const dataPath = path.join(process.cwd(), "data/uploads", filename);
    const publicPath = path.join(process.cwd(), "public/uploads", filename);

    const filePath = existsSync(dataPath) ? dataPath : publicPath;

    if (!existsSync(filePath)) {
        return new NextResponse("File not found", { status: 404 });
    }

    try {
        const fileBuffer = await readFile(filePath);
        const ext = path.extname(filename).toLowerCase();

        // Simple mime-type mapping
        const mimeTypes: Record<string, string> = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".webp": "image/webp",
            ".gif": "image/gif",
            ".svg": "image/svg+xml",
            ".mp4": "video/mp4",
        };

        const contentType = mimeTypes[ext] || "application/octet-stream";

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error reading file:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
