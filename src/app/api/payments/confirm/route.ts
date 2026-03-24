import { NextRequest, NextResponse } from "next/server";
import { sendPaymentEmail } from "@/lib/utils/sendPaymentEmail";

/**
 * POST /api/payments/confirm
 * ──────────────────────────
 * Called when a client clicks "Raise Payment Ticket" and submits their query.
 * Sends an email notification to the admin with the ticket details.
 *
 * Body: { clientName, courseName, amount, queryMessage }
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { clientName, courseName, amount, queryMessage, ticketId } = body;

        // Basic validation
        if (!queryMessage || queryMessage.trim().length < 2) {
            return NextResponse.json(
                { error: "Please provide a valid query or issue description" },
                { status: 400 }
            );
        }

        // Send email notification to admin
        const emailResult = await sendPaymentEmail({
            clientName: clientName || "Not provided",
            courseName: courseName || "Not specified",
            amount: amount || "Not specified",
            queryMessage: queryMessage.trim(),
            ticketId: ticketId || "N/A",
            timestamp: new Date().toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                dateStyle: "long",
                timeStyle: "short",
            }),
        });

        return NextResponse.json({
            success: true,
            emailSent: emailResult.success,
            message: "Ticket submitted. We'll be in touch shortly.",
        });
    } catch (error) {
        console.error("[PAYMENT CONFIRM] Error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try WhatsApp instead." },
            { status: 500 }
        );
    }
}
