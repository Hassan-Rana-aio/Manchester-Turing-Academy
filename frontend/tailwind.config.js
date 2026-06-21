/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        inherit: "inherit",
      },
      colors: {
        headerColor: "#335F71",
        primaryBgDarkColor: "#063C52",
        secondaryColor: "#FFFFFF",
        footerColor: "#343A40",
        textBlack: "#1A1A1A",
        textGray: "#8a8a8a",
        textGrayHigh: "#4f4f4f",
        textWhite: "#FFFFFF",
        textWhiteLow: "#F8F6EB",
        whiteV3: "#f8f8f8",
        textBlue: "#1F9BCF",
        buttonBlue: "#1A82AE",
        buttonGreen: "#32834B",
        buttonGreenDark: "#276039",
        buttonOrange: "#ae8f1a",
        buttonBlueDark: "#187aa3",
        grayV1: "#C4C6CD",
      },
      fontFamily: {
        "nunito-sans": ["Nunito Sans", "sans-serif"],
        roboto: ['"Roboto"', "sans-serif"],
      },
    },
  },

  plugins: [],
};
