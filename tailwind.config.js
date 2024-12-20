/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "fluid-sm": "clamp(0.64rem, 0.06vi + 0.62rem, 0.67rem)",
        "fluid-base": "clamp(0.8rem, 0.18vi + 0.75rem, 0.89rem)",
        "fluid-md": "clamp(1rem, 0.37vi + 0.89rem, 1.19rem)",
        "fluid-lg": "clamp(1.25rem, 0.65vi + 1.06rem, 1.58rem)",
        "fluid-xl": "clamp(1.56rem, 1.07vi + 1.26rem, 2.11rem)",
        "fluid-xxl": "clamp(1.95rem, 1.68vi + 1.47rem, 2.81rem)",
        "fluid-xxxl": "clamp(2.44rem, 2.55vi + 1.71rem, 3.75rem)",
      },
      colors: {
        pokeRed: "#FF4C41",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
