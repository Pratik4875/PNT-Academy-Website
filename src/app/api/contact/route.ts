import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Enquiry from "@/lib/models/Enquiry";
import { getAdminSettings } from "@/lib/actions/db";

// ─── Rate Limiter (Contact Form) ───────────────────────────────────
const contactRateMap = new Map<string, { count: number; resetAt: number }>();
const CONTACT_RATE_LIMIT = 5;    // max submissions per window
const CONTACT_RATE_WINDOW = 3600_000; // 1-hour window

function isContactRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = contactRateMap.get(ip);
    if (!entry || now > entry.resetAt) {
        contactRateMap.set(ip, { count: 1, resetAt: now + CONTACT_RATE_WINDOW });
        return false;
    }
    entry.count++;
    return entry.count > CONTACT_RATE_LIMIT;
}

// Cleanup stale entries every 10 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of contactRateMap) {
        if (now > entry.resetAt) contactRateMap.delete(ip);
    }
}, 600_000);

// ─── Sanitizer ─────────────────────────────────────────────────────
function sanitize(str: string, maxLen: number = 500): string {
    return str
        .replace(/<[^>]*>/g, "")   // strip HTML tags
        .replace(/[<>'"]/g, "")     // strip dangerous chars
        .trim()
        .slice(0, maxLen);
}

// ─── Google Sheets Auto-Sync ───────────────────────────────────────
async function syncToGoogleSheets(data: {
    name: string; email: string; phone: string; subject: string; message: string;
}, webhookUrl: string) {
    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject,
                message: data.message,
                timestamp: new Date().toISOString(),
            }),
        });
    } catch (err) {
        // Non-blocking — don't fail the form submission if Sheets sync fails
        console.warn("[SHEETS SYNC] Failed:", err);
    }
}

// ─── POST: Submit Enquiry ──────────────────────────────────────────
export async function POST(req: Request) {
    try {
        // Rate Limiting
        const forwarded = req.headers.get("x-forwarded-for");
        const ip = forwarded?.split(",")[0]?.trim() || "unknown";

        if (isContactRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many submissions. Please try again in an hour." },
                { status: 429 }
            );
        }

        const body = await req.json();

        // Honeypot check — if the hidden "website" field is filled, it's a bot
        if (body.website) {
            // Silently accept but don't save — bots think it worked
            return NextResponse.json({ success: true }, { status: 201 });
        }

        const name = sanitize(body.name || "", 100);
        const email = sanitize(body.email || "", 150);
        const phone = sanitize(body.phone || "", 20);
        const subject = sanitize(body.subject || "General", 100);
        const message = sanitize(body.message || "", 1000);

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // Basic email format check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        await connectMongo();
        await Enquiry.create({ name, email, phone, subject, message });

        // Auto-sync to Google Sheets if webhook is configured
        try {
            const settings = await getAdminSettings();
            if (settings?.sheetsWebhookUrl) {
                syncToGoogleSheets({ name, email, phone, subject, message }, settings.sheetsWebhookUrl);
            }
        } catch {
            // Don't block form submission if settings fetch fails
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Failed to send enquiry. Please try again." },
            { status: 500 }
        );
    }
}

// ─── GET: Fetch Enquiries ──────────────────────────────────────────
export async function GET() {
    try {
        await connectMongo();
        const items = await Enquiry.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(JSON.parse(JSON.stringify(items)));
    } catch {
        return NextResponse.json({ error: "Failed to fetch enquiries." }, { status: 500 });
    }
}
