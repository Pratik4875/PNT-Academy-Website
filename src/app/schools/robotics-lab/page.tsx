import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoboticsLabContent from "@/components/RoboticsLabContent";

export default function RoboticsLabPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <RoboticsLabContent />
            <Footer />
        </main>
    );
}
