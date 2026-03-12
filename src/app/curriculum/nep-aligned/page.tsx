import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";

export default function NepAlignedPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <PageHeader
                title="NEP 2020 Aligned Curriculum"
                subtitle="FOR GRADES 3 TO 10"
                description="Year-long Robotics Curriculum focused on practical learning, real-world projects, and 21st-century skill development."
                colorFrom="from-fuchsia-500"
                colorTo="to-purple-600"
            />
            <ComingSoon />
            <Footer />
        </main>
    );
}