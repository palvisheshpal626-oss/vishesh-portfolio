"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Layers, 
  Code2, 
  Layout, 
  Server, 
  Smartphone, 
  ShieldCheck, 
  Network, 
  Wrench, 
  Cpu, 
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import { SKILL_CATEGORIES, AI_CODING_TOOLS, ProficiencyLevel } from "@/data/portfolio-data";
import HUDCard from "@/components/HUDCard";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Code2,
  Layout,
  Server,
  Smartphone,
  ShieldCheck,
  Network,
  Wrench,
};

export default function SkillsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedProficiency, setSelectedProficiency] = useState<string>("All");

  const categoriesToDisplay = SKILL_CATEGORIES.map((cat) => {
    const filteredSkills = cat.skills.filter((skill) => {
      if (selectedProficiency === "All") return true;
      return skill.proficiency === selectedProficiency;
    });
    return {
      ...cat,
      skills: filteredSkills,
    };
  }).filter((cat) => {
    if (selectedFilter !== "All" && cat.title !== selectedFilter) return false;
    return cat.skills.length > 0;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
          // Technical Arsenal & Tooling
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Skills & Technologies
        </h1>
        <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
          Classified by functional engineering domains and realistic practical proficiency. No fabricated percentage bars or arbitrary scores.
        </p>
      </div>

      {/* Proficiency Legend & Filter */}
      <div className="p-5 rounded-2xl bg-[#13141d] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Proficiency Filter:</span>
          <div className="flex flex-wrap gap-1.5">
            {["All", "Strong Practical Experience", "Working Knowledge"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedProficiency(level)}
                className={`px-3 py-1 rounded-full transition-all ${
                  selectedProficiency === level
                    ? "bg-[#e5c378] text-black font-semibold"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Strong Practical Experience
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Working Knowledge
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-white/[0.08]">
        <button
          onClick={() => setSelectedFilter("All")}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            selectedFilter === "All"
              ? "bg-[#e5c378] text-black font-semibold shadow-md shadow-[#e5c378]/20"
              : "bg-white/5 border border-white/[0.08] text-gray-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          All Domains
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.title}
            onClick={() => setSelectedFilter(cat.title)}
            className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
              selectedFilter === cat.title
                ? "bg-[#e5c378] text-black font-semibold shadow-md shadow-[#e5c378]/20"
                : "bg-white/5 border border-white/[0.08] text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesToDisplay.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.iconName] || Layers;
          return (
            <HUDCard
              key={cat.title}
              title={cat.title}
              telemetryCode={`${cat.skills.length} TECHNOLOGIES`}
              className="flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#e5c378]/10 border border-[#e5c378]/20 text-[#e5c378] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">{cat.title}</h3>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-[#e5c378]/30 transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-200">
                          {skill.name}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                            skill.proficiency === "Strong Practical Experience"
                              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                              : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          }`}
                        >
                          {skill.proficiency}
                        </span>
                      </div>
                      {skill.tag && (
                        <span className="text-[10px] font-mono text-gray-400 block">
                          Focus: {skill.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </HUDCard>
          );
        })}
      </div>

      {/* AI CODING TOOLS & WORKSTATION */}
      <div className="pt-8">
        <HUDCard title="Intelligent Tooling Roster" telemetryCode="AI.SPEC // 07 WORKSTATION TOOLS">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                AI Coding Tools & Development Agents
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
                Advanced AI coding systems I use for multi-file refactoring, autonomous debugging, terminal workflows, and schema design.
              </p>
            </div>
            <Link
              href="/ai-tools"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e5c378] text-black text-xs font-semibold hover:bg-[#f3d592] transition-all"
            >
              <span>Explore AI Workstation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_CODING_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="p-5 rounded-2xl bg-[#0e1017] border border-white/[0.07] hover:border-[#e5c378]/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-white">{tool.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#e5c378]">
                    {tool.badge}
                  </span>
                </div>
                <p className="text-xs font-mono text-gray-400 mb-1">{tool.role}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </HUDCard>
      </div>

    </div>
  );
}
