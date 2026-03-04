import AuthGuard from "@/components/admin/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
    title: "Admin Dashboard | PNT Academy",
    description: "Secure management portal for PNT Academy content.",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
                {/* Fixed Sidebar */}
                <AdminSidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
                    {/* Background glow for theme matching */}
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

                    {/* Dashboard Header/Topbar */}
                    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/10 flex items-center justify-end px-8 z-10 sticky top-0 transition-colors duration-500">
                        <div className="flex items-center gap-4">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">System Online</span>
                            <div className="h-8 w-8 ml-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md border border-white/20">
                                A
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
