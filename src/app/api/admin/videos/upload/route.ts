import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const VIDEOS_DIR = path.join(process.cwd(), "public", "videos");

export async function POST(req: Request) {
    try {
        // Ensure the videos directory exists
        if (!fs.existsSync(VIDEOS_DIR)) {
            fs.mkdirSync(VIDEOS_DIR, { recursive: true });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Only .mp4, .webm, .mov files are allowed" }, { status: 400 });
        }

        // Read the file and write to /public/videos/
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Sanitize filename
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = path.join(VIDEOS_DIR, safeName);
        
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({
            success: true,
            filename: safeName,
            url: `/videos/${safeName}`,
            size: buffer.length,
        });
    } catch (error) {
        console.error("Failed to upload video:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
