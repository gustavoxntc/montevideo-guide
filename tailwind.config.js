/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'uy-blue': '#1e3a5f',
        'uy-sky': '#3b82f6',
        'uy-yellow': '#f59e0b',
      },
    },
  },
  plugins: [],
}
