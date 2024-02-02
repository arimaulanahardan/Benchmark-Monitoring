/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F0F3FF",
          100: "#3267E3",
          200: "#2A4061",
        },
      },
      dropShadow: {
        glasses: "0px 2px 10px #00000040",
      },
      boxShadow: {
        card: "0px 5px 10px 0px #00000040",
        glasses: "0px 2px 10px 0px #00000040",
      },
    },
  },
  plugins: [],
};
