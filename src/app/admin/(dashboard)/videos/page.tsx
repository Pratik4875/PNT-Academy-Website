"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, Trash2, Video, Upload, RefreshCw, HardDrive } from "lucide-react";

function formatBytes(bytes: number) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

interface VideoItem {
    filename: string;
    url: string;
    size: number;
    lastModified: string;
}

export default function AdminVideos() {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/videos");
            const data = await res.json();
            setVideos(data);
        } catch (error) {
            console.error("Failed to fetch videos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // Upload file directly to the /public/videos folder via a FormData request
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/admin/videos/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                await fetchVideos(); // Refresh the list
            } else {
                alert("Upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (filename: string) => {
        if (!confirm(`Are you sure you want to delete "${filename}"? This will immediately remove it from the Schools Training page.`)) return;

        try {
            const res = await fetch(`/api/admin/videos?filename=${encodeURIComponent(filename)}`, { method: "DELETE" });
            if (res.ok) {
                setVideos(videos.filter((v) => v.filename !== filename));
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="space-y-6">
            <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Schools Training Videos</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg">
                        Manage hero background videos for the Training for Schools page. Videos play sequentially with crossfade transitions. Drop any <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono text-purple-600 dark:text-purple-400">.mp4</code> file into <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono text-purple-600 dark:text-purple-400">/public/videos/</code> and it will auto-appear here.
                    </p>
                </div>
                <button
                    onClick={fetchVideos}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" /> Refresh
                </button>
            </header>

            {/* Upload Module */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm"
            >
                <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                    <Upload className="w-5 h-5 text-blue-500" /> Upload New Video
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleUpload}
                        disabled={isUploading}
                        className="flex-1 p-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 transition-colors"
                    />
                    {isUploading && (
                        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                            <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                        </div>
                    )}
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
                    Supported: .mp4, .webm, .mov • Videos are auto-detected and displayed on the Schools Training page.
                </p>
            </motion.div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-12 flex justify-center text-slate-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                ) : videos.length === 0 ? (
                    <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                        <Video className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500">No videos found in /public/videos/</p>
                        <p className="text-xs text-slate-400 mt-1">Upload a video or drop one into the folder.</p>
                    </div>
                ) : (
                    videos.map((video, i) => (
                        <motion.div
                            key={video.filename}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm"
                        >
                            <div className="aspect-video w-full bg-slate-900 relative">
                                <video
                                    src={video.url}
                                    className="w-full h-full object-cover"
                                    muted
                                    playsInline
                                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                                    onMouseLeave={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                                />
                            </div>
                            <div className="p-4">
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">{video.filename}</h4>
                                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> {formatBytes(video.size)}</span>
                                    <span>{new Date(video.lastModified).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(video.filename)}
                                className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
                                title="Delete Video"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
