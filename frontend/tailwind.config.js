/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.jsx',
    './src/**/*.css',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: '#f3dabc',
        brown:'#6D4C3C',
        'light-text': '#000000', 
        'dark-text': '#ffffff',
      },
      backgroundImage: theme => ({
        'light-gradient': 'linear-gradient(to right, #ffffff, #f3dabc)',
        'dark-gradient': 'linear-gradient(to right, #242424, #6D4C3C)',
      })
    },
  },
  plugins: [],
}
