"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Cpu, Wrench, Zap, Monitor, Star } from "lucide-react";

export default function RoboticsLabContent() {
    const [activeTab, setActiveTab] = useState<"schools" | "colleges">("schools");

    return (
        <>
            {/* Master Toggle and Hero Banner */}
            <div className="pt-32 pb-16 bg-gradient-to-br from-blue-900 to-indigo-900 border-b border-white/10 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-[url('/images/network-grid.svg')] opacity-20 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black mb-6 text-white drop-shadow-xl tracking-tight"
                        >
                            Industrial Robotics <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Lab Setup</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-blue-100 max-w-3xl mx-auto font-medium"
                        >
                            Choose your institution type below to view our specialized curriculum and hardware configurations.
                        </motion.p>
                    </div>

                    {/* Master Toggle Area */}
                    <div className="flex justify-center mb-8 relative z-20">
                        <div className="relative flex p-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                            <button
                                onClick={() => setActiveTab("schools")}
                                className={`relative z-10 px-8 py-4 text-lg md:text-xl font-bold rounded-full transition-colors duration-300 ${activeTab === "schools" ? "text-blue-900" : "text-white hover:text-blue-200"}`}
                            >
                                For Schools
                            </button>
                            <button
                                onClick={() => setActiveTab("colleges")}
                                className={`relative z-10 px-8 py-4 text-lg md:text-xl font-bold rounded-full transition-colors duration-300 ${activeTab === "colleges" ? "text-indigo-900" : "text-white hover:text-indigo-200"}`}
                            >
                                For Colleges
                            </button>
                            {/* Animated active pill */}
                            <motion.div
                                className="absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] rounded-full bg-white shadow-lg z-0"
                                initial={false}
                                animate={{
                                    left: activeTab === "schools" ? "0.375rem" : "50%"
                                }}
                                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Dynamic Content Rendering */}
            <div className="relative min-h-[800px] w-full pb-20">
                <AnimatePresence mode="wait">
                    {activeTab === "schools" ? (
                        <motion.div
                            key="schools"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.5 }}
                        >
                            <SchoolsContent />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="colleges"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.5 }}
                        >
                            <CollegesContent />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

