import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CoursesForKidsContent from "@/components/CoursesForKidsContent";

export default function CoursesForKidsPage() {
    return (
        <main className="min-h-screen text-slate-900 dark:text-slate-50 overflow-x-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            <Navbar />

            <PageHeader
                title="Courses for Kids"
                subtitle="Hands-on learning in Robotics, Coding, and AI for Grades 4 through 12."
                description="Ignite young minds with hands-on robotics, AI, and coding projects. Our curriculum focuses on practical application, logical thinking, and early exposure to future technologies."
                colorFrom="from-orange-500"
                colorTo="to-red-600"
            />

            <CoursesForKidsContent />

            <Footer />
        </main>
    );
}
