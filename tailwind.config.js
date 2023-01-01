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
  // daisyui: {
  //   themes: [
  //     {
  //       ssg: {                 
  //         "primary": "#10b981",
  //         "secondary": "#f59e0b",
  //         "accent": "#4338ca",
  //         "neutral": "#191D24",
  //         "base-100": "#2A303C",
  //         "info": "#3ABFF8",
  //         "success": "#36D399",
  //         "warning": "#FBBD23",
  //         "error": "#e11d48",
  //       },
  //     },
  //   ],
  // },
}
