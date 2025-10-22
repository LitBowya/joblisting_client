'use client'

import {
    Briefcase,FileText,
    User,
    Sunrise,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

const items = [

    {
        title: "Jobs",
        url: "/recruiter/jobs",
        icon: Briefcase, // Commonly used for job-related features
    },
    {
        title: "Applications",
        url: "/recruiter/applications",
        icon: FileText, // Represents submitted documents or job applications
    },
    {
        title: "Profile",
        url: "/recruiter/profile",
        icon: User, // Perfect for company or organization
    },
];

export default function RecruiterSidebar() {
    const pathname = usePathname()
    return (
        <Sidebar collapsible="icon" >

            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >

                            <a href="#">
                                {/*<IconInnerShadowTop className="!size-5" />*/}
                                <Sunrise/>
                                <span className="text-base font-semibold">MeetAL AI</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}
                                              className={cn('py-2', pathname === item.url && 'bg-black/40 text-white dark:bg-white/40 ')}>
                                            <span className={''}>
                                                <item.icon size={'18'}/>
                                            </span>
                                            <span className={`text-md`}>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}