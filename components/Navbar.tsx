"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FileDown, 
  Menu, 
  X, 
  ArrowUpRight,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/ai-tools", label: "AI Suite" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer upon navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#11121a]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80"
              : "bg-[#11121a]/60 backdrop-blur-md border border-white/5"
          }`}
        >
          {/* Brand Logo & Live Status */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-white focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#e5c378] to-[#f5e6b8] text-black font-extrabold flex items-center justify-center text-xs tracking-tighter">
              VK
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-white group-hover:text-[#e5c378] transition-colors">
                Vishesh Kumar
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/10 font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={PERSONAL_INFO.resume.downloadUrl}
              download={PERSONAL_INFO.resume.filename}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 border border-white/10 hover:border-[#e5c378]/50 hover:text-white transition-all"
            >
              <FileDown className="w-3.5 h-3.5 text-[#e5c378]" />
              <span>Resume</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#e5c378] text-black hover:bg-[#f3d592] transition-all hover:scale-[1.02]"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#11121a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white bg-white/10 font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#e5c378]" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            <a
              href={PERSONAL_INFO.resume.downloadUrl}
              download={PERSONAL_INFO.resume.filename}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-300 border border-white/10 hover:border-white/20"
            >
              <FileDown className="w-3.5 h-3.5 text-[#e5c378]" />
              <span>Resume</span>
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#e5c378] text-black"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
