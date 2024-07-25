/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage : {
        "auth-bg" : "url('/assets/images/auth-bg.png')"
      },
      fontFamily: {
        "anton": ["Anton", "sans-serif"]
      }
    },
  },
  plugins: [],
}
