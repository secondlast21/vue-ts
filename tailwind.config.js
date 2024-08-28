/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [daisyui],
  theme: {
    extend: {
      colors: {
        primaryLight: '#e8f1ed',
        primaryLightHover: '#dceae4',
        primaryLightActive: '#b7d4c8',
        primary: '#17754d',
        primaryHover: '#156945',
        primaryActive: '#125e3e',
        secondaryLight: '#fcf6e9',
        secondaryLightHover: '#faf2de',
        secondaryLightActive: '#f5e4bc',
        secondary: '#dfa926',
        secondaryHover: '#c99822',
        secondaryActive: '#b2871e',
        tertieryLight: '#edeff4',
        tertieryLightHover: '#e4e7ee',
        tertieryLightActive: '#c6ccdc',
        tertiery: '#485c8e',
        tertieryHover: '#415380',
        tertieryActive: '#3a4a72',
        successLight: '#c8e6c9',
        success: '#4caf50',
        warningLight: '#fedfbc',
        warning: '#fd9726',
        dangerLight: '#f4c1be',
        danger: '#dc326e',
        informationLight: '#e6f7ff',
        information: '#69c0ff',
        greyLight: '#f0f2f5',
        grey: '#a3a3a3',
        black: '#1c1c1c',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#16754d', //putih abu latte
          secondary: '#6c6f85', //abu muda
          accent: '#16754d', // hijau mocca
          neutral: '#4c4f69', // abu tua latte
          'base-100': '#ffffff', // putih abu latte
          info: '#04a5e5', // biru langit latte
          success: '#40a02b', // hijau latte
          warning: '#df8e1d', // kuning latte
          error: '#ce5050',
        },
      },
    ],
  },
}
