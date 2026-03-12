import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";

export default function OfflineBootcampsPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="Offline Bootcamps"
                subtitle="INTENSIVE HANDS-ON LEARNING"
                description="Engage in immersive, multi-day coding and robotics bootcamps where students build physical prototypes alongside industry experts."
                colorFrom="from-orange-400"
                colorTo="to-red-500"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}