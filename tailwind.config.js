/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/**/*.vue',
    './src/views/*.vue',
    './src/components/*.vue',
    './src/components/**/*.vue',
    './src/views/*.vue',
    './src/views/**/*.vue',
    './src/layouts/*.vue',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      'bg-primary': '#01B059',
      'bg-warning': '#F1C814'
    },
    container: {
      padding: '2rem'
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1440px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: []
}
