"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Shield, Bell, Key, User, Camera, Check, AlertCircle } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fileToBase64 } from "@/lib/utils/fileToBase64";
import Image from "next/image";

interface SettingsForm {
    name: string;
    email: string;
    profileImage?: FileList;
}

export default function AdminSettings() {
    const { register, handleSubmit, setValue, watch } = useForm<SettingsForm>();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Watch for image changes to update preview
    const profileImageFile = watch("profileImage");

    useEffect(() => {
        if (profileImageFile && profileImageFile[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(profileImageFile[0]);
        }
    }, [profileImageFile]);

    // Fetch existing settings
    useEffect(() => {
        async function fetchSettings() {
            try {
                const res = await fetch("/api/admin/settings");
                if (res.ok) {
                    const data = await res.json();
                    if (data?.name) setValue("name", data.name);
                    if (data?.email) setValue("email", data.email);
                    if (data?.profileImage) setPreviewImage(data.profileImage);
                }
            } catch (e) {
                console.error("Failed to fetch settings", e);
            } finally {
                setInitialLoading(false);
            }
        }
        fetchSettings();
    }, [setValue]);

    const onSubmit = async (formData: SettingsForm) => {
        setLoading(true);
        setSaveStatus(null);
        try {
            let profileImageBase64 = previewImage;

            // If a new file was uploaded, convert it
            if (formData.profileImage && formData.profileImage[0]) {
                profileImageBase64 = await fileToBase64(formData.profileImage[0]);
            }

            const payload = {
                name: formData.name,
                email: formData.email,
                profileImage: profileImageBase64,
            };

            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Save failed");

            setSaveStatus({ type: 'success', message: 'Settings updated successfully!' });
            // Refresh the page or update global state if necessary
            window.location.reload(); // Refresh to update Topbar
        } catch (e) {
            console.error(e);
            setSaveStatus({ type: 'error', message: 'Failed to update settings. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <LoadingSpinner />;

    return (
        <div className="space-y-8">
            {loading && <LoadingSpinner />}

            <header className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-slate-900 dark:from-slate-200 dark:to-white tracking-tight">Portal Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg">
                        Manage your director account, security preferences, and dashboard configurations here.
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Navigation */}
                <div className="space-y-2">
                    {[
                        { name: "My Account", icon: User, active: true },
                        { name: "Security & Passwords", icon: Shield, active: false, badge: "Coming Soon" },
                        { name: "Email Notifications", icon: Bell, active: false, badge: "Coming Soon" },
                        { name: "API Keys (Firebase)", icon: Key, active: false, badge: "Beta" },
                        { name: "System Preferences", icon: SettingsIcon, active: false },
                    ].map((tab) => (
                        <button
                            key={tab.name}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${tab.active
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <tab.icon className="w-4 h-4" />
                                {tab.name}
                            </div>
                            {tab.badge && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${tab.active ? 'bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Right Column - Content Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                        {/* Status Message */}
                        {saveStatus && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${saveStatus.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}
                            >
                                {saveStatus.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                                <span className="text-sm font-medium">{saveStatus.message}</span>
                            </motion.div>
                        )}

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Director Profile</h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* Profile Header with Upload */}
                            <div className="flex items-center gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
                                <div className="relative group">
                                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-3xl shadow-lg border-4 border-white dark:border-slate-900 overflow-hidden relative">
                                        {previewImage ? (
                                            <Image
                                                src={previewImage}
                                                alt="Profile Preview"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span>{watch("name")?.[0]?.toUpperCase() || "A"}</span>
                                        )}

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                            <Camera size={24} className="text-white" />
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="profileImage"
                                            {...register("profileImage")}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white dark:border-slate-900 invisible group-hover:visible transition-all">
                                        <Camera size={14} />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">{watch("name") || "Admin / Director"}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{watch("email") || "director@pntacademy.com"}</p>
                                    <label htmlFor="profileImage" className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer block">
                                        Update Photo
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        {...register("name", { required: true })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                        placeholder="Enter full name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                        placeholder="Enter email address"
                                    />
                                </div>

                                <div className="pt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => window.location.reload()}
                                        className="px-6 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
                                    >
                                        Discard
                                    </button>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={loading}
                                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-sm disabled:opacity-70 flex items-center gap-2"
                                    >
                                        {loading ? "Processing..." : "Secure Save"}
                                    </motion.button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Secondary Info Card */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Security First</h3>
                                <p className="text-blue-100 text-sm">Your profile data is encrypted using MongoDB standard clusters.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
