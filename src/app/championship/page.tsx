import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";

export default function ChampionshipPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="Skill Tank Championship"
                subtitle="NATIONAL LEVEL INNOVATION"
                description="PNT Academy’s in-house Robotics & Innovation competition, providing students exposure to national-level events and top technical institutes like IIT Bombay."
                colorFrom="from-yellow-400"
                colorTo="to-amber-500"
                actionText="Register Your Team"
                actionLink="#register"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}