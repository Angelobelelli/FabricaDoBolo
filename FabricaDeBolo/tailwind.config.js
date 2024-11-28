/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffcbdb', // Classe `text-primary`, `bg-primary`, etc.
      },
      height: {
        custom: '200px', // Classe `h-custom`
      },
      width:{
        custom: '200px'
      }
    },
  },
  plugins: [],
}