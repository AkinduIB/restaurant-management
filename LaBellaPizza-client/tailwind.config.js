/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        "red" : "#ff6347",
        "green": "#808000",
        "gray": "#333333",
        "white": "#fff9e3"
      }
    },
  },
  plugins: [],
}

