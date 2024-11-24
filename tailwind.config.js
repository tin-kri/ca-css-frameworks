/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./**/*.{html,js,ts}",
    "!./node_modules/**/*",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// content: ["./src/**/*.{html,js}"],
