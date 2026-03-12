import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";

export default function OnlineClassesPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="Online Classes & Bootcamps"
                subtitle="COURSES FOR KIDS"
                description="Free online AI & Robotics Bootcamps aimed at creating early awareness and deep interest in future technologies."
                colorFrom="from-emerald-400"
                colorTo="to-teal-500"
                actionText="Go to LMS Portal"
                actionLink="/lms"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}