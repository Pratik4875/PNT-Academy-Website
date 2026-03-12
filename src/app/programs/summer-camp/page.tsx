import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";

export default function SummerCampPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="PNT Summer Camp"
                subtitle="VACATION LEARNING"
                description="Transform your summer break into an innovation journey. Build robots, learn Python, and fly drones."
                colorFrom="from-yellow-400"
                colorTo="to-orange-500"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}