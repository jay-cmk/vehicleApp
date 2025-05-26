/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx,jsx}', './components/**/*.{js,ts,tsx,jsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
      },
    },
  },
  plugins: [],
};
