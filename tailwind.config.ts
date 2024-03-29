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
        secondary: "#89888c",
        border: "#201f2a",
      },
      boxShadow: {
        whiteShadow: "0 0 15px 1px rgba(97, 97, 203, 0.5)",
      },
      gridTemplateColumns: {
        "48": "repeat(48, minmax(0, 1fr))",
      },
      screens: {
        sm: "550px",
        // => @media (min-width: 640px) { ... }
        "med": "640px",
        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
