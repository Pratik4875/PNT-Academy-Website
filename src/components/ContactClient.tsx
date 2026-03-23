"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Send, MapPin, Mail, Phone, CheckCircle, Loader2, MessageCircle, Briefcase, ExternalLink, Instagram, Linkedin, Twitter, Youtube, ChevronDown, Sparkles, ArrowRight } from "lucide-react";

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
        gradient: "from-blue-500/20 to-blue-600/20",
        borderHover: "hover:border-blue-500/40",
        href: "https://www.google.com/maps?q=Plot+no.+A115,+Infinity+Business+Park,+MIDC,+Dombivli+East,+Dombivli,+Maharashtra+421203",
    },
    {
        icon: Mail,
        label: "Email",
        lines: ["contact@pntacademy.com", "pnt-trainings@pntacademy.com"],
        color: "text-purple-500",
        gradient: "from-purple-500/20 to-purple-600/20",
        borderHover: "hover:border-purple-500/40",
        href: "mailto:contact@pntacademy.com?subject=Website%20Enquiry&body=Hi%20PNT%20Academy,%0A%0AI%20am%20interested%20in%20learning%20more%20about...",
    },
    {
        icon: Phone,
        label: "Phone",
        lines: ["+91 93260 14648", "+91 81691 96916"],
        color: "text-teal-500",
        gradient: "from-teal-500/20 to-teal-600/20",
        borderHover: "hover:border-teal-500/40",
        href: "tel:+919326014648",
    },
    {
        icon: MessageCircle,
        label: "WhatsApp Bot",
        lines: ["Chat with Sales / Support"],
        color: "text-green-500",
        gradient: "from-green-500/20 to-green-600/20",
        borderHover: "hover:border-green-500/40",
        href: "https://wa.me/919326014648?text=Hi%20PNT%20Academy,%20I%20have%20an%20enquiry",
    },
];

/* ── Reusable stagger variants ── */
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};
const staggerItem = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
};

