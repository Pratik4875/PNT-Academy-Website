"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, QrCode, Landmark, Landmark as Bank, User, Hash, ScanLine } from "lucide-react";
import Image from "next/image";

interface PaymentDetailsClientProps {
    details: {
        upiId?: string;
        upiQrCodeBase64?: string;
        accountName?: string;
        accountNumber?: string;
        ifscCode?: string;
        bankName?: string;
    }
}

export default function PaymentDetailsClient({ details }: PaymentDetailsClientProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, fieldId: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 2000);
    };

    // Construct UPI URL for the QR code
    const accountName = details.accountName || "PNT Academy";
    const upiUrl = details.upiId ? `upi://pay?pa=${details.upiId}&pn=${encodeURIComponent(accountName)}&cu=INR` : "";
    const qrCodeUrl = upiUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}&margin=10` : "";

    const hasBankDetails = details.accountNumber || details.ifscCode;

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                {/* ─── UPI QR CODE CARD (METALLIC) ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative group rounded-3xl p-1 overflow-hidden h-full"
                >
                    {/* Metallic Shimmer Border */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-transparent to-purple-400 dark:from-blue-600 dark:via-blue-900 dark:to-purple-900 opacity-50 block" />
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[calc(1.5rem-4px)] p-8 sm:p-10 border border-white/20 dark:border-white/10 shadow-2xl h-full flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
                            <QrCode className="w-8 h-8" />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Scan & Pay</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">Supports GPay, PhonePe, Paytm, and all UPI apps</p>

                        {details.upiQrCodeBase64 || details.upiId ? (
                            <div className="relative bg-white p-4 rounded-3xl shadow-lg border border-slate-100 mb-8 inline-block">
                                <div className="absolute top-0 right-0 -m-3 bg-blue-600 text-white p-2 rounded-full shadow-lg shadow-blue-600/30">
                                    <ScanLine className="w-4 h-4" />
                                </div>
                                <div className="relative w-48 h-48 rounded-2xl overflow-hidden mx-auto">
                                    {details.upiQrCodeBase64 ? (
                                        <Image
                                            src={details.upiQrCodeBase64}
                                            alt="Custom UPI QR Code"
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <Image
                                            src={qrCodeUrl}
                                            alt="Auto-generated UPI QR Code"
                                            fill
                                            className="object-contain"
                                        />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="w-48 h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-8 mx-auto">
                                <span className="text-slate-400 text-sm font-medium">No QR Code Available</span>
                            </div>
                        )}

                        <div className="mt-auto w-full space-y-3">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Or send direct to UPI ID</div>
                            <button
                                onClick={() => handleCopy(details.upiId || "", 'upi')}
                                className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all group/btn"
                            >
                                <div className="text-left font-mono font-medium text-slate-800 dark:text-slate-200 text-sm truncate pr-4">
                                    {details.upiId || "Not Configured"}
                                </div>
                                <div className={`p-2 rounded-lg transition-colors ${copiedField === 'upi' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-white dark:bg-slate-900 text-slate-400 group-hover/btn:text-blue-500'}`}>
                                    {copiedField === 'upi' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </div>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* ─── BANK DETAILS CARD (GLASS) ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-white dark:border-white/5 rounded-3xl p-8 sm:p-10 shadow-xl h-full"
                >
                    <div className="mb-10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500">
                            <Landmark className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Bank Transfer</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">NEFT / RTGS / IMPS</p>
                        </div>
                    </div>

                    {!hasBankDetails ? (
                        <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                            Bank details have not been configured yet.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {[
                                { id: 'name', label: 'Account Name', value: details.accountName, icon: User },
                                { id: 'bank', label: 'Bank Name', value: details.bankName, icon: Bank },
                                { id: 'acc', label: 'Account Number', value: details.accountNumber, icon: Hash, isMono: true },
                                { id: 'ifsc', label: 'IFSC Code', value: details.ifscCode, icon: ScanLine, isMono: true },
                            ].map((field) => (
                                <div key={field.id} className="group relative">
                                    <div className="flex items-center gap-2 mb-2">
                                        <field.icon className="w-4 h-4 text-slate-400" />
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{field.label}</label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            readOnly
                                            value={field.value || "Not Set"}
                                            className={`w-full bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${field.isMono ? 'font-mono text-sm tracking-wide' : 'font-medium'} ${!field.value ? 'opacity-50' : ''}`}
                                        />
                                        {field.value && (
                                            <button
                                                onClick={() => handleCopy(field.value!, field.id)}
                                                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${copiedField === field.id ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700'}`}
                                                title="Copy to clipboard"
                                            >
                                                {copiedField === field.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-12 bg-slate-100 dark:bg-slate-900/50 py-3 rounded-xl max-w-2xl mx-auto border border-slate-200 dark:border-white/5 mx-auto">
                After successful payment, please share a screenshot with our team or <a href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">contact us</a> for confirmation.
            </p>
        </div>
    );
}
