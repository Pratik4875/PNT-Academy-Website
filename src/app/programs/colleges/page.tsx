import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";
import CollegesProgramsContent from "@/components/CollegesProgramsContent";

export default function CollegesProgramsPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <PageHeader
                title="Industrial Trainings for Colleges"
                subtitle="ENGINEERING & DIPLOMA"
                description="Research-Enabled Industrial Automation Labs. Partnering with Indian Navy, DRDO, and TATA Power to offer real-world exposure and bridge the academic gap."
                colorFrom="from-indigo-500"
                colorTo="to-blue-700"
            />
            <CollegesProgramsContent />
            <Footer />
        </main>
    );
}