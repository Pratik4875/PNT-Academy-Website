"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getLiveSchools } from "@/lib/actions/db";

export default function ClientLogos() {
    const [logos, setLogos] = useState<any[]>([]);

    useEffect(() => {
        getLiveSchools().then(setLogos).catch(console.error);
    }, []);

    if (logos.length === 0) {
        return (
            <div className="flex flex-col items-center gap-4 w-full mt-8">
                <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700/50 rounded-2xl w-full max-w-2xl text-center backdrop-blur-sm bg-white/30 dark:bg-black/10">
                    <p className="text-slate-500 dark:text-slate-400 mb-2 text-lg font-medium">No school logos found yet.</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        To add logos automatically, register them via your <br />
                        <code className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-purple-600 dark:text-purple-400 font-bold mx-1">
                            Admin Dashboard
                        </code>
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 italic">This section will automatically display them here upon page refresh.</p>
                </div>

                {/* Fallback Static Logic so the layout doesn't look empty when developing */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 opacity-80 dark:opacity-60 transition-all duration-700 mt-12 mb-8 pointer-events-none text-center">
                    {['THE RAJAS INTERNATIONAL SCHOOL', 'ORION ICSE', 'DSK SCHOOL', 'MRIS', 'BIRLA INSTITUTE OF TECHNOLOGY & SCIENCE, PILANI', 'Vishwashanti Gurukul School', 'sloka International School', 'NES International School Dombivli', 'C.B.M. HIGH SCHOOL', 'TCIS The Cambria International School', 'JIJAMATA CONVENT SCHOOL'].map((school) => (
                        <div key={school} className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-full text-sm font-bold tracking-wider text-slate-700 dark:text-slate-300 bg-white shadow-sm dark:bg-slate-900">
                            {school}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12 opacity-80 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-700 mt-10">
            {logos.map((logo, index) => (
                <div key={index} className="relative h-16 w-32 md:h-24 md:w-48 transition-transform hover:scale-110 flex items-center justify-center filter drop-shadow-sm">
                    <Image
                        src={logo.imageUrl}
                        alt={`School Logo ${index + 1}`}
                        fill
                        className="object-contain"
                    />
                </div>
            ))}
        </div>
    );
}
