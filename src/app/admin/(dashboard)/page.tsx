"use client";
import { motion } from "framer-motion";
import { Image as ImageIcon, Briefcase, GraduationCap, Users, TrendingUp } from "lucide-react";

const STATS = [
    { label: "Gallery Photos", value: "24", icon: ImageIcon, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Partner Schools", value: "18", icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Internships", value: "3", icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Total Visits", value: "8,401", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <header className="mb-10">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 tracking-tight"
                >
                    Welcome back, Director
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-500 dark:text-slate-400 mt-2 text-lg"
                >
                    Here is a summary of the PNT Academy platform today.
                </motion.p>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Action Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-8 relative overflow-hidden group shadow-lg"
                >
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                        <ImageIcon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Live Media Library</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
                        Upload and organize new photos for the public student projects gallery, workshops, and lab setups.
                    </p>
                    <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all text-sm">
                        Manage Gallery ➔
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-8 relative overflow-hidden group shadow-lg"
                >
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500"></div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Partner Network</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
                        Add or remove logos from the "Trusted by Innovative Schools" and "Internships" public website sections.
                    </p>
                    <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all text-sm">
                        Manage Partners ➔
                    </button>
                </motion.div>
            </div>

        </div>
    );
}
