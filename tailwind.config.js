/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#F0F9F9',
          100: '#D9F0EF',
          200: '#B5E1E0',
          300: '#83CBCA',
          400: '#4DAEAD',
          500: '#238E8D',
          600: '#147271',
          700: '#0D5C5B',
          800: '#0A4847',
          900: '#063837',
          950: '#03201F',
        },
        gold: {
          50: '#FAF6EB',
          100: '#F3E9CB',
          200: '#E7D297',
          300: '#DAB863',
          400: '#D4AF37',
          500: '#C89B3C',
          600: '#B08027',
          700: '#8C621D',
          800: '#714D1B',
          900: '#5E3F19',
          950: '#36210A',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 10px 30px -5px rgba(13, 92, 91, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        card: '0 4px 20px 0 rgba(10, 72, 71, 0.08)',
        'card-hover': '0 20px 35px -10px rgba(13, 92, 91, 0.18)',
        'gold-glow': '0 0 25px rgba(200, 155, 60, 0.4)',
      },
    },
  },
  plugins: [],
};
