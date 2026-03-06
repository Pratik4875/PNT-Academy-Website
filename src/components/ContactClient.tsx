"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import { Send, MapPin, Mail, Phone, CheckCircle, Loader2, MessageCircle, Briefcase, ExternalLink, Instagram, Linkedin, Twitter, Youtube, ChevronDown } from "lucide-react";

interface Faq {
    _id: string;
    question: string;
    answer: string;
    order: number;
}

const SUBJECTS = [
    "Robotics Lab Setup",
    "School Partnership",
    "Online / Offline Courses",
    "Workshop Enquiry",
    "Army / Navy Internship",
    "General",
];

const DETAILS = [
    {
        icon: MapPin,
        label: "Address",
        lines: ["Plot no. A115, Infinity Business Park,", "MIDC, Dombivli East, Dombivli,", "Maharashtra 421203"],
        color: "text-blue-500",
        href: "https://www.google.com/maps?q=Plot+no.+A115,+Infinity+Business+Park,+MIDC,+Dombivli+East,+Dombivli,+Maharashtra+421203",
    },
    {
        icon: Mail,
        label: "Email",
        lines: ["contact@pntacademy.com", "pnt-trainings@pntacademy.com"],
        color: "text-purple-500",
        href: "mailto:contact@pntacademy.com?subject=Website%20Enquiry&body=Hi%20PNT%20Academy,%0A%0AI%20am%20interested%20in%20learning%20more%20about...",
    },
    {
        icon: Phone,
        label: "Phone",
        lines: ["+91 93260 14648", "+91 81691 96916"],
        color: "text-teal-500",
        href: "tel:+919326014648",
    },
    {
        icon: MessageCircle,
        label: "WhatsApp Bot",
        lines: ["Chat with Sales / Support"],
        color: "text-green-500",
        href: "https://wa.me/919326014648?text=Hi%20PNT%20Academy,%20I%20have%20an%20enquiry",
    },
];

export default function ContactClient({ faqs }: { faqs: Faq[] }) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setStatus(res.ok ? "sent" : "error");
        } catch {
            setStatus("error");
        }
    };

    const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all";

    return (
        <main className="min-h-screen relative text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500">
            <NetworkBackground />
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                    }}
                />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.p
                        className="text-xs font-bold uppercase tracking-[0.35em] text-blue-500 dark:text-blue-400 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        Get In Touch
                    </motion.p>
                    <motion.h1
                        className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-none"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Connect</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-slate-500 dark:text-slate-400 mt-5 max-w-xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Whether you want to set up a lab, enroll in a course, or explore a partnership — we&apos;re here to help.
                    </motion.p>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="pb-16 container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start">

                    {/* Left — contact info */}
                    <motion.div
                        className="space-y-5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Who we serve */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                            <h3 className="font-black text-lg text-slate-800 dark:text-white mb-4">We work with</h3>
                            <div className="space-y-2">
                                {["Schools & Colleges", "Individual Students", "Corporate CSR Programs", "Government Bodies", "EdTech Partners"].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact details */}
                        <div className="space-y-3">
                            {DETAILS.map(({ icon: Icon, label, lines, color, href }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-start gap-4 group transition-transform hover:-translate-y-0.5 block">
                                    <div className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 ${color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
                                        <div className="space-y-0.5 mt-1">
                                            {lines.map((line, i) => (
                                                <p key={i} className={`text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:${color} transition-colors leading-snug`}>
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social / Response time */}
                        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 text-white shadow-md">
                            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Average Response</p>
                            <p className="text-4xl font-black">&lt; 24h</p>
                            <p className="text-sm opacity-70 mt-2 mb-6">Business days. We get back to every genuine enquiry.</p>

                            {/* Social Media Links */}
                            <div className="pt-4 border-t border-white/20">
                                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-3">Follow Us</p>
                                <div className="flex items-center gap-3">
                                    <a href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-amber-400 hover:via-pink-500 hover:to-purple-600 transition-all group"><Instagram className="w-4 h-4 text-white group-hover:scale-110 transition-transform" /></a>
                                    <a href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-[#0A66C2] transition-colors group"><Linkedin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" /></a>
                                    <a href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors group"><Twitter className="w-4 h-4 text-white group-hover:scale-110 transition-transform" /></a>
                                    <a href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-[#FF0000] transition-colors group"><Youtube className="w-4 h-4 text-white group-hover:scale-110 transition-transform" /></a>
                                </div>
                            </div>
                        </div>

                        {/* Careers / Openings */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm group hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <h3 className="font-black text-lg text-slate-800 dark:text-white">Careers & Openings</h3>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                Join our mission to build the future of robotics education. We are always looking for passionate educators, engineers, and sales rockstars.
                            </p>
                            <a href="mailto:careers@pntacademy.com?subject=Job%20Application&body=Hi%20Team,%0A%0AI%20am%20interested%20in%20applying%20for%20a%20role%20at%20PNT%20Academy." className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                Apply Now <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right — form and FAQ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-10"
                    >
                        {/* Form Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-xl">
                            {status === "sent" ? (
                                <motion.div
                                    className="flex flex-col items-center justify-center py-16 text-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <CheckCircle className="w-16 h-16 text-green-500 mb-5" />
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                                    <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                                        Thank you for reaching out. Our team will get back to you within 24 hours.
                                    </p>
                                    <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", subject: "General", message: "" }); }}
                                        className="mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors">
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Send us a message</h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Fill in the details below and we&apos;ll reach out promptly.</p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name *</label>
                                            <input required name="name" value={form.name} onChange={handleChange} placeholder="Rahul Sharma" className={inputCls} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email *</label>
                                            <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="rahul@school.edu" className={inputCls} />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                                            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputCls} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</label>
                                            <select name="subject" value={form.subject} onChange={handleChange} className={inputCls}>
                                                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Message *</label>
                                        <textarea required name="message" value={form.message} onChange={handleChange} rows={6}
                                            placeholder="Tell us about your school, the number of students, and what you're looking for..."
                                            className={`${inputCls} resize-none`}
                                        />
                                    </div>

                                    {status === "error" && (
                                        <p className="text-sm text-red-500 font-medium">Something went wrong. Please try again or email us directly.</p>
                                    )}

                                    <button type="submit" disabled={status === "sending"}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                                        {status === "sending" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* FAQs */}
                        {faqs.length > 0 && (
                            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-xl">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-3">
                                    {faqs.map((faq) => (
                                        <div
                                            key={faq._id}
                                            className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/50"
                                        >
                                            <button
                                                onClick={() => setOpenFaq(openFaq === faq._id ? null : faq._id)}
                                                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50"
                                            >
                                                <span className="font-bold text-slate-800 dark:text-white pr-4">{faq.question}</span>
                                                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === faq._id ? "rotate-180" : ""}`} />
                                            </button>
                                            <AnimatePresence>
                                                {openFaq === faq._id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-wrap border-t border-slate-100 dark:border-slate-800/50">
                                                            {faq.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
