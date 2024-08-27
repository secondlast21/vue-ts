/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
        black: '#1c1c1c'
      },
    }
  },
  plugins: [],
}

