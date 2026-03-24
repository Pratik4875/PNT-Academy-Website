import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// This API auto-detects video files in /public/videos and returns them.
// It also supports POST to register new videos and DELETE to remove them.

const VIDEOS_DIR = path.join(process.cwd(), "public", "videos");
const SUPPORTED_EXTENSIONS = [".mp4", ".webm", ".mov"];

export async function GET() {
    try {
        // Ensure the videos directory exists
        if (!fs.existsSync(VIDEOS_DIR)) {
            fs.mkdirSync(VIDEOS_DIR, { recursive: true });
        }

        // Scan the directory for video files
        const files = fs.readdirSync(VIDEOS_DIR);
        const videos = files
            .filter((file) => SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase()))
            .map((file) => ({
                filename: file,
                url: `/videos/${file}`,
                size: fs.statSync(path.join(VIDEOS_DIR, file)).size,
                lastModified: fs.statSync(path.join(VIDEOS_DIR, file)).mtime.toISOString(),
            }))
            .sort((a, b) => a.filename.localeCompare(b.filename));

        return NextResponse.json(videos);
    } catch (error) {
        console.error("Failed to scan videos directory:", error);
        return NextResponse.json([], { status: 500 });
    }
}

// DELETE: Remove a video file from the /public/videos folder
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const filename = searchParams.get("filename");
        
        if (!filename) {
            return NextResponse.json({ error: "filename is required" }, { status: 400 });
        }

        // Security: prevent path traversal
        const safeName = path.basename(filename);
        const filePath = path.join(VIDEOS_DIR, safeName);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }

        fs.unlinkSync(filePath);
        return NextResponse.json({ success: true, deleted: safeName });
    } catch (error) {
        console.error("Failed to delete video:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
