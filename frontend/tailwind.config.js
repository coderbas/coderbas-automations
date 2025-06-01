/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",   // <--- important for the pages router
      "./components/**/*.{js,ts,jsx,tsx}",
      // remove or ignore "./app/**/*" if you aren't using the app router
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  