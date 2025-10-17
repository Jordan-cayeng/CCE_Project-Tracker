/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cce-dark': '#1C1F26',
        'cce-light': '#2A2E38',
        'cce-blue': '#0050B3',
      },
    },
  },
  plugins: [],
}
