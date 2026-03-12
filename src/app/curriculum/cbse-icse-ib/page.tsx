import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";

export default function CbseIcsePage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="CBSE / ICSE / IB Support"
                subtitle="BOARD-SPECIFIC INTEGRATION"
                description="Supplementary curriculum maps tailored to support the specific computer science and physics syllabi of major educational boards."
                colorFrom="from-sky-400"
                colorTo="to-blue-600"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}