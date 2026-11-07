"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Filter } from "lucide-react";
import { PROJECTS } from "@/data/portfolio-data";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");

  const categories = [
    "All",
    "Gaming & Rewards Platform",
    "Full Stack Web Application",
    "Android Application",
    "Web Application",
    "Automation Tool",
    "Client Solution Design"
  ];

  const filteredProjects =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
          // Portfolio Showcase
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Selected Works & Systems
        </h1>
        <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
          Comprehensive breakdown of production applications and architectures I have designed and deployed, spanning cross-platform mobile apps, full-stack geospatial systems, and cloud databases.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#e5c378]" />
          <span>Category:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === cat
                ? "bg-[#e5c378] text-black font-semibold shadow-md shadow-[#e5c378]/20"
                : "bg-white/5 border border-white/[0.08] text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            featuredNumber={`0${idx + 1}`}
          />
        ))}
      </div>

      {/* Footer Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#13141d] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white">Have a specific project in mind?</h3>
          <p className="text-xs text-gray-400 max-w-md">
            I am available for freelance projects, technical architecture reviews, and engineering roles.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e5c378] text-black font-semibold text-xs hover:bg-[#f3d592] transition-all hover:scale-[1.02] whitespace-nowrap shadow-lg shadow-[#e5c378]/20"
        >
          <span>Discuss Your Project</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
