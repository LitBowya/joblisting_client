'use client'

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {User as UserIcon, LogOut} from "lucide-react"
import { useAppSelector } from "@/hooks/useStore";
import { User } from "@/types/user";
import Link from "next/link";

import React from 'react'
import {SidebarTrigger} from "@/components/ui/sidebar";
import {usePathname} from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import {Button} from "@/components/ui/button";

const RecruiterNavbar = () => {
    const pathname = usePathname()
    const user: User | null = useAppSelector((state) => state.auth.user);

    interface PageTitles {
        [key: string]: string;
    }

    const pageTitles: PageTitles = {
        '/recruiter/profile': 'Profile',
        '/recruiter/company': 'Company',
        '/recruiter/jobs': 'Jobs',
        '/recruiter/applications': 'Applications',
    };
    return (
        <nav
            className="sticky top-2 z-50 rounded-full flex justify-between items-center backdrop-filter bg-opacity-30 backdrop-blur-lg bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-black/20 w-full">
            {/* Left: Sidebar Trigger and Logo */}
            <div className="flex items-center">
                <SidebarTrigger className="cursor-pointer mr-4"/>
                <div className="text-xl font-bold text-foreground">{pageTitles[pathname] || 'Page'}</div>
                {/* Logo/Brand */}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">

                {/* User Dropdown */}
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="flex items-center space-x-2 p-2 rounded-full hover:bg-accent transition-colors">
                            <Avatar>
                                <AvatarImage
                                    src={`https://ui-avatars.com/api/?name=${user?.name}`}
                                />
                                <AvatarFallback>{user?.name[0]}</AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-72">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <UserIcon className="mr-2 h-4 w-4"/>
                            <span className="flex flex-col leading-tight">
  <span className="text-sm font-medium text-gray-900">{user?.name}</span>
  <span className="text-xs text-gray-500">{user?.email}</span>
</span>

                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className={'block'}>
                            <div>
                                <LogoutButton />
                            </div>
                            <div>
                                <Button variant={'success'} className={'w-full'}>
                                    <Link href={'/'}>Go Home</Link>
                                </Button>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}
export default RecruiterNavbar
