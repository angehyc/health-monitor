/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "comic-sans": ['"Comic Sans MS"', "cursive"],
        "times-new-roman": ['"Times New Roman"', "serif"],
      },
    },
  },
  plugins: [],
};
