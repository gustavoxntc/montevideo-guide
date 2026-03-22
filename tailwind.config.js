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
        'ori-celeste': '#71D8EE',
        'ori-celeste-dark': '#3ab5d4',
        'ori-marron': '#886739',
        'ori-marron-light': '#b08a50',
        'ori-amarillo': '#FFBE04',
        'ori-dark': '#1a1208',
        'ori-off-white': '#f9f6f0',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
