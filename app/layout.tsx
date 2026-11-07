import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Vishesh Kumar | Full Stack Developer & Android Developer",
  description:
    "Official developer portfolio of Vishesh Kumar — Full Stack Developer & Android Developer. Practical software engineering with Flutter, Next.js, Supabase, PostgreSQL, Kotlin, and agentic AI tools.",
  keywords: [
    "Vishesh Kumar",
    "Full Stack Developer",
    "Android Developer",
    "Software Developer",
    "BCA",
    "Flutter",
    "Next.js",
    "Supabase",
    "PostgreSQL",
    "Earn Master",
    "Bijnor",
  ],
  authors: [{ name: "Vishesh Kumar" }],
  creator: "Vishesh Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://earn-master.online/",
    title: "Vishesh Kumar | Full Stack Developer & Android Developer",
    description:
      "Building Digital Experiences & Engineering Real-World Solutions. Explore projects, technical skills, and software architecture.",
    siteName: "Vishesh Kumar Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0a0a0f] text-[#f4f4f7] antialiased min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Subtle Framer-grade Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#e5c378]/10 to-transparent blur-[120px] rounded-full" />
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-b from-indigo-500/5 to-transparent blur-[140px] rounded-full" />
          <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-gradient-to-b from-[#e5c378]/5 to-transparent blur-[140px] rounded-full" />
        </div>

        {/* Top Floating Framer Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow relative z-10 pt-24 pb-16">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
