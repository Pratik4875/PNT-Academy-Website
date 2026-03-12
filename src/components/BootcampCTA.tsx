"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

export default function BootcampCTA() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 border-t border-white/10">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] -top-40 -left-20"></div>
                <div className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] bottom-10 -right-20"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-10 md:p-16 rounded-[3rem] shadow-2xl"
                >
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-sm tracking-wider uppercase rounded-full mb-6 shadow-lg transform -rotate-2">
                        Limited Time Offer
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md">
                        Ready to Ignite Innovation?
                    </h2>
                    <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Experience the future of education firsthand. Book a free, no-obligation demo or sign up for our upcoming bootcamp.
                    </p>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="group relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-indigo-900 bg-white rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white via-blue-50 to-white group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:via-white group-hover:to-blue-100 transition-all"></div>
                        <span className="relative flex items-center gap-2">
                            Book a Free Demo / Bootcamp
                            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                    </button>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800"
                        >
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Register for Bootcamp</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500 dark:text-slate-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="h-[60vh] md:h-[70vh] w-full bg-slate-50 dark:bg-slate-950 p-4">
                                {/* Google Form Iframe Placeholder. Admin can replace this URL later. */}
                                <iframe
                                    src="https://docs.google.com/forms/d/e/1FAIpQLScX_placeholder_form_link/viewform?embedded=true"
                                    className="w-full h-full border-0 rounded-xl"
                                    title="Bootcamp Registration Form"
                                >
                                    Loading…
                                </iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
