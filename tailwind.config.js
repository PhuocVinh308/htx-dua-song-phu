/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f4c3a',        // Xanh rêu đậm menu & footer (#0f4c3a)
          primary: '#3b7e28',     // Xanh lá tiêu đề Lobster (#3b7e28)
          leaf: '#70a340',        // Xanh lá tươi nút xem chi tiết pill (#70a340)
          leafHover: '#5d8e30',
          accent: '#f59e0b',
          cream: '#fbfbfb'
        }
      },
      fontFamily: {
        sans: ['Barlow', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        barlow: ['Barlow', 'sans-serif'],
        lobster: ['Lobster', 'cursive'],
        script: ['"Dancing Script"', 'cursive'],
        heading: ['Barlow', 'sans-serif']
      }
    },
  },
  plugins: [],
}
