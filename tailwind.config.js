/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0d0b1a',
          card: '#161230',
          border: '#1e1a35',
        },
        purple: {
          primary: '#7c3aed',
          secondary: '#534AB7',
          dark: '#2d1b69',
          light: '#c4b5fd',
        },
        text: {
          primary: '#f0ecff',
          muted: '#7a7694',
        },
        teal: {
          DEFAULT: '#5DCAA5',
        },
        pink: {
          DEFAULT: '#ed93b1',
        },
      },
      maxWidth: {
        mobile: '390px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '60%': { opacity: '1', transform: 'scale(1.15)' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 220ms ease-out',
        'pop-in': 'pop-in 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'fade-up': 'fade-up 400ms ease-out both',
      },
    },
  },
  plugins: [],
}