/* ── Animated Section Wrapper ── */
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function ContactClient({ faqs, settings }: { faqs: Faq[], settings?: any }) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [openFaq, setOpenFaq] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Dynamic links from Admin Settings
    const socialLinks = settings?.socialLinks || {
        instagram: "#",
        linkedin: "#",
        twitter: "#",
        youtube: "#"
    };
    const careersLink = settings?.careersLink || "mailto:careers@pntacademy.com?subject=Job%20Application";

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

    const inputCls = "w-full px-5 py-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 dark:focus:ring-blue-400/40 dark:focus:border-blue-400/40 transition-all duration-300 text-sm";

    return (
        <div className="relative">
            <Navbar />
            <main className="min-h-screen relative text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500">

                {/* ━━ Decorative Background Gradient Orbs ━━ */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/15 to-purple-600/15 dark:from-blue-500/10 dark:to-purple-600/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-1/2 -left-60 w-[400px] h-[400px] bg-gradient-to-tr from-teal-500/10 to-cyan-400/10 dark:from-teal-500/8 dark:to-cyan-400/8 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 right-1/4 w-[350px] h-[350px] bg-gradient-to-tl from-purple-500/10 to-pink-500/10 dark:from-purple-500/8 dark:to-pink-500/8 rounded-full blur-3xl" />
                </div>

                {/* ━━ Hero ━━ */}
                <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/50 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-[0.3em] mb-6"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            Start a Conversation
                        </motion.div>

                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-5"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                        >
                            <span className="text-slate-900 dark:text-white">Let&apos;s Build </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
                                Something Great
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                        >
                            From setting up your first robotics lab to launching institution-wide STEM programs — every great innovation starts with a simple hello.
                        </motion.p>

                        {/* Animated scroll indicator */}
                        <motion.div
                            className="mt-10 flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-start justify-center p-1.5"
                            >
                                <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ━━ Contact Grid ━━ */}
                <section className="pb-20 container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-12 items-start">

                        {/* ── Left Column — Contact Info ── */}
                        <AnimatedSection delay={0.1}>
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="space-y-4"
                            >
                                {/* Who we serve */}
                                <motion.div variants={staggerItem} className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-3xl p-6 shadow-lg shadow-black/[0.03] dark:shadow-black/20">
                                    <h3 className="font-black text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                        <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
                                        Trusted By
                                    </h3>
                                    <div className="space-y-2.5">
                                        {["500+ Schools & Universities", "Aspiring Young Innovators", "Corporate CSR & Skill India Programs", "Indian Army & Navy Partnerships", "Leading EdTech Platforms"].map((item, i) => (
                                            <motion.div
                                                key={item}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.08 }}
                                                className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0" />
                                                {item}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Contact details */}
                                {DETAILS.map(({ icon: Icon, label, lines, color, gradient, borderHover, href }) => (
                                    <motion.a
                                        key={label}
                                        variants={staggerItem}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -4, scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 ${borderHover} rounded-2xl p-5 shadow-lg shadow-black/[0.03] dark:shadow-black/20 flex items-start gap-4 block transition-all duration-300 group hover:shadow-xl dark:hover:shadow-black/30`}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} dark:bg-gradient-to-br flex items-center justify-center shrink-0 ${color} group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{label}</p>
                                            <div className="space-y-0.5">
                                                {lines.map((line, i) => (
                                                    <p key={i} className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug truncate">
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all ml-auto mt-1 shrink-0" />
                                    </motion.a>
                                ))}

                                {/* Response Time + Social */}
                                <motion.div variants={staggerItem} className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/10 dark:shadow-blue-500/5 relative overflow-hidden">
                                    {/* Decorative shimmer */}
                                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.08)_50%,transparent_75%)] bg-[length:200%_100%] animate-shimmer" />

                                    <div className="relative z-10">
                                        <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Lightning-Fast Response</p>
                                        <p className="text-5xl font-black">&lt; 24h</p>
                                        <p className="text-sm opacity-70 mt-2 mb-6">No auto-replies. A real human from our team will personally respond to your enquiry.</p>

                                        <div className="pt-4 border-t border-white/20">
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-3">Follow Us</p>
                                            <div className="flex items-center gap-3">
                                                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-amber-400 hover:via-pink-500 hover:to-purple-600 transition-all group hover:scale-110"><Instagram className="w-4 h-4 text-white" /></a>
                                                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-[#0A66C2] transition-colors group hover:scale-110"><Linkedin className="w-4 h-4 text-white" /></a>
                                                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-black transition-colors group hover:scale-110"><Twitter className="w-4 h-4 text-white" /></a>
                                                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-[#FF0000] transition-colors group hover:scale-110"><Youtube className="w-4 h-4 text-white" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Careers */}
                                <motion.div variants={staggerItem} className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-3xl p-6 shadow-lg shadow-black/[0.03] dark:shadow-black/20 group hover:border-blue-500/30 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                            <Briefcase className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-black text-lg text-slate-800 dark:text-white">Join the Mission</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                        We&apos;re shaping the future of robotics education in India. If you&apos;re a passionate educator, creative engineer, or driven sales professional — we want to hear from you.
                                    </p>
                                    <a href={careersLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link">
                                        Explore Open Roles <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                                    </a>
                                </motion.div>
                            </motion.div>
                        </AnimatedSection>

                        {/* ── Right Column — Form + FAQ ── */}
                        <AnimatedSection delay={0.25}>
                            <div className="space-y-8">
                                {/* Form Card */}
                                <div className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/[0.05] dark:shadow-black/30 relative overflow-hidden">
                                    {/* Decorative corner accent */}
                                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                                    {status === "sent" ? (
                                        <motion.div
                                            className="flex flex-col items-center justify-center py-16 text-center relative z-10"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        >
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                                            >
                                                <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                                            </motion.div>
                                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                                            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                                                Thank you for reaching out. Our team will get back to you within 24 hours.
                                            </p>
                                            <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", subject: "General", message: "" }); }}
                                                className="mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-95">
                                                Send Another Message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                            <div>
                                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">Tell Us About Your Vision</h2>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Share a few details and our team will craft a personalized response within 24 hours.</p>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name *</label>
                                                    <div className={`relative rounded-2xl transition-all duration-300 ${focusedField === "name" ? "ring-2 ring-blue-500/30 dark:ring-blue-400/30" : ""}`}>
                                                        <input required name="name" value={form.name} onChange={handleChange} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} placeholder="Rahul Sharma" className={inputCls} />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email *</label>
                                                    <div className={`relative rounded-2xl transition-all duration-300 ${focusedField === "email" ? "ring-2 ring-blue-500/30 dark:ring-blue-400/30" : ""}`}>
                                                        <input required type="email" name="email" value={form.email} onChange={handleChange} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} placeholder="rahul@school.edu" className={inputCls} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone</label>
                                                    <div className={`relative rounded-2xl transition-all duration-300 ${focusedField === "phone" ? "ring-2 ring-blue-500/30 dark:ring-blue-400/30" : ""}`}>
                                                        <input name="phone" value={form.phone} onChange={handleChange} onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)} placeholder="+91 98765 43210" className={inputCls} />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject</label>
                                                    <select name="subject" value={form.subject} onChange={handleChange} className={inputCls}>
                                                        {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message *</label>
                                                <div className={`relative rounded-2xl transition-all duration-300 ${focusedField === "message" ? "ring-2 ring-blue-500/30 dark:ring-blue-400/30" : ""}`}>
                                                    <textarea required name="message" value={form.message} onChange={handleChange} onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} rows={5}
                                                        placeholder="E.g., We're a school with 200+ students interested in starting a robotics lab and an after-school STEM club..."
                                                        className={`${inputCls} resize-none`}
                                                    />
                                                </div>
                                            </div>

                                            {status === "error" && (
                                                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-500 font-medium bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-200 dark:border-red-500/20">
                                                    Something went wrong. Please try again or email us directly.
                                                </motion.p>
                                            )}

                                            <motion.button
                                                type="submit"
                                                disabled={status === "sending"}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider relative overflow-hidden group"
                                            >
                                                {/* Shimmer effect on hover */}
                                                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:200%_100%] group-hover:animate-shimmer" />
                                                <span className="relative z-10 flex items-center gap-2.5">
                                                    {status === "sending" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                                                </span>
                                            </motion.button>
                                        </form>
                                    )}
                                </div>

                                {/* FAQs */}
                                {faqs.length > 0 && (
                                    <AnimatedSection delay={0.3}>
                                        <div className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/[0.05] dark:shadow-black/30">
                                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">Common Questions, Straight Answers</h2>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Everything you need to know before getting started with PNT Academy.</p>

                                            <div className="space-y-3">
                                                {faqs.map((faq, i) => (
                                                    <motion.div
                                                        key={faq._id}
                                                        initial={{ opacity: 0, y: 15 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: i * 0.06 }}
                                                        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                                                            openFaq === faq._id
                                                                ? "border-blue-500/30 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-500/5 shadow-md"
                                                                : "border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20"
                                                        }`}
                                                    >
                                                        <button
                                                            onClick={() => setOpenFaq(openFaq === faq._id ? null : faq._id)}
                                                            className="w-full flex items-center justify-between p-5 text-left transition-colors"
                                                        >
                                                            <span className="font-bold text-slate-800 dark:text-white pr-4 text-sm sm:text-base">{faq.question}</span>
                                                            <motion.div
                                                                animate={{ rotate: openFaq === faq._id ? 180 : 0 }}
                                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                            >
                                                                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                                                            </motion.div>
                                                        </button>
                                                        <AnimatePresence>
                                                            {openFaq === faq._id && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-wrap border-t border-slate-200/50 dark:border-white/10 pt-4">
                                                                        {faq.answer}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                )}
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </main>
        </div>
    );
}
