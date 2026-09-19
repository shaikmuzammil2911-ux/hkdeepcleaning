/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        brand: {
          dark: '#0A191E',
          charcoal: '#1E293B',
          muted: '#64748B',
          light: '#F8FAFB',
          teal: '#0D5C5B',
          tealDark: '#073332',
          gold: '#C89B3C',
          goldLight: '#E8C56D',
          green: '#16A34A',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(13, 92, 91, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px 0 rgba(10, 72, 71, 0.08)',
        'card-hover': '0 20px 35px -10px rgba(13, 92, 91, 0.18)',
        'gold-glow': '0 0 25px rgba(200, 155, 60, 0.4)',
        'teal-glow': '0 0 25px rgba(13, 92, 91, 0.35)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
