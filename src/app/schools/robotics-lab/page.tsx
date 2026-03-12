import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";
import LabPackagesGrid from "@/components/LabPackagesGrid";

export default function RoboticsLabPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="Industrial Robotics Lab Setup"
                subtitle="FOR SCHOOLS & COLLEGES"
                description="Bridge the gap between academic learning and industry requirements with our permanently deployed, NEP 2020 aligned Robotics & Autonomous Systems Lab."
                colorFrom="from-blue-500"
                colorTo="to-indigo-600"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}