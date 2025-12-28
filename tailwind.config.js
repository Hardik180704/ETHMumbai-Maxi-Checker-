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
          purple: '#8C8C8C', // Revisit this, ETH purple is usually around #627EEA, but Foundation is distinct.
          primary: '#627EEA',
          secondary: '#ECF0F1',
        },
        mumbai: {
          orange: '#FF9933',
          pink: '#E10098', // Maximum City vibes
          yellow: '#FFCC00',
        }
      },
    },
  },
  plugins: [],
}
