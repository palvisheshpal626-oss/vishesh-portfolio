import React from "react";

interface HUDCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "blue" | "gold";
  title?: string;
  telemetryCode?: string;
}

export default function HUDCard({
  children,
  className = "",
  title,
  telemetryCode,
}: HUDCardProps) {
  return (
    <div
      className={`relative rounded-2xl bg-[#13141d] border border-white/[0.07] p-6 transition-all duration-300 hover:border-[#e5c378]/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 ${className}`}
    >
      {/* Optional Top Header Bar */}
      {(title || telemetryCode) && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-xs">
          {title && (
            <span className="font-medium text-white tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5c378]" />
              {title}
            </span>
          )}
          {telemetryCode && (
            <span className="font-mono text-gray-500 text-[11px] tracking-wider uppercase">
              {telemetryCode}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
