import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";

export default function KitsPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="Educational Robotics Kits"
                subtitle="HANDS-ON HARDWARE"
                description="Take-home physical hardware kits used during our bootcamps and workshops to ensure learning continues."
                colorFrom="from-cyan-400"
                colorTo="to-blue-500"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}