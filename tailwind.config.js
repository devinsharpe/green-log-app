const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans", "Helvetica", "sans-serif"],
        serif: ["Cormorant", "ui-serif", "Georgia"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["group-focus"],
      textColor: ["group-focus"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
