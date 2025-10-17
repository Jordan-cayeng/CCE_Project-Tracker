/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cce-dark':       '#1C1F26', // CCE Navy
        'cce-light':      '#B6DCE1', // CCE Light Blue
        'cce-gray':       '#EDEDED', // CCE Gray   
        'cce-accent1':    '#3A6C75', // Accent Color
        'cce-highlight':  '#F4A259', // Highlight / Call-to-Action
        'cce-positive':   '#4CAF50', // Success / Positive
        'cce-alert':      '#C0392B', // Error / Danger
        'cce-textLight':  '#F8F9FA', // For text on dark backgrounds
        'cce-textDark':   '#212529', // For text on Light backgrounds
      },
    },
  },
  plugins: [],
}
