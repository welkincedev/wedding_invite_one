import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f4f6f2",
          100: "#e5eae1",
          200: "#DCE3D5", // Soft secondary green
          300: "#b5c4ad",
          400: "#8fa385",
          500: "#74866D", // Primary sage
          600: "#5a6a54",
          700: "#44503f",
          800: "#343C32", // Deep olive
          900: "#222720"
        },
        champagne: {
          100: "#faf5ea",
          200: "#f2e7cd",
          300: "#e5d4aa",
          400: "#D4BE8C",
          500: "#C6AD76", // Champagne gold
          600: "#a88e55",
          700: "#846c3b"
        },
        ivory: {
          50: "#FFFEFA", // White paper
          100: "#F7F3E9", // Warm ivory
          200: "#eee8da",
          300: "#dfd7c3",
          400: "#817E72" // Muted neutral
        }
      }
    }
  },
  plugins: []
};

export default config;
