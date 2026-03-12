import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";

export default function CompositeSkillLabPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="Composite Skill Lab"
                subtitle="INNOVATION SPACES"
                description="Comprehensive multi-disciplinary innovation centers combining 3D Printing, IoT, AR/VR, and core mechanical automation."
                colorFrom="from-purple-500"
                colorTo="to-pink-600"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}