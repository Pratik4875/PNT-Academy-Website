"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

// Placeholder data - later to be fetched from Admin Panel
const PLACEHOLDER_TESTIMONIALS = [
    {
        id: 1,
        name: "Aman Sharma",
        role: "Student, Grade 10",
        quote: "The robotics bootcamp completely changed how I look at coding. Building a real AGV that moved on its own was the coolest thing I've ever done. Thanks PNT Academy!"
    },
    {
        id: 2,
        name: "Principal R. K. Desai",
        role: "St. Xavier's High School",
        quote: "Setting up the Composite Skill Lab with PNT Academy was seamless. Their curriculum is perfectly aligned with NEP 2020, and the students are noticeably more engaged in STEM subjects."
    },
    {
        id: 3,
        name: "Priyanka Patel",
        role: "Engineering Student",
        quote: "The Tata Power internship project gave me the exact hands-on experience I needed. Getting to work on actual industrial problem-statements gave me a huge edge in my job interviews."
    }
];

export default function TestimonialsSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const next = () => setCurrentIndex((prev) => (prev + 1) % PLACEHOLDER_TESTIMONIALS.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + PLACEHOLDER_TESTIMONIALS.length) % PLACEHOLDER_TESTIMONIALS.length);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(next, 6000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <section className="py-24 relative border-t border-slate-900/10 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="text-sm font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-3">Community Voices</p>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white transition-colors duration-500">
                        Student Testimonials
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-6" />
                </div>

                <div
                    className="max-w-4xl mx-auto relative"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="min-h-[300px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 w-full relative z-10"
                            >
                                <Quote className="w-16 h-16 text-blue-500/20 absolute top-8 text-left -z-10 transform -rotate-12" />
                                <div className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium italic mb-10 text-center relative z-10">
                                    "{PLACEHOLDER_TESTIMONIALS[currentIndex].quote}"
                                </div>
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 mb-4 shadow-md flex items-center justify-center text-white font-bold text-xl uppercase">
                                        {PLACEHOLDER_TESTIMONIALS[currentIndex].name.charAt(0)}
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">{PLACEHOLDER_TESTIMONIALS[currentIndex].name}</h4>
                                    <p className="text-sm font-semibold text-blue-500 mt-1">{PLACEHOLDER_TESTIMONIALS[currentIndex].role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prev}
                        className="absolute left-0 lg:-left-12 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:scale-110 transition-all z-20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:scale-110 transition-all z-20"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {PLACEHOLDER_TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-blue-600 w-8" : "bg-slate-300 dark:bg-slate-600"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
