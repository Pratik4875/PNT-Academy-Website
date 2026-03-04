"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fileToBase64 } from "@/lib/utils/fileToBase64";

interface SettingsForm {
    name: string;
    email: string;
    profileImage?: FileList;
}

export default function SettingsPage() {
    const { register, handleSubmit, reset, setValue } = useForm<SettingsForm>();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    // Fetch existing settings on mount
    useEffect(() => {
        async function fetchSettings() {
            try {
                const res = await fetch("/api/admin/settings");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                if (data?.name) setValue("name", data.name);
                if (data?.email) setValue("email", data.email);
            } catch (e) {
                console.error(e);
            } finally {
                setInitialLoading(false);
            }
        }
        fetchSettings();
    }, [setValue]);

    const onSubmit = async (formData: SettingsForm) => {
        setLoading(true);
        try {
            let profileImageBase64: string | undefined;
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
            const saved = await res.json();
            // Update form with saved data (especially the image URL if needed)
            reset({ name: saved.name, email: saved.email });
            alert("Settings saved successfully!");
        } catch (e) {
            console.error(e);
            alert("Failed to save settings.");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <LoadingSpinner />;
    }

    return (
        <main className="min-h-screen p-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            {loading && <LoadingSpinner />}
            <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register("name", { required: true })}
                        className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="profileImage">
                        Profile Picture (optional)
                    </label>
                    <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        {...register("profileImage")}
                        className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Will be stored as Base64 in MongoDB.</p>
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                >
                    Save Settings
                </button>
            </form>
            <section className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Email Notifications</h2>
                <p className="text-sm text-gray-600">
                    Coming soon <span className="ml-2 inline-block bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">Beta</span>
                </p>
            </section>
        </main>
    );
}
