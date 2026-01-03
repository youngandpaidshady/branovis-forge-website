/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./projects.html",
    "./blog.html",
    "./contact.html",
    "./script.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B2A41',
        secondary: '#F7B801',
        accent1: '#2E4057',
        accent2: '#EAEFF2',
        textDark: '#0A1128',
        textLight: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    typography,
  ],
}

