/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eth: {
          purple: '#8C8C8C', 
          primary: '#627EEA',
          secondary: '#ECF0F1',
        },
        mumbai: {
          orange: '#FF9933', // Saffron
          pink: '#E10098',   // Navi Mumbai Pink
          yellow: '#FFCC00', // Taxi Top
          black: '#111111',  // Taxi Body
          sky: '#87CEEB',    // Sea Link Sky
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
        desi: ['"Yatra One"', 'system-ui', 'cursive'], // For Hindi text
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
