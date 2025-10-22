"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "@/hooks/useStore";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // ShadCN avatar

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user: User | null = useAppSelector((state) => state.auth.user);

  // Array of links for both desktop and mobile
  const navLinks = [{ name: "Listings", href: "/listings" }];

  return (
    <nav className="bg-black text-white px-6 py-3 md:px-8 sticky top-0 z-50 rounded-lg">
      <div className="mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 font-semibold text-lg lg:text-2xl hover:text-blue-400 transition-colors"
        >
          <span>MeetAL AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-blue-400 transition-colors flex items-center space-x-1"
            >
              <span>{link.name}</span>
            </Link>
          ))}

          {/* Login or Avatar */}
          {user && user.userType === "job_seeker" ?  (
              <Link href="/profile">
                  <Avatar>
                      <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${user.name}`}
                      />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
              </Link>
          ) : (
              user && user.userType === "recruiter" ? (<Link href="/recruiter/jobs">
                  <Avatar>
                      <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${user.name}`}
                      />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
              </Link>) : (<Link
                  href="/login"
                  className="hover:text-blue-400 transition-colors"
              >
                  Login
              </Link>)
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 bg-black/90 rounded-lg px-4 py-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-2 hover:text-blue-400 transition-colors flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <span>{link.name}</span>
            </Link>
          ))}

          {/* Login or Avatar */}
          {user ? (
            <Link
              href="/profile"
              className="py-2 flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Avatar>
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${user.name}`}
                />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="py-2 hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
