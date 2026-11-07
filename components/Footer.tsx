"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#0c0d14] py-16 z-10 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Callout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-start">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#e5c378] uppercase">
              Available for Opportunities
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Let's create something extraordinary together.
            </h3>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Full Stack & Android Developer building production-grade web applications, Flutter cross-platform platforms, and secure PostgreSQL architectures.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col md:items-end justify-between gap-4">
            <a
              href={PERSONAL_INFO.social.email}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e5c378] text-black font-semibold text-sm hover:bg-[#f3d592] transition-all hover:scale-[1.02]"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-xs font-mono text-gray-500">
              {PERSONAL_INFO.location}
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 border-b border-white/5 text-sm">
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-white transition-colors">
                  Skills
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase">
              Engineering
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/experience" className="hover:text-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/ai-tools" className="hover:text-white transition-colors">
                  AI Coding Suite
                </Link>
              </li>
              <li>
                <Link href="/education" className="hover:text-white transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase">
              Featured Work
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/projects/earn-master" className="hover:text-white transition-colors">
                  Earn Master
                </Link>
              </li>
              <li>
                <Link href="/projects/restaurant-lead-finder" className="hover:text-white transition-colors">
                  Lead Finder
                </Link>
              </li>
              <li>
                <Link href="/projects/code-master" className="hover:text-white transition-colors">
                  Code Master Android
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#e5c378] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#e5c378] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.social.email}
                className="flex items-center gap-2 hover:text-[#e5c378] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Vishesh Kumar. Crafted with Next.js & TypeScript.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
