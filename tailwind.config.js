/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["variant", "&:not(.light *)"],
  theme: {
    extend: {},
  },
  plugins: [],
};
