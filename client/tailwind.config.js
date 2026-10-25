/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            DEFAULT: '#BA0F18',
            dark: '#85070D',
            light: '#E22630',
          },
          gold: {
            DEFAULT: '#FFB800',
            light: '#FDE047',
            dark: '#D97706',
          },
          dark: {
            950: '#070709',
            900: '#0B0B0E',
            800: '#141419',
            700: '#1F1F27',
            600: '#2C2C38',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}