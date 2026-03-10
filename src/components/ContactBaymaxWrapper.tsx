"use client";

import dynamic from "next/dynamic";

const ContactBaymax3D = dynamic(() => import("./ContactBaymax3DScene"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
        </div>
    ),
});

export default function ContactBaymaxWrapper() {
    return (
        <div className="h-[450px] w-full max-w-[500px] mx-auto mt-4">
            <ContactBaymax3D />
        </div>
    );
}
