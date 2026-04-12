import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#050816",
          800: "#0B1020",
          700: "#151B2F"
        },
        brand: {
          500: "#1E7BEA",
          600: "#1661B8"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.35)"
      },
      maxWidth: {
        "content": "1120px"
      }
    }
  },
  plugins: []
};

export default config;

