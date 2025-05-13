// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/modal.js",
    "./node_modules/@heroui/theme/dist/components/toast.js",
    "./node_modules/@heroui/theme/dist/components/spinner.js"

],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};