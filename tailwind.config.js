/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        ssg_dark: {
          "primary": "#3B82F6",
          "primary-focus": "#1D4ED8",
          "primary-content": "#F1F5F9",

          "secondary": "#1D4ED8",
          "secondary-focus": "#1E40AF",
          "secondary-content": "#F1F5F9",

          "base-100": "#18181B",
          "base-200": "#1F2937",
          "base-300": "#2D333B",
          "base-content": "#F1F5F9",

          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": ".25rem",
        },
        ssg_light: {
          "primary": "#3B82F6",
          "primary-focus": "#2563EB",
          "primary-content": "#1E293B",

          "secondary": "#1E40AF",
          "secondary-focus": "#1E3A8A",
          "secondary-content": "#FFFFFF",

          // Base colors with distinct steps for layering
          "base-100": "#F8FAFF",      // Clean, very light blue tint
          "base-200": "#E0E7FF",      // Distinct Indigo-100 for section breaks
          "base-300": "#C7D2FE",      // Indigo-200 for Card/Hover states
          "base-content": "#0F172A",  // Deeper Slate for better readability

          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": ".25rem",
        },
        ssg_pdf: {
          "base-100": "#FFFFFF",
          "base-200": "#FFFFFF",
          "base-300": "#FFFFFF",
          "base-content": "#333333",
        },
      },
    ],
  },
}
