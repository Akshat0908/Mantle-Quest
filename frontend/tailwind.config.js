/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mantle: {
          primary: '#3B82F6',
          secondary: '#1E40AF',
          dark: '#1E293B',
          light: '#F8FAFC',
        }
      }
    },
  },
  plugins: [],
} 