/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["var(--font-rubik)"],
        outfit: ["var(--font-outfit)"],
      },
      colors: {
        dark: "#1F2744",
        dark29: "#110229",
        gray8c: "#73788C",
        grayA6: "#8F90A6",
        gray55: "#555",
        grayA1: "#9D9EA1",
        gray3B: "#3B3B3B",
        skyBlue: "#4F95FF",
        golden: "#AC8600",
        whiteF5: "#F5F5F5",
        whiteFc: "#FCFCFC",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
  ],
};
