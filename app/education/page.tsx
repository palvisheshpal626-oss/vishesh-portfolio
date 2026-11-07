import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  BookOpen, 
  MapPin, 
  CheckCircle2, 
  ArrowUpRight,
  FileDown
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import HUDCard from "@/components/HUDCard";

export const metadata = {
  title: "Education & Academic Background | Vishesh Kumar",
  description: "Academic degree and computer applications coursework of Vishesh Kumar at VKIT Bijnor (GJUM Moradabad)."
};

const COURSEWORK = [
  {
    title: "Database Management Systems (DBMS)",
    topics: "Relational schema design, SQL, normalization, transactions (ACID), and database integrity."
  },
  {
    title: "Object-Oriented Programming (OOP)",
    topics: "Polymorphism, inheritance, encapsulation, design patterns using Java and Kotlin."
  },
  {
    title: "Data Structures & Algorithms (DSA)",
    topics: "Arrays, linked lists, trees, graphs, sorting, searching, and algorithmic complexity."
  },
  {
    title: "Web Technologies & Internet Computing",
    topics: "HTTP protocols, client-server models, RESTful APIs, responsive layouts, DOM manipulation."
  },
  {
    title: "Software Engineering Principles",
    topics: "SDLC methodologies, requirement specifications, testing paradigms, and version control."
  },
  {
    title: "Mobile Application Architecture",
    topics: "Android runtime, lifecycle management, UI components, background services, and storage."
  }
];

export default function EducationPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
          // Academic Foundation & Studies
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Education & Academics
        </h1>
        <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
          Formal academic training in computer applications paired with rigorous real-world software engineering practice.
        </p>
      </div>

      {/* Main Degree Card */}
      <HUDCard telemetryCode="ACAD // BCA-PROGRAM">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6 mb-6">
          <div>
            <span className="text-xs font-mono text-[#e5c378] uppercase tracking-wider block mb-1">
              Undergraduate Degree Program
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {PERSONAL_INFO.education.degree}
            </h2>
            <p className="text-base font-semibold text-gray-300 mt-1">
              Bachelor of Computer Applications
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 font-mono text-xs">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold w-fit">
              ● {PERSONAL_INFO.education.status}
            </span>
            <span className="text-gray-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#e5c378]" />
              {PERSONAL_INFO.location}
            </span>
          </div>
        </div>

        {/* Institution Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
            <span className="text-[11px] font-mono text-gray-400 block uppercase tracking-wider">
              College Institute
            </span>
            <h3 className="text-base font-bold text-white">
              {PERSONAL_INFO.education.institute}
            </h3>
            <p className="text-xs text-gray-400">
              Department of Computer Applications & Technology
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
            <span className="text-[11px] font-mono text-gray-400 block uppercase tracking-wider">
              Affiliated University
            </span>
            <h3 className="text-base font-bold text-white">
              {PERSONAL_INFO.education.university}
            </h3>
            <p className="text-xs text-gray-400">
              State University Accreditation & Curriculum
            </p>
          </div>
        </div>

        {/* Core Coursework Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#e5c378]" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Key Academic Modules & Coursework
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COURSEWORK.map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#e5c378]/30 transition-all space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e5c378] shrink-0" />
                  <h5 className="text-xs font-bold text-white">{item.title}</h5>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed pl-5">
                  {item.topics}
                </p>
              </div>
            ))}
          </div>
        </div>
      </HUDCard>

      {/* Practical Bridge Section */}
      <div className="p-8 rounded-3xl bg-[#13141d] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Theory Applied in Production</h3>
          <p className="text-xs text-gray-400 max-w-xl">
            Every academic concept—from relational normal forms to OOP design patterns—is directly executed in my live software projects like Earn Master and Code Master.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e5c378] text-black font-semibold text-xs hover:bg-[#f3d592] transition-all whitespace-nowrap shadow-lg shadow-[#e5c378]/20"
        >
          <span>Explore Projects</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
