/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        colorChange: {
          '10%': { color: 'rgb(167 243 208)' },
          '0%, 100%': { color: 'white' },
        }
      },
      animation: {
        colorChange: 'colorChange 4s infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
  ],
}

