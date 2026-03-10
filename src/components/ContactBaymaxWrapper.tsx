"use client";

import dynamic from "next/dynamic";

const ContactBaymax3D = dynamic(() => import("./ContactBaymax3DScene"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-slate-100/50 dark:bg-slate-800/50 animate-pulse rounded-3xl" />,
});

export default function ContactBaymaxWrapper() {
    return (
        <div className="h-[300px] w-full max-w-[300px] mx-auto">
            <ContactBaymax3D />
        </div>
    );
}
