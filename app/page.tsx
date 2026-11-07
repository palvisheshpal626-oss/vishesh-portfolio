import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  FileDown, 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles, 
  Code2, 
  Smartphone, 
  Database, 
  Terminal,
  MapPin,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowRight
} from "lucide-react";
import { PERSONAL_INFO, PROJECTS, CORE_COMPETENCIES, AI_CODING_TOOLS } from "@/data/portfolio-data";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  return (
    <div className="relative">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION                                              */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introduction & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Availability Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open to Full-Time Roles, Internships & Freelance</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                {PERSONAL_INFO.displayName}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#e5c378] tracking-wide">
                {PERSONAL_INFO.primaryTitle}
              </p>
            </div>

            {/* Introduction Quote */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed border-l-2 border-[#e5c378] pl-4">
              "{PERSONAL_INFO.intro}"
            </p>

            {/* Opportunities Quick Pills for Recruiters */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
                // Target Engagements
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Software Developer Jobs",
                  "Full Stack Internships",
                  "Android Internships",
                  "Remote Roles",
                  "Freelance Projects"
                ].map((opp) => (
                  <span
                    key={opp}
                    className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#e5c378]" />
                    {opp}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e5c378] text-black font-semibold text-sm hover:bg-[#f3d592] hover:scale-[1.02] transition-all shadow-lg shadow-[#e5c378]/20"
              >
                <span>Explore My Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={PERSONAL_INFO.resume.downloadUrl}
                download={PERSONAL_INFO.resume.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#13141d] border border-white/10 text-white font-medium text-sm hover:border-[#e5c378]/50 hover:bg-white/5 transition-all"
              >
                <FileDown className="w-4 h-4 text-[#e5c378]" />
                <span>Download Resume</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium text-sm hover:text-white hover:bg-white/10 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Social Connectivity */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/[0.08] text-gray-400">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                Verified Channels:
              </span>
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.social.email}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span className="text-xs font-mono text-gray-400 ml-auto flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#e5c378]" />
                {PERSONAL_INFO.location}
              </span>
            </div>

          </div>

          {/* Right Column: Exact Specified Profile Image (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-sm sm:max-w-md">
              
              {/* Soft ambient backlight glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#e5c378]/20 via-purple-500/10 to-indigo-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-500" />
              
              {/* Framer Portrait Container */}
              <div className="relative rounded-3xl overflow-hidden bg-[#13141d] border border-white/10 shadow-2xl shadow-black/80">
                <div className="relative aspect-[4/5] w-full bg-[#161824]">
                  <Image
                    src="/f11c5b9d-9439-4ec9-ae86-f60bd7029a30.png"
                    alt="Vishesh Kumar - Full Stack & Android Developer"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover object-top filter brightness-95 contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                </div>

                {/* Bottom info strip on portrait */}
                <div className="p-4 bg-[#11121a]/90 backdrop-blur-md border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Vishesh Kumar</h3>
                    <p className="text-[11px] font-mono text-[#e5c378]">BCA • Full Stack & Android</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Verified Developer
                  </span>
                </div>
              </div>

              {/* Floating Stat Card: Projects */}
              <div className="absolute -bottom-4 -left-4 p-3 rounded-2xl bg-[#161824]/95 backdrop-blur-xl border border-white/10 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e5c378]/10 border border-[#e5c378]/30 flex items-center justify-center text-[#e5c378]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-white">6 Practical Works</div>
                  <div className="text-[10px] font-mono text-gray-400">Web, Android & Backend</div>
                </div>
              </div>

              {/* Floating Stat Card: University */}
              <div className="absolute -top-4 -right-4 p-3 rounded-2xl bg-[#161824]/95 backdrop-blur-xl border border-white/10 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">VKIT, Bijnor</div>
                  <div className="text-[10px] font-mono text-gray-400">BCA (GJUM Affiliated)</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. RECRUITER & CLIENT OPPORTUNITIES MATRIX                    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-b border-white/[0.06] bg-[#0c0d15]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
                // Career & Consulting Availability
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Opportunities Open for Engagement
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e5c378] hover:underline"
            >
              <span>Initiate Inquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {PERSONAL_INFO.openTo.map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-2xl bg-[#13141d] border border-white/[0.07] hover:border-[#e5c378]/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mb-2" />
                  <h4 className="text-xs font-bold text-white leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. SELECTED WORK (All 6 Verified Projects)                   */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
                // Practical Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                All Six Software Engineering Projects
              </h2>
              <p className="text-sm text-gray-400 max-w-xl">
                Real software implementations with authentic architectures: live apps, native Android builds, geospatial web apps, and client design prototypes.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white border border-white/10 hover:border-[#e5c378]/50 hover:bg-white/5 transition-all w-fit"
            >
              <span>Explore Project Case Studies</span>
              <ArrowUpRight className="w-4 h-4 text-[#e5c378]" />
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                featuredNumber={`0${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. CORE DISCIPLINES & SKILLS                                */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0e15] border-t border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
              // Technical Competencies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineering Disciplines & Core Stack
            </h2>
            <p className="text-sm text-gray-400">
              Proficiencies backed by hands-on implementations in production codebases and Android Studio builds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Full Stack Web */}
            <div className="p-7 rounded-2xl bg-[#13141d] border border-white/[0.07] hover:border-[#e5c378]/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#e5c378]/10 border border-[#e5c378]/20 flex items-center justify-center text-[#e5c378]">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Full Stack Web Development</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Building responsive web applications using Next.js, React, TypeScript, and Tailwind CSS. Implementing clean server actions, API routes, and optimized rendering.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["Next.js", "React.js", "TypeScript", "Tailwind CSS", "REST APIs"].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2: Android & Mobile */}
            <div className="p-7 rounded-2xl bg-[#13141d] border border-white/[0.07] hover:border-[#e5c378]/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Android & Flutter Development</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Developing native Android apps using Kotlin, Material 3, and MVVM architecture, alongside cross-platform Flutter applications with state management and RLS backends.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["Kotlin", "Flutter", "Dart", "MVVM", "Android Studio", "Material 3"].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3: Backend & Database */}
            <div className="p-7 rounded-2xl bg-[#13141d] border border-white/[0.07] hover:border-[#e5c378]/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Backend & Database Architecture</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Designing PostgreSQL schemas, implementing strict Row Level Security (RLS) policies, writing Supabase Edge Functions, and building atomic wallet ledger systems.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["PostgreSQL", "Supabase", "Row Level Security (RLS)", "Edge Functions", "Auth"].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="text-center pt-2">
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e5c378] hover:underline"
            >
              <span>View Complete Classified Skills Matrix with Practical Proficiencies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* 5. ABOUT NARRATIVE & UNIVERSITY FOUNDATION                   */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Secondary Photos */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#161824] border border-white/10 shadow-lg">
                <Image
                  src="/assets/vishesh-hoodie-blue.png"
                  alt="Vishesh Kumar Development Environment"
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover"
                />
              </div>
              <div className="p-4 rounded-xl bg-[#13141d] border border-white/[0.06] text-center">
                <div className="text-xl font-extrabold text-[#e5c378]">BCA</div>
                <div className="text-[11px] font-mono text-gray-400">VKIT Bijnor (GJUM)</div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 rounded-xl bg-[#13141d] border border-white/[0.06] text-center">
                <div className="text-xl font-extrabold text-white">Genuine</div>
                <div className="text-[11px] font-mono text-gray-400">Human-Audited Code</div>
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#161824] border border-white/10 shadow-lg">
                <Image
                  src="/assets/vishesh-portrait-bw.jpeg"
                  alt="Vishesh Kumar Portrait"
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Narrative Details */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
              // Background & Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Practical Development Grounded in Genuine Code
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {PERSONAL_INFO.aboutDetailed}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#13141d] border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#e5c378]" />
                  <span>Independent Engineering</span>
                </div>
                <p className="text-xs text-gray-400">
                  Full lifecycle development covering data schemas, business logic, API integrations, and client UI.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#13141d] border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Sparkles className="w-4 h-4 text-[#e5c378]" />
                  <span>Strict Human Accountability</span>
                </div>
                <p className="text-xs text-gray-400">
                  AI tools accelerate research and boilerplate, but every commit is personally reviewed, tested, and verified.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#e5c378] hover:underline"
              >
                <span>Read Full Biography & Academic Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
              >
                <span>Review Experience Timeline</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* 6. AI WORKSTATION OVERVIEW                                   */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0e15] border-t border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
                // Developer Productivity
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                AI Coding Tools & Human Verification
              </h2>
              <p className="text-sm text-gray-400 max-w-xl">
                How modern terminal agents and autonomous IDEs are integrated into my workflow to accelerate delivery while keeping humans firmly in control.
              </p>
            </div>

            <Link
              href="/ai-tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white border border-white/10 hover:border-[#e5c378]/50 hover:bg-white/5 transition-all w-fit"
            >
              <span>Explore AI Workstation</span>
              <ArrowUpRight className="w-4 h-4 text-[#e5c378]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AI_CODING_TOOLS.slice(0, 4).map((tool) => (
              <div
                key={tool.name}
                className="p-5 rounded-2xl bg-[#13141d] border border-white/[0.07] hover:border-[#e5c378]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-white">{tool.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#e5c378]">
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-gray-400 mb-2">{tool.role}</p>
                  <p className="text-xs text-gray-400/90 leading-relaxed">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* 7. CONTACT CALL TO ACTION                                    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
            // Ready to Connect
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let's discuss how I can contribute to your team.
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            I am actively interviewing for software developer roles, full-stack and Android developer internships, and taking on select client engineering projects.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={PERSONAL_INFO.social.email}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#e5c378] text-black font-semibold text-sm hover:bg-[#f3d592] hover:scale-[1.02] transition-all shadow-xl shadow-[#e5c378]/20"
            >
              <Mail className="w-4 h-4" />
              <span>Email Vishesh Directly</span>
            </a>

            <a
              href={PERSONAL_INFO.resume.downloadUrl}
              download={PERSONAL_INFO.resume.filename}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#13141d] border border-white/10 text-white font-medium text-sm hover:border-[#e5c378]/50 hover:bg-white/5 transition-all"
            >
              <FileDown className="w-4 h-4 text-[#e5c378]" />
              <span>Download ATS Resume (PDF)</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#13141d] border border-white/10 text-white font-medium text-sm hover:border-[#e5c378]/50 hover:bg-white/5 transition-all"
            >
              <span>Contact Page</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
