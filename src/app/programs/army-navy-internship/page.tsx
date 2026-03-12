import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";

export default function DefenseInternshipPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="Defense R&D Internship"
                subtitle="INDIAN NAVY'S PROJECT 'KAVACH'"
                description="A 1-month guided online internship where students solve real-world defense challenges alongside PNT Academy engineers."
                colorFrom="from-slate-700"
                colorTo="to-slate-900"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}