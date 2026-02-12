/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ebff',
          200: '#badbff',
          300: '#89c2ff',
          400: '#539fff',
          500: '#2e79ff',
          600: '#1858f5',
          700: '#1144de',
          800: '#163ab3',
          900: '#18358d',
        },
      },
      boxShadow: {
        soft: '0 4px 30px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
