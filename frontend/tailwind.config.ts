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
        brand: {
          purple: "#9B5CF6",
          "purple-light": "#A78BFA",
          "purple-dark": "#7C3AED",
          blue: "#2200FF",
          "blue-light": "#3B00FF",
        },
        surface: {
          dark: "#FFFFFF",
          card: "#F8F9FC",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
