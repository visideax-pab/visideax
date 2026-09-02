import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2.5rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        alpine: {
          slate: "#0B2E4E",
          navy: "#123B61",
          gold: "#38B6FF",
          silver: "#B8C4D0",
          cream: "#F4F9FC",
        },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0B2E4E",
          foreground: "#F4F9FC",
        },
        secondary: {
          DEFAULT: "#38B6FF",
          foreground: "#0B2E4E",
        },
        muted: {
          DEFAULT: "#EEF4F9",
          foreground: "#4A5C6B",
        },
        accent: {
          DEFAULT: "#38B6FF",
          foreground: "#0B2E4E",
        },
        destructive: {
          DEFAULT: "#7A2E2E",
          foreground: "#F4F9FC",
        },
        input: "hsl(var(--input))",
        ring: "#38B6FF",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "alpine-gradient":
          "linear-gradient(160deg, #0B2E4E 0%, #123B61 55%, #0B2E4E 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent 0%, #38B6FF 50%, transparent 100%)",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(56,182,255,0.35)",
        elevated: "0 20px 60px -20px rgba(11,46,78,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in": "fade-in 1s ease forwards",
        shimmer: "shimmer 3s linear infinite",
        kenburns: "kenburns 20s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
