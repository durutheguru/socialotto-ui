const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xsm': '445px',
      ...defaultTheme.screens,
    },
    extend: {

      width: {
        '97': "25rem"
      },
      // gridTemplateColumns: {
      //   // Simple 16 column grid
      //   '3/2': '3fr 2fr',

      // }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
