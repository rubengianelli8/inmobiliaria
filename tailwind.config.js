module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        25: "25px",
        30: "30px",
      },
      width: {
        250: "250px",
      },
      maxHeight: {
        300: "300px",
      },
      maxWidth: {
        400: "400px",
        720: "720px",
      },
      minWidth: { btn100: "100px" },
      boxShadow: {
        box: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
      },
      margin: { 255: "255px" },
      colors: {
        primary: "#1f1f1e",
        secondary: "#de8d00",
        tertiary: "#de4a00",
        quaternary: "#E8FFC2",
      },
      zIndex: {
        60: 60,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
