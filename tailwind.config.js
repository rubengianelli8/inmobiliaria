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
        primary: "#0E185F",
        secondary: "#2FA4FF",
        tertiary: "#00FFDD",
        quaternary: "#E8FFC2",
        gray: "#ffffff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
