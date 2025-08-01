/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    colors: {
      pastelPurple: '#DCC6E0',
      pastelLavender: '#E6DAF0',
      pastelPink: '#F6D5F7',
      pastelIndigo: '#CABBE9',
    },
  }
},
  plugins: [],
};