// -------------------------------------------------------------
// State 1: For Schools
// -------------------------------------------------------------
function SchoolsContent() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-7xl">
            {/* Section 1: The Principle & Description */}
            <section className="mb-24 text-center max-w-4xl mx-auto">
                <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase mb-4 block">The Principle</span>
                <h2 className="text-3xl md:text-5xl font-black mb-8 text-slate-900 dark:text-white">Empowering the Next Generation of Innovators</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Our school labs are built on the core philosophy of hands-on learning and deep STEM integration.
                    We bridge the gap between textbook physics and real-world engineering, preparing students for the careers of tomorrow.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                        <CheckCircle2 className="w-5 h-5" /> NEP 2020 Aligned
                    </span>
                    <span className="px-6 py-3 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                        <CheckCircle2 className="w-5 h-5" /> Hands-on STEM
                    </span>
                    <span className="px-6 py-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                        <CheckCircle2 className="w-5 h-5" /> Project Based
                    </span>
                </div>
            </section>

            {/* Section 2: The Electronics Lab */}
            <section className="mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">The Electronics Lab</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">The core components that spark structural thinking and circuit logic.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Glowing Cards UI */}
                    {[
                        { title: "Core Controllers", icon: Cpu, desc: "Arduino Nano & Raspberry Pi 4 configurations for basic logic to high-level AI computing.", iconBg: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-600 dark:text-blue-400" },
                        { title: "Smart Sensors", icon: Zap, desc: "Ultrasonic, IR, PIR, Soil Moisture, Pulse Rate, Touch, and Gas sensors for real-time data.", iconBg: "bg-purple-100 dark:bg-purple-900/30", iconColor: "text-purple-600 dark:text-purple-400" },
                        { title: "Displays & Modules", icon: Monitor, desc: "16x2 LCDs, 8x8 LED Matrices, Bluetooth, and GPS for interactive physical outputs.", iconBg: "bg-emerald-100 dark:bg-emerald-900/30", iconColor: "text-emerald-600 dark:text-emerald-400" },
                        { title: "Motors & Actuators", icon: Wrench, desc: "Water pumps, Servos, and Stepper motors for physical movement and robotics.", iconBg: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600 dark:text-orange-400" },
                    ].map((item, i) => (
                        <div key={i} className="group relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            <div className={`w-20 h-20 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6 ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3: Other Lab Components (Grid Layout) */}
            <section>
                <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">Complete Infrastructure</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { title: "Rapid Prototyping", items: "3D Printers, PLA/ABS Filaments, Design Software" },
                        { title: "Mechanical & Tools", items: "Workstations, Calipers, Drilling Machines, Toolsets" },
                        { title: "Power & Safety", items: "Bench Power Supplies, Multimeters, Soldering Stations, Safety Gear" },
                        { title: "Lab Interiors", items: "Custom tables, ergonomic chairs, engaging vinyl wallpapers" },
                    ].map((comp, i) => (
                        <div key={i} className="flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg group">
                            {/* Modern Image Placeholder */}
                            <div className="w-full md:w-2/5 h-48 md:h-auto bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex flex-col items-center justify-center shrink-0">
                                {/* Glassmorphism Skeleton Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-md" />
                                <div className="w-16 h-16 bg-white/40 dark:bg-black/20 rounded-full animate-pulse flex items-center justify-center backdrop-blur-xl border border-white/50 dark:border-white/10 mb-2">
                                    <span className="text-2xl">📷</span>
                                </div>
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest relative z-10">Image Needed</span>
                            </div>
                            <div className="p-8 md:w-3/5 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{comp.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{comp.items}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// -------------------------------------------------------------
// State 2: For Colleges
// -------------------------------------------------------------
function CollegesContent() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-7xl">
            {/* Hero/Intro */}
            <section className="mb-24 text-center max-w-4xl mx-auto">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase mb-4 block">Higher Education</span>
                <h2 className="text-3xl md:text-5xl font-black mb-8 text-slate-900 dark:text-white">Research-Enabled Industrial Automation Lab</h2>

                {/* Highlighted Warning Stat */}
                <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-900/30 rounded-2xl p-6 mb-10 inline-block shadow-sm transform hover:scale-105 transition-transform">
                    <p className="text-red-800 dark:text-red-400 font-bold text-lg md:text-xl flex items-center justify-center gap-3">
                        <span className="text-2xl animate-pulse">⚠️</span>
                        NASSCOM data shows only 10% of engineering grads are employable in core robotics.
                    </p>
                </div>

                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                    Our mission is to bridge the massive gap between theoretical university curriculums and the harsh demands of the manufacturing, defense, and automation industries.
                </p>
            </section>

            {/* The Opportunity/Solution (Process Flow) */}
            <section className="mb-32">
                <h2 className="text-3xl font-black mb-16 text-center">The Solution Pathway</h2>
                <div className="grid md:grid-cols-4 gap-6 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-[40px] left-[10%] w-[80%] h-1 bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-800 dark:to-indigo-800 z-0" />

                    {[
                        { step: "01", title: "Permanent Lab Setup", desc: "Industrial-grade AGVs and robotic arms installed permanently on campus." },
                        { step: "02", title: "Curriculum Integration", desc: "Syllabus mapping across mechanical, electrical, and CS departments." },
                        { step: "03", title: "Faculty Enablement", desc: "Intensive Train-the-Trainer programs for definitive professorial ownership." },
                        { step: "04", title: "Industry Exposure", desc: "Exclusive live projects & partnerships with Indian Navy, DRDO, TATA Power." },
                    ].map((step, i) => (
                        <div key={i} className="relative z-10 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center group hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-black text-3xl mb-8 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                                {step.step}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lab Tiering UI */}
            <section className="mb-32">
                <h2 className="text-3xl md:text-4xl font-black mb-16 text-center">Tiered Infrastructure Models</h2>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Basic Tier */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 p-10 md:p-14 rounded-[3rem] border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-bl-[100px] transition-transform group-hover:scale-110" />
                        <h3 className="text-4xl font-black mb-4">Basic Level</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 text-xl font-medium">Foundational Automation & Educational Robotics</p>
                        <ul className="space-y-6 font-medium text-slate-700 dark:text-slate-300 text-lg">
                            <li className="flex items-start gap-4"><CheckCircle2 className="w-7 h-7 text-blue-500 shrink-0" /> Educational Robotic Arms (Desktop scale)</li>
                            <li className="flex items-start gap-4"><CheckCircle2 className="w-7 h-7 text-blue-500 shrink-0" /> Introductory ROS setups & simulations</li>
                            <li className="flex items-start gap-4"><CheckCircle2 className="w-7 h-7 text-blue-500 shrink-0" /> Controller-based IoT workstations</li>
                            <li className="flex items-start gap-4"><CheckCircle2 className="w-7 h-7 text-blue-500 shrink-0" /> Vision basics & payload balancing concepts</li>
                        </ul>
                    </div>
                    {/* Advanced Tier */}
                    <div className="bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[3rem] border-2 border-indigo-500 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-sm font-bold px-6 py-2 rounded-bl-3xl uppercase tracking-widest shadow-md z-10">Recommended</div>
                        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none" />

                        <h3 className="text-4xl font-black mb-4 relative z-10">Advance Level</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 mb-10 text-xl font-bold relative z-10">Industrial-Grade Automation Systems</p>
                        <ul className="space-y-6 font-bold text-slate-800 dark:text-slate-200 text-lg relative z-10">
                            <li className="flex items-start gap-4"><CheckCircle2 className="w-7 h-7 text-indigo-500 shrink-0" /> Industrial-Grade AGVs (Fully customizable)</li>
                            <li className="flex items-start gap-4"><CheckCircle2 className="w-7 h-7 text-indigo-500 shrink-0" /> 6-Axis Industrial Robotic Arms</li>
                            <li className="flex items-start gap-4"><CheckCircle2 className="w-7 h-7 text-indigo-500 shrink-0" /> Advanced Autonomous Drones & UAVs</li>
                            <li className="flex items-start gap-4"><CheckCircle2 className="w-7 h-7 text-indigo-500 shrink-0" /> High-DOF Robotic Hands & Grippers</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">Trusted by Future Engineers</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Engineering students executing real-world industry mandates.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "Rahul S.", uni: "Pillai College", text: "Working on the 6DOF robotic hand algorithms completely changed my perspective on ROS." },
                        { name: "Ananya M.", uni: "Manipal Academy", text: "The AGV trolley project we built here helped me crack my core technical interview instantly." },
                        { name: "Vikram K.", uni: "Bharati Vidyapeeth", text: "Bridging mechanical design with computer vision inside a real lab setting is unparalleled." }
                    ].map((test, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-3xl border border-slate-200 dark:border-slate-700/50 flex flex-col justify-between hover:shadow-xl transition-shadow">
                            <div>
                                <div className="flex text-yellow-500 mb-6 gap-1">
                                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 italic mb-8 text-lg leading-relaxed text-balance">"{test.text}"</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                                    {test.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{test.name}</h4>
                                    <p className="text-sm text-slate-500">{test.uni}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
