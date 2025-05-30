// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/calendar.js",
    "./node_modules/@heroui/theme/dist/components/modal.js",
    "./node_modules/@heroui/theme/dist/components/select.js",
    "./node_modules/@heroui/theme/dist/components/skeleton.js",
    "./node_modules/@heroui/theme/dist/components/spinner.js",
    "./node_modules/@heroui/theme/dist/components/tabs.js",
    "./node_modules/@heroui/theme/dist/components/toast.js",
    "./node_modules/@heroui/theme/dist/components/button.js",
    "./node_modules/@heroui/theme/dist/components/ripple.js",
    "./node_modules/@heroui/theme/dist/components/form.js",
    "./node_modules/@heroui/theme/dist/components/listbox.js",
    "./node_modules/@heroui/theme/dist/components/divider.js",
    "./node_modules/@heroui/theme/dist/components/popover.js",
    "./node_modules/@heroui/theme/dist/components/scroll-shadow.js",],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};