/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'title-red': '#ff1742',
        'title-yellow': '#ea9c28',
        'header-red': '#c41740',
        'choice-lime': '#d9f99d',
      },
      hueRotate: {
        '-120': '-120deg',
        120: '120deg',
        '-45': '-45deg',
        45: '45deg',
        '-55': '-55deg',
        55: '55deg',
      }
    },
  },
  plugins: [],
}

