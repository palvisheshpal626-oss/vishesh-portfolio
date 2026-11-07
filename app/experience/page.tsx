import React from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  ArrowUpRight,
  FileDown,
  ShieldCheck,
  Code2,
  Smartphone,
  Layers
} from "lucide-react";
import { PERSONAL_INFO, EXPERIENCE_ITEMS } from "@/data/portfolio-data";
import HUDCard from "@/components/HUDCard";

export const metadata = {
  title: "Experience & Practical Work | Vishesh Kumar",
  description: "Professional timeline and applied engineering experience of Vishesh Kumar across full stack, Android, database security, and client solution designs."
};

export default function ExperiencePage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
          // Career Track & Practical Engineering
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Practical Development Experience
        </h1>
        <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
          Transparent, authentic documentation of my applied software development engineering, client design consultancy, and practical production projects.
        </p>
      </div>

      {/* Delineation Note */}
      <div className="p-5 rounded-2xl bg-[#13141d] border border-white/[0.08] text-xs text-gray-300 leading-relaxed font-mono">
        <strong className="text-[#e5c378] uppercase tracking-wider block mb-1">
          // Classification Transparency Note:
        </strong>
        Every entry reflects genuine hands-on technical work. I clearly differentiate between personal software initiatives (Earn Master, Restaurant Lead Finder), native Android builds (Code Master), client solution architecture (Hotel Guest Management), and independent/freelance engineering. No fictional corporate titles or inflated tenure claims.
      </div>

      {/* Timeline Section */}
      <div className="space-y-8">
        {EXPERIENCE_ITEMS.map((item, idx) => (
          <HUDCard key={idx} telemetryCode="TIMELINE // ACTIVE">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-5 mb-6">
              <div>
                <span className="text-xs font-mono text-[#e5c378] uppercase tracking-wider block">
                  {item.type}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{item.role}</h3>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-xs font-mono text-gray-300 w-fit">
                <Calendar className="w-3.5 h-3.5 text-[#e5c378]" />
                <span>{item.period}</span>
              </div>
            </div>

            {/* Key Deliverables & Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider">
                // Applied Deliverables & Engineering Accomplishments
              </h4>
              <ul className="space-y-3.5">
                {item.highlights.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#e5c378] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categorized Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-8 pt-6 border-t border-white/[0.06]">
              {item.categories.map((cat, cIdx) => (
                <div key={cIdx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#e5c378] block">
                    0{cIdx + 1}. {cat.name}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {cat.details}
                  </p>
                </div>
              ))}
            </div>
          </HUDCard>
        ))}
      </div>

      {/* Target Roles Strip */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Target Roles & Engagements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PERSONAL_INFO.openTo.map((role) => (
            <div
              key={role.title}
              className="p-4 rounded-2xl bg-[#13141d] border border-white/[0.07] space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <h4 className="text-xs font-bold text-white">{role.title}</h4>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed pl-3.5">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom Strip */}
      <div className="p-8 rounded-3xl bg-[#13141d] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white">Need verified documentation?</h3>
          <p className="text-xs text-gray-400 mt-1">
            Download my single-page ATS-friendly resume detailing all technologies, education, and GitHub repositories.
          </p>
        </div>
        <a
          href={PERSONAL_INFO.resume.downloadUrl}
          download={PERSONAL_INFO.resume.filename}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e5c378] text-black font-semibold text-xs hover:bg-[#f3d592] transition-all whitespace-nowrap"
        >
          <FileDown className="w-4 h-4" />
          <span>Download Resume (PDF)</span>
        </a>
      </div>

    </div>
  );
}
