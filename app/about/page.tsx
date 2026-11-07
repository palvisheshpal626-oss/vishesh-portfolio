import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Code2, 
  Database, 
  ShieldCheck, 
  FileDown, 
  ArrowUpRight,
  Layers,
  Cpu
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import HUDCard from "@/components/HUDCard";

export const metadata = {
  title: "About Me | Vishesh Kumar — Full Stack & Android Developer",
  description: "Learn about Vishesh Kumar's technical background, BCA studies at VKIT Bijnor, practical software engineering philosophy, and database security architecture."
};

export default function AboutPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* Top Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
          // Biography & Background
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About Vishesh Kumar
        </h1>
        <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
          BCA student and practical software developer driven by building resilient web applications, native Android experiences, and secure database architectures.
        </p>
      </div>

      {/* Main Grid: Visual Spotlight with Second Photograph & Detailed Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Second Personal Photograph (Blue Hoodie Portrait) (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-3xl bg-[#13141d] border border-white/10 p-5 shadow-2xl overflow-hidden group">
            
            {/* Top Reticle */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs">
              <span className="text-[#e5c378] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e5c378]" />
                Workspace Profile
              </span>
              <span className="font-mono text-gray-500">Bijnor, UP</span>
            </div>

            {/* The Second Supplied Image (Blue-toned hoodie portrait) */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-[#161824]">
              <Image
                src={PERSONAL_INFO.images.workspacePortrait}
                alt="Vishesh Kumar - Personal Profile Photo"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
            </div>

            {/* Verification & Location Strip */}
            <div className="mt-5 space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/[0.05]">
                <span className="text-gray-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#e5c378]" />
                  Location:
                </span>
                <span className="text-white font-medium">{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/[0.05]">
                <span className="text-gray-400 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  Education:
                </span>
                <span className="text-white font-medium">BCA (Currently Pursuing)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/[0.05]">
                <span className="text-gray-400 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Primary Focus:
                </span>
                <span className="text-white font-medium">Full Stack & Android</span>
              </div>
            </div>

            {/* Resume Button in About */}
            <div className="pt-4">
              <a
                href={PERSONAL_INFO.resume.downloadUrl}
                download={PERSONAL_INFO.resume.filename}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#e5c378] text-black font-semibold text-xs hover:bg-[#f3d592] transition-all hover:scale-[1.02]"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Official ATS Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Engineering Philosophy Card */}
          <HUDCard title="Engineering Philosophy" telemetryCode="PHILOSOPHY // 01">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Practical Development Grounded in Real Software Products
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              I am currently pursuing my Bachelor of Computer Applications (BCA) at VKIT, Bijnor (affiliated with GJUM, Moradabad). Rather than merely learning textbook syntax, I believe that true software engineering competence is forged through building real, functioning applications that tackle actual business and user challenges.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              My hands-on experience spans across cross-platform mobile apps (Flutter, native Android with Kotlin and MVVM), full-stack web applications (Next.js, React), and cloud databases (Supabase, PostgreSQL). I place exceptional priority on database modeling, Row Level Security (RLS), and API contract integrity to guarantee that applications remain secure, high-performing, and resilient.
            </p>
          </HUDCard>

          {/* Technical Problem-Solving Approach */}
          <HUDCard title="Problem-Solving Approach" telemetryCode="WORKFLOW // 02">
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#e5c378]/10 border border-[#e5c378]/20 text-[#e5c378] flex items-center justify-center shrink-0 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Database-First Architecture</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Structuring relational data models carefully in PostgreSQL with foreign keys, constraints, and Row Level Security (RLS) policies before writing frontend interfaces ensures predictable, leak-proof state.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Clean Component & Architectural Separation</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Adhering to MVVM in Android and modular component boundaries in React/Next.js so that logic, network requests, and presentation remain independent, testable, and maintainable.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Agentic AI Acceleration with Strict Human Audit</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Utilizing tools like Claude Code, Google Antigravity, and Cursor to accelerate exploration, generate boilerplate, and analyze exceptions—while retaining 100% human accountability for code review and verification.
                  </p>
                </div>
              </div>
            </div>
          </HUDCard>

          {/* Professional Interests */}
          <HUDCard title="Professional Interests" telemetryCode="AREAS // 03">
            <div className="flex flex-wrap gap-2">
              {[
                "Full Stack Web Development",
                "Android App Engineering",
                "Backend Architecture",
                "PostgreSQL Database Design",
                "Row Level Security (RLS)",
                "Third-Party API Integration",
                "Python Automation & Scripting",
                "AI-Assisted Development"
              ].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-xs font-mono text-gray-300"
                >
                  {interest}
                </span>
              ))}
            </div>
          </HUDCard>

          {/* Navigation links */}
          <div className="flex items-center justify-between pt-4">
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e5c378] hover:underline"
            >
              <span>Explore Technical Skills Dashboard</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
