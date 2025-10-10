/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cce: {
          dark: "#1C355E",   // site background
          light: "#B6DCE1",  // header titles
          gray: "#EDEDED",   // subtle text / borders
        },
      },
      fontFamily: {
        sans: ["Calibri", "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(0, 0, 0, 0.05)",
        card: "0 2px 8px rgba(28, 53, 94, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
