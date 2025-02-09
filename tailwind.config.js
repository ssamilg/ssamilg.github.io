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
          "primary-content": "#FFFFFF",

          "secondary": "#1E40AF",
          "secondary-focus": "#1E3A8A",
          "secondary-content": "#FFFFFF",

          // Base colors with blue tint
          "base-100": "#EEF2FF",      // Light indigo tint
          "base-200": "#E2E8FF",      // Slightly deeper indigo
          "base-300": "#D1DEFF",      // More pronounced blue-gray
          "base-content": "#1E293B",  // Dark slate for text
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
