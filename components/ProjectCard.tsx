import React from "react";
import Link from "next/link";
import { ExternalLink, Github, ArrowUpRight, Gamepad2, Compass, Smartphone, Code, PlaySquare, Hotel } from "lucide-react";
import { Project } from "@/data/portfolio-data";

const PROJECT_ICONS: Record<string, React.ElementType> = {
  "earn-master": Gamepad2,
  "restaurant-lead-finder": Compass,
  "code-master": Smartphone,
  "code-compiler": Code,
  "instagram-automation": PlaySquare,
  "hotel-management": Hotel,
};

interface ProjectCardProps {
  project: Project;
  featuredNumber?: string;
}

export default function ProjectCard({ project, featuredNumber }: ProjectCardProps) {
  const Icon = PROJECT_ICONS[project.slug] || Code;

  return (
    <div className="group relative rounded-2xl bg-[#13141d] border border-white/[0.07] p-7 transition-all duration-300 hover:border-[#e5c378]/30 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/70 flex flex-col justify-between">
      <div>
        {/* Top Header: Number / Category & Status */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            {featuredNumber && (
              <span className="text-xs font-mono font-bold text-[#e5c378]">
                {featuredNumber}
              </span>
            )}
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/[0.08] text-gray-300">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.projectStatus === "Live Deployed Application" ? (
              <span className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Deployed
              </span>
            ) : project.projectStatus === "Client Solution Design & Prototype" ? (
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Client Prototype
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/[0.08]">
                {project.projectStatus.replace("Completed ", "")}
              </span>
            )}
          </div>
        </div>

        {/* Project Title & Icon */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-[#e5c378] group-hover:bg-[#e5c378]/10 group-hover:border-[#e5c378]/30 transition-all shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#e5c378] transition-colors">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm font-medium text-gray-300 mb-3">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#191b26] border border-white/[0.05] text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-gray-400">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2 mt-auto">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#e5c378] transition-colors"
        >
          <span>View Case Study</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/[0.08] text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Open Live Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/[0.08] text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
