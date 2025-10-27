/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        'dark': {
          DEFAULT: '#0f0f23',
          100: '#1a1a2e',
          200: '#16213e',
          300: '#0f1c2e',
          400: '#0a0e27',
          500: '#060714',
        }
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'dark-gradient': 'linear-gradient(to bottom, #0f0f23, #1a1a2e)',
      }
    },
  },
  plugins: [],
}