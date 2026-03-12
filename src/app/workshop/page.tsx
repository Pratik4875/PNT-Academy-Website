import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";

export default function WorkshopPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="Future Skills Workshop"
                subtitle="2-DAY INTENSIVE TRAINING"
                description="Designed to introduce students to practical technology learning, problem-solving, and innovation."
                colorFrom="from-rose-400"
                colorTo="to-red-600"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}