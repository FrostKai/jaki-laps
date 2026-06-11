/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        primary: "#00F5FF",
        secondary: "#6C63FF",
        accent: "#7DF9FF",
        danger: "#FF4D6D",
      },
      fontFamily: {
        scifi: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
}
