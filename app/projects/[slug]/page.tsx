import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  ArrowUpRight,
  Database,
  Cpu,
  Layers,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Terminal,
  FileCode,
  Globe
} from "lucide-react";
import { PROJECTS, Project } from "@/data/portfolio-data";
import HUDCard from "@/components/HUDCard";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Case Study | Vishesh Kumar`,
    description: `${project.title}: ${project.tagline}`,
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#e5c378] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to All Projects</span>
      </Link>

      {/* Hero Header */}
      <div className="space-y-4 border-b border-white/[0.08] pb-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/[0.08] text-gray-300">
            {project.category}
          </span>

          {/* Project Status Badge */}
          {project.projectStatus === "Live Deployed Application" ? (
            <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Deployed Application
            </span>
          ) : project.projectStatus === "Client Solution Design & Prototype" ? (
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">
              Client Solution Design & Prototype
            </span>
          ) : (
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
              {project.projectStatus}
            </span>
          )}
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl font-medium text-gray-300 max-w-3xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Live and GitHub Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e5c378] text-black font-semibold text-xs hover:bg-[#f3d592] hover:scale-[1.02] transition-all shadow-lg shadow-[#e5c378]/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Live Application</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#13141d] border border-white/10 text-white font-medium text-xs hover:border-[#e5c378]/50 hover:text-white transition-all"
            >
              <Github className="w-4 h-4 text-[#e5c378]" />
              <span>View Source Code on GitHub</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Case Study Breakdown */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Project Overview */}
          <HUDCard title="1. Project Overview" telemetryCode="OVERVIEW">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </HUDCard>

          {/* 2. Problem Statement & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HUDCard title="2. Problem Statement" telemetryCode="CHALLENGE">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {project.problem}
              </p>
            </HUDCard>

            <HUDCard title="3. Engineered Solution" telemetryCode="APPROACH">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </HUDCard>
          </div>

          {/* 4. My Role & Responsibilities */}
          <HUDCard title="4. My Role & Engineering Responsibilities" telemetryCode="RESPONSIBILITY">
            <ul className="space-y-3">
              {project.myContribution.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  <span className="text-[#e5c378] font-mono font-bold shrink-0">0{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </HUDCard>

          {/* 5. System Architecture & Data Flow */}
          <HUDCard title="5. Architecture & Implementation" telemetryCode="ARCHITECTURE">
            <div className="p-4 rounded-xl bg-[#0d0e15] border border-white/[0.08] font-mono text-xs text-[#e5c378] leading-relaxed mb-4 overflow-x-auto">
              <code>{project.architectureDetails}</code>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Implemented with clean separation of concerns: client rendering, edge routing/execution, and relational persistence.
            </p>
          </HUDCard>

          {/* 6. Key Implemented Features */}
          <HUDCard title="6. Key Implemented Features" telemetryCode="CAPABILITIES">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-[#e5c378]/30 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#e5c378] shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-200 leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </HUDCard>

          {/* 7. Technical Challenges & Solutions Implemented */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HUDCard title="7. Technical Challenges" telemetryCode="BLOCKERS">
              <ul className="space-y-3">
                {project.technicalChallenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </HUDCard>

            <HUDCard title="8. Solutions Implemented" telemetryCode="RESOLUTION">
              <ul className="space-y-3">
                {project.solutionsImplemented.map((solution, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed">
                    <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </HUDCard>
          </div>

        </div>

        {/* Right Sidebar (4 cols): Metadata, Tech Stack & Verification */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Project Status Sheet */}
          <HUDCard title="Project Credibility & Status" telemetryCode="METADATA">
            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
                <span className="text-gray-400">Classification:</span>
                <span className="text-white font-semibold text-right">{project.projectStatus}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
                <span className="text-gray-400">Primary Developer:</span>
                <span className="text-white font-semibold">Vishesh Kumar</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
                <span className="text-gray-400">Category:</span>
                <span className="text-white font-semibold">{project.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
                <span className="text-gray-400">Live Status:</span>
                <span className={project.liveUrl ? "text-emerald-400 font-semibold" : "text-gray-400"}>
                  {project.liveUrl ? "Live Deployed" : "Repository / Design Spec"}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-400">Verification:</span>
                <span className="text-[#e5c378] font-semibold">
                  {project.liveUrl ? "Public URL Verified" : "GitHub Tracked"}
                </span>
              </div>
            </div>
          </HUDCard>

          {/* Technologies Used */}
          <HUDCard title="Technologies Used" telemetryCode="STACK">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-[#181a24] border border-white/[0.07] text-xs font-mono text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </HUDCard>

          {/* Related Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider">
              // Other Works
            </h4>
            <div className="space-y-3">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/projects/${rel.slug}`}
                  className="block p-4 rounded-2xl bg-[#13141d] border border-white/[0.07] hover:border-[#e5c378]/30 transition-all group"
                >
                  <span className="text-[10px] font-mono text-[#e5c378] block mb-1">
                    {rel.category}
                  </span>
                  <h5 className="text-sm font-bold text-white group-hover:text-[#e5c378] transition-colors">
                    {rel.title}
                  </h5>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                    {rel.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
