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
        burgundy: {
          900: "#2d060a",
          800: "#460d14",
          700: "#5a121d",
          600: "#741b27",
          500: "#8e2330",
          100: "#fbf0f1"
        },
        gold: {
          100: "#fff7e6",
          200: "#f6dfb3",
          300: "#e5c382",
          400: "#d4a755",
          500: "#b98c39",
          600: "#936b23"
        },
        ivory: {
          50: "#fffdfa",
          100: "#faf6f0",
          200: "#f4ece2",
          300: "#eaded0"
        }
      }
    }
  },
  plugins: []
};

export default config;
