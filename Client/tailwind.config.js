/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/modules/**/*.{js,jsx}',
    './src/next/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ac: {
          orange: '#f48024',
          'orange-hover': '#da670b',
          bg: '#f8f9f9',
          surface: '#ffffff',
          border: '#d6d9dc',
          'border-light': '#e3e6e8',
          text: '#232629',
          muted: '#6a737c',
          light: '#9199a1',
          link: '#0074cc',
          'link-hover': '#0a95ff',
          success: '#2f6f44',
          'success-bg': '#d1e7dd',
          danger: '#c22',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Liberation Sans"',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
