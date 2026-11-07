import React from "react";
import Link from "next/link";
import { 
  Cpu, 
  Sparkles, 
  Terminal, 
  Code2, 
  Bug, 
  FileCheck, 
  RefreshCw, 
  Network, 
  Layers, 
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import { AI_CODING_TOOLS, AI_WORKFLOWS } from "@/data/portfolio-data";
import HUDCard from "@/components/HUDCard";

export const metadata = {
  title: "AI Development Workstation & Tools | Vishesh Kumar",
  description: "How Vishesh Kumar leverages agentic AI coding tools (Claude Code, Google Antigravity, Cursor, Windsurf) to accelerate software delivery with strict human verification."
};

const PRACTICAL_USE_CASES = [
  {
    title: "Codebase Analysis & Context Mapping",
    description: "Parsing multi-file repositories, dependency trees, and architectural patterns to understand complex codebases rapidly.",
    icon: Layers,
  },
  {
    title: "AI-Assisted Scaffolding & Generation",
    description: "Using tools like Claude Code and Google Antigravity to scaffold routes, generate typed schema models, and run test suites under direct supervision.",
    icon: Terminal,
  },
  {
    title: "Systematic Debugging & Error Tracing",
    description: "Analyzing stack traces, unhandled exceptions, and edge-case reproduction steps to identify precise root causes quickly.",
    icon: Bug,
  },
  {
    title: "API Integration & Schema Validation",
    description: "Synthesizing OpenAPI specs, generating TypeScript interfaces, parsing REST payloads (Judge0, OpenStreetMap), and validating payloads.",
    icon: Network,
  },
  {
    title: "Code Review & Security Audits",
    description: "Reviewing code against clean-code principles, identifying performance bottlenecks, and checking Row Level Security (RLS) leak risks.",
    icon: RefreshCw,
  },
  {
    title: "Development Planning & Documentation",
    description: "Drafting technical architecture blueprints, markdown API guides, and step-by-step rollout plans for clients and teams.",
    icon: FileCheck,
  }
];

export default function AIToolsPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
          // Intelligent Development Environment
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI-Powered Workstation & Tools
        </h1>
        <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
          How I integrate state-of-the-art agentic AI systems into daily software engineering workflows to increase productivity, eliminate boilerplate, and maintain high standards of code quality.
        </p>
      </div>

      {/* Human Accountability Declaration */}
      <HUDCard telemetryCode="GOVERNANCE // 100% VERIFIED">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#e5c378]/10 border border-[#e5c378]/20 text-[#e5c378] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">The Human Ownership Protocol</h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
              AI tools dramatically accelerate research, scaffolding, and debugging, but <strong className="text-white">I retain full personal accountability</strong> for every line of code deployed. Every AI-assisted suggestion is subjected to rigorous manual code review, unit verification, and security testing before reaching production.
            </p>
          </div>
        </div>
      </HUDCard>

      {/* AI Tool Suite Cards */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Active Intelligent Tooling Roster
          </h2>
          <p className="text-xs text-gray-400">
            Dedicated tools configured in my personal engineering setup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_CODING_TOOLS.map((tool) => (
            <HUDCard
              key={tool.name}
              title={tool.name}
              telemetryCode={tool.badge}
              className="flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#e5c378] block">
                  {tool.role}
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </HUDCard>
          ))}
        </div>
      </div>

      {/* Practical Use Cases Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Applied Practical Use Cases
          </h2>
          <p className="text-xs text-gray-400">
            Real tasks where AI assistance delivers measurable acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRACTICAL_USE_CASES.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.title}
                className="p-5 rounded-2xl bg-[#13141d] border border-white/[0.07] hover:border-[#e5c378]/30 transition-all space-y-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-[#e5c378]">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">{uc.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {uc.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workflow Step Sequence */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Five-Step Verification Lifecycle
          </h2>
          <p className="text-xs text-gray-400">
            Disciplined workflow from prompt engineering to human sign-off.
          </p>
        </div>

        <div className="space-y-3">
          {AI_WORKFLOWS.map((wf) => (
            <div
              key={wf.step}
              className="p-5 rounded-2xl bg-[#13141d] border border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-[#e5c378]/30 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e5c378]/10 text-[#e5c378] font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                {wf.step}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">{wf.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{wf.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Callout */}
      <div className="p-8 rounded-3xl bg-[#13141d] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Experience AI-Augmented Engineering</h3>
          <p className="text-xs text-gray-400 max-w-xl">
            See how these tools assisted in the architecture and delivery of Earn Master and Restaurant Lead Finder.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e5c378] text-black font-semibold text-xs hover:bg-[#f3d592] transition-all whitespace-nowrap shadow-lg shadow-[#e5c378]/20"
        >
          <span>View Projects</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
