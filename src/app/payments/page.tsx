import Link from "next/link";
import { ArrowLeft, Copy, CheckCircle2, ShieldCheck, Building2, Landmark, CreditCard, QrCode } from "lucide-react";
import connectMongo from "@/lib/mongodb";
import AdminSettings from "@/lib/models/AdminSettings";
import PageHeader from "@/components/PageHeader";
import PaymentDetailsClient from "@/app/payments/PaymentDetailsClient";

export const metadata = {
    title: "Secure Payments | PNT Academy",
    description: "Make secure, zero-commission payments directly to PNT Academy via UPI or Bank Transfer.",
};

export const revalidate = 60; // Revalidate every minute

async function getPaymentDetails() {
    try {
        await connectMongo();
        const settings = await AdminSettings.findOne({}).lean();
        return settings?.paymentDetails || null;
    } catch (e) {
        console.error("Failed to fetch payment details:", e);
        return null;
    }
}

export default async function PaymentsPage() {
    const paymentDetails = await getPaymentDetails();

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/20 pointer-events-none -z-10" />
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="pt-32 pb-16 px-6 max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 backdrop-blur-md"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>

                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight leading-tight">
                            Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Payments</span>
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto text-lg">
                            Direct, zero-commission payments to PNT Academy. Scan the QR code or use our official banking details below.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium bg-emerald-50 dark:bg-emerald-500/10 inline-flex px-4 py-2 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                        <ShieldCheck className="w-4 h-4" /> 256-bit SSL Encrypted & Verified
                    </div>
                </div>

                {!paymentDetails || (!paymentDetails.upiId && !paymentDetails.accountNumber) ? (
                    <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl max-w-2xl mx-auto">
                        <Building2 className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-6" />
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Payment Details Unavailable</h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            The academy administrator has not configured payment details yet. Please contact support.
                        </p>
                    </div>
                ) : (
                    <PaymentDetailsClient details={paymentDetails} />
                )}
            </div>
        </main>
    );
}
