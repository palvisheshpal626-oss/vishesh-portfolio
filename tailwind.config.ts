import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#111218",
        "surface-card": "#161822",
        "surface-card-hover": "#1e2130",
        "surface-border": "#252838",
        accent: {
          DEFAULT: "#e5c378",
          hover: "#f3d592",
          dim: "#b8974e",
        },
        framer: {
          bg: "#0a0a0f",
          card: "#13141d",
          cardHover: "#1b1d2a",
          border: "#232636",
          borderLight: "#32364c",
          text: "#f4f4f7",
          muted: "#9498ad",
          gold: "#e5c378",
        },
        // Legacy fallbacks
        "neon-cyan": "#e5c378",
        "neon-blue": "#6366f1",
        "neon-purple": "#8b5cf6",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        "framer-card": "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        "framer-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(229, 195, 120, 0.25)",
        "framer-glow": "0 0 40px -5px rgba(229, 195, 120, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
