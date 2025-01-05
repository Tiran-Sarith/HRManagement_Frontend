/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        custom: ['Cambria', 'Cochin', 'Georgia', 'Times', 'Times New Roman', 'serif'],
        marck: ['"Marck Script"', 'serif'],
        rubikDirt: ['"Rubik Dirt"', 'serif'],
        monoton: ['"Monoton"', 'serif'], 
      },

    },
  },
  plugins: [],
}

