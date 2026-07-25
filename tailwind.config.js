/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EEF0E4",
        paper2: "#E5E8D9",
        ink: "#28362C",
        ink2: "#4A5A4E",
        stamp: "#AE4030",
        mustard: "#C99A34",
        line: "#C7CBB6",
        card: "#F7F8F0",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
