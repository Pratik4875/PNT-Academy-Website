import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";
import SchoolsProgramsContent from "@/components/SchoolsProgramsContent";

export default function SchoolsProgramsPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />

            {/* The PageHeader component sets the stage beautifully */}
            <PageHeader
                title="STEM Robotics & Coding Curriculum"
                subtitle="NEP 2020 ALIGNED"
                description="Equip your school with the most advanced, practical robotics education. Appreciated by Hon'ble PM Shri Narendra Modi & Featured on Shark Tank India (Funded by Peyush Bansal)."
                colorFrom="from-blue-600"
                colorTo="to-purple-600"
            />
            <SchoolsProgramsContent />
            <Footer />
        </main>
    );
}