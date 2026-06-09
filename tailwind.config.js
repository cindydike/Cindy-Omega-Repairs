/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      fontFamily: {
        barlowSemiCondensed: [
          "'Barlow Semi Condensed'",
          ...defaultTheme.fontFamily.sans,
        ],
        roboto: ["Roboto", ...defaultTheme.fontFamily.mono],
        oswald: ["Oswald", ...defaultTheme.fontFamily.serif],
        barlow: ["Barlow", ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        primary: 1.15,
      },
      colors: {
        primary: colors.blue,
        secondary: colors.sky,
        gray: colors.slate,
        "customGreen": { 100: "rgb(0, 120, 0)" },
        "customRed": { 100: "rgb(255, 88, 88)" },
        "semi-transparent": "rgba(21, 14, 40, 0.93)",
      },
      screens: {
        xs: "375px",
      },
      boxShadow: {
        "custom-1":
          "0px 1px 2px 0px rgba(60, 64, 67, 0.3) ,0px 2px 6px 2px  rgba(60, 64, 67, 0.15)",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
