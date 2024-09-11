import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const tailwindcssAnimated = require("tailwindcss-animated");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#6639CD",
        secondary: {
          v1: "#3947CD",
          v2: "#4839CD",
          v3: "#A139CD",
          black: "#232323",
        },
        accent: "#CD3956",
      },
      boxShadow:{
        collageImage: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui(), tailwindcssAnimated],
};

export default config;
