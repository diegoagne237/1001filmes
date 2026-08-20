/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17140f',
        'ink-2': '#1f1b14',
        cream: '#efe6d3',
        'cream-2': '#e5d9bd',
        wine: '#7c2a2a',
        'wine-2': '#5e1f1f',
        gold: '#c6992e',
        petrol: '#24504b',
        line: '#3a3327',
        'line-light': '#d8cbaa',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"Source Serif 4"', 'serif'],
        mono: ['"Courier Prime"', 'monospace'],
      },
    },
  },
  plugins: [],
}
