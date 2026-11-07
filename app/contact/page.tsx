"use client";

import React, { useState } from "react";
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck,
  AlertCircle,
  ArrowUpRight,
  Briefcase
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import HUDCard from "@/components/HUDCard";

const ENGAGEMENT_OPTIONS = [
  { label: "Internship Opportunities", defaultSubject: "Internship Opportunity - Vishesh Kumar" },
  { label: "Full-Time Developer Roles", defaultSubject: "Full-Time Software Developer Role - Vishesh Kumar" },
  { label: "Freelance Projects", defaultSubject: "Freelance Project Inquiry - Vishesh Kumar" },
  { label: "Remote Work", defaultSubject: "Remote Developer Opportunity - Vishesh Kumar" }
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "ready" | "dispatched">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSelectPreset = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: subject,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in all required fields before initiating dispatch.");
      return;
    }

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject.trim() || `[Portfolio Inquiry] from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.subject || "General Engineering"}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
    setStatus("dispatched");
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-semibold tracking-widest text-[#e5c378] uppercase">
          // Direct Communication & Recruiting
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Start a Conversation
        </h1>
        <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
          Open to full-time developer roles, full stack and Android internships, remote team opportunities, and freelance consulting projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Email Channel Card */}
          <HUDCard title="Primary Direct Channel" telemetryCode="EMAIL">
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#e5c378]/10 border border-[#e5c378]/20 text-[#e5c378] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-xs font-mono text-gray-400 block uppercase">
                    Official Developer Email
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm sm:text-base font-bold text-white hover:text-[#e5c378] transition-colors break-all block mt-0.5"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#e5c378]/50 hover:bg-white/10 text-xs font-medium text-white transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Email Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#e5c378]" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>
          </HUDCard>

          {/* Location & Coordinates */}
          <HUDCard title="Geographic Base & Remote Availability" telemetryCode="LOCATION">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-gray-400 block uppercase">
                  Location & Timezone
                </span>
                <p className="text-sm font-bold text-white mt-0.5">
                  {PERSONAL_INFO.location}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  IST (UTC +05:30) • Equipped for asynchronous & real-time remote collaboration worldwide.
                </p>
              </div>
            </div>
          </HUDCard>

          {/* Verified Profiles */}
          <HUDCard title="Verified Developer Profiles" telemetryCode="PROFILES">
            <div className="space-y-2.5">
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-[#e5c378]/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-gray-300 group-hover:text-[#e5c378] transition-colors" />
                  <div>
                    <span className="text-sm font-bold text-white block">GitHub Profile</span>
                    <span className="text-[11px] font-mono text-gray-400">@palvisheshpal626-oss</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#e5c378] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-[#e5c378]/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-[#e5c378] transition-colors" />
                  <div>
                    <span className="text-sm font-bold text-white block">LinkedIn Profile</span>
                    <span className="text-[11px] font-mono text-gray-400">vishesh-kumar-516a433a6</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#e5c378] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </HUDCard>

        </div>

        {/* Right Column: Functional Message Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <HUDCard title="Send a Direct Message" telemetryCode="INQUIRY">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Engagement Type Presets */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300 uppercase block">
                  Select Opportunity Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {ENGAGEMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelectPreset(opt.defaultSubject)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                        formData.subject === opt.defaultSubject
                          ? "bg-[#e5c378] text-black font-semibold"
                          : "bg-white/5 border border-white/[0.08] text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-gray-300 uppercase">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Hiring Manager / Client Name"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e15] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#e5c378] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-gray-300 uppercase">
                    Your Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. recruiter@company.com"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e15] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#e5c378] transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-mono text-gray-300 uppercase">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer Role / Project Discussion"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e15] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#e5c378] transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono text-gray-300 uppercase">
                  Message Details <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details regarding your role, team, timeline, or project specifications..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e15] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#e5c378] transition-all resize-y"
                />
              </div>

              {/* Error Warning */}
              {errorMsg && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Transmission Info Notice */}
              <p className="text-[11px] font-mono text-gray-400">
                ℹ Submitting will open your default email client pre-populated with your inquiry routed directly to Vishesh Kumar.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#e5c378] text-black font-semibold text-sm hover:bg-[#f3d592] hover:scale-[1.01] transition-all shadow-lg shadow-[#e5c378]/20"
              >
                <Send className="w-4 h-4" />
                <span>Send Message via Email</span>
              </button>

              {/* Status Message */}
              {status === "dispatched" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <span className="font-bold block">Email Client Triggered!</span>
                    If your client did not open automatically, reach out directly at{" "}
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="underline text-white font-bold">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
              )}

            </form>
          </HUDCard>
        </div>

      </div>

    </div>
  );
}
