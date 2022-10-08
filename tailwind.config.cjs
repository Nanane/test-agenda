/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '36': 'repeat(36, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
