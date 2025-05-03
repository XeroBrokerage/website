/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      //   fontFamily: {
      //     cascadia: ['Cascadia Code', 'monospace'],
      //   },
    },
  },
  plugins: [require('daisyui')],
}
