/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { colors: {
      sectionColor: "hsl(209, 100%, 97%)",
      primaryColor: "hsl(209, 24%, 24%)",
      primaryColorLight: "hsl(209, 74%, 45%)",
      whiteColor: "#fff",
      textColor: "#DDD",
      secondaryColor: "red"
    },
    
   
  },
  
  fontFamily: {
    poppins: ["Poppins", "sans-serif"],
  },
},

  plugins: [],
}