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
          "primary": "#3B82F6",          // Keep same primary for consistency
          "primary-focus": "#1D4ED8",    // Keep same focus state
          "primary-content": "#FFFFFF",  // Adjusted for light theme contrast

          "secondary": "#1D4ED8",        // Keep same secondary
          "secondary-focus": "#1E40AF",  // Keep same focus state
          "secondary-content": "#FFFFFF", // Adjusted for light theme contrast

          // Light theme background progression
          "base-100": "#FFFFFF",         // Pure white base
          "base-200": "#F1F5F9",        // Light gray for cards/sections
          "base-300": "#E2E8F0",        // Slightly darker for elevation
          "base-content": "#1F2937",    // Dark gray for main text

          // Keep same border radius for consistency
          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": ".25rem",
        },
      },
    ],
  },
}
