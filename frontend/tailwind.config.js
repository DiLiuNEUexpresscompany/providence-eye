/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      colors: {
        app: {
          bg: '#000B1A',
          'light-bg': '#F8F9FA',
          green: '#68E78E',
          darkgreen: '#1a4d2e',
          red: '#FF1F22',
          accent: '#2D5BFF',
          darkaccent: '#1A3ABF',
          text: '#1A1A1A',
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'green-glow': '0 0 40px -10px rgba(104, 231, 142, 0.5)',
        'accent-glow': '0 0 40px -10px rgba(45, 91, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
