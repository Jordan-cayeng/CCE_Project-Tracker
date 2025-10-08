/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", //<-- This enables the .dark class toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cce: {
          dark: "#1C355E",
          light: "#B6DCE1",
          gray: "#EDEDED",
        },
      },
      fontFamily: {
        sans: ["Calibri", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};