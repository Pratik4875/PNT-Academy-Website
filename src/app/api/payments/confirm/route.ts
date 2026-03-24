import { NextRequest, NextResponse } from "next/server";
import { sendPaymentEmail } from "@/lib/utils/sendPaymentEmail";

/**
 * POST /api/payments/confirm
 * ──────────────────────────
 * Called when a client clicks "I've Paid" and submits their UTR number.
 * Sends an email notification to the admin with payment details.
 *
 * Body: { clientName, courseName, amount, utrNumber }
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { clientName, courseName, amount, utrNumber } = body;

        // Basic validation
        if (!utrNumber || utrNumber.trim().length < 6) {
            return NextResponse.json(
                { error: "Please provide a valid UTR/reference number (minimum 6 characters)" },
                { status: 400 }
            );
        }

        // Send email notification to admin
        const emailResult = await sendPaymentEmail({
            clientName: clientName || "Not provided",
            courseName: courseName || "Not specified",
            amount: amount || "Not specified",
            utrNumber: utrNumber.trim(),
            timestamp: new Date().toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                dateStyle: "long",
                timeStyle: "short",
            }),
        });

        return NextResponse.json({
            success: true,
            emailSent: emailResult.success,
            message: "Payment confirmation submitted. We'll verify and activate your enrollment shortly.",
        });
    } catch (error) {
        console.error("[PAYMENT CONFIRM] Error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try WhatsApp instead." },
            { status: 500 }
        );
    }
}
