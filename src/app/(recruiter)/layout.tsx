import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import RecruiterSidebar from "@/app/(recruiter)/recruiter/components/RecruiterSidebar";
import RecruiterNavbar from "@/app/(recruiter)/recruiter/components/RecruiterNavbar";
import RecruiterFooter from "@/app/(recruiter)/recruiter/components/RecruiterFooter";
import {cookies} from "next/headers";

export default async function RecruiterLayout({ children }: { children: ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <div className="flex min-h-screen w-full">
                {/* Sidebar */}
                <RecruiterSidebar />

                {/* Main Content Area */}
                <div className="flex flex-col flex-1">
                    {/* Navbar */}
                    <RecruiterNavbar />

                    {/* Page Content */}
                    <main className="flex-1 p-4 overflow-y-auto bg-background">
                        {children}
                    </main>

                    {/* Footer */}
                    <RecruiterFooter />
                </div>
            </div>
        </SidebarProvider>
    );
}
