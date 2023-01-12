/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#7C51A1",
        "soft-black-color": "#181A18",
        "gray-color": "#A49065",
        "youtube-color": "#FF0000"
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
