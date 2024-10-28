/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow : {
        dropdown : 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        "card" : "rgba(0, 0, 0, 0.24) 0px 3px 8px;"
      },
      fontFamily:{
        popines : ["Poppins", "serif"],
        roboto : ["Roboto", "serif"]
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(360deg, rgba(31,41,55,1) 35%, rgba(255,255,255,1) 30%)',
      },
    },
  },
  plugins: [],
}