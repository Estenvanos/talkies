/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage : {
        "auth-bg" : "url('/assets/images/auth-bg.jpg')"
      },
      fontFamily: {
        "anton": ["Anton", "sans-serif"],
        "pacifico": ["Pacifico", "cursive"],
        "mukta": ["Mukta", "sans-serif"],
      }
    },
  },
  plugins: [],
}
