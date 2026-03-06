/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        marble: {
          light: '#fdfdfd',
          dark: '#0a0a0a',
        }
      }
    }
  },
  plugins: [],
}
