"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const IntroAnimation = dynamic(() => import("@/components/IntroAnimation"), { ssr: false });

export default function ClientIntroWrapper() {
    // Always start visible — shows on every load and reload
    const [done, setDone] = useState(false);

    if (done) return null;
    return <IntroAnimation onComplete={() => setDone(true)} />;
}
