const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#111111",
      secondary: "#000000",
    }),

    borderColor: (theme) => ({
      ...theme("colors"),
      orange: "#FF6400",
    }),
    textColor: (theme) => ({ ...theme("colors"), orange: "#FF6400" }),

    screens: {
      low: "0px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', "ui-serif", "Georgia"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
