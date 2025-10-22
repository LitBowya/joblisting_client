"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com" },
    { icon: <Github className="w-5 h-5" />, href: "https://github.com" },
  ];

  return (
    <footer className="bg-black text-gray-300 py-10 px-6 md:px-12 mt-10 rounded-lg">
      <div className="mx-auto flex flex-wrap justify-between items-center gap-8">
        {/* Brand Section */}
        <div>
          <Link
            href="/"
            className="text-white text-2xl font-semibold hover:text-blue-400 transition-colors"
          >
            MeetAL AI
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-wrap space-x-2">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-blue-400 text-sm transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social Media */}
        <div>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                className="hover:text-blue-400 transition-colors"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MeetAL AI. All rights reserved.
      </div>
    </footer>
  );
}
