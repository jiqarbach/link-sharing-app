// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const tokens = require('./src/theme/tokens.json');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: tokens.fontFamily,
      fontSize: tokens.fontSize,
      fontWeight: tokens.fontWeight,
      letterSpacing: tokens.letterSpacing,
      lineHeight: tokens.lineHeight,
      borderRadius: tokens.borderRadius,
      spacing: tokens.spacing,
      screens: tokens.breakpoints,
    },
  },
  plugins: [
    // e.g. require('@tailwindcss/forms'),
  ],
};
