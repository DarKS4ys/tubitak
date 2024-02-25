import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#1B1725',
      },
      fontFamily: {
        mono: ['Geist Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        blob: {
          '0%': {
            translate: '0 0',
            rotate: '0deg',
          },
          '30%': {
            transform: 'translate(300px, 290px) scale(1.1)',
            rotate: '40deg',
          },
          '80%': {
            rotate: '90deg',
          },
        },
        blob2: {
          '0%': {
            translate: '0 0',
            rotate: '0deg',
          },
          '30%': {
            rotate: '-40deg',
          },
          '50%': {
            transform: 'translate(-210px, 190px) scale(1.8)',
          },
          '80%': {
            rotate: '-90deg',
          },
        },
        thinking: {
          '0%': {
            transform:'scale(1)',
            rotate: '0deg'
          },
          '35%': {
            transform:'scale(1.3)',
            rotate: '35deg'
          },
          '65%': {
            transform:'scale(1)',
            rotate: '-15deg'
          },
          '80%': {
            transform:'scale(1.3)',
            rotate: '35deg'
          },
          '100%': {
            transform:'scale(1)',
            rotate: '0deg'
          },
        }
      },
      animation: {
        blob: 'blob 10s infinite ease-in-out',
        blob2: 'blob 12s infinite ease-out',
        thinking: 'thinking 2s infinite ease-in-out',
        'blob-reverse': 'blob 8s infinite ease-out reverse',
      },
    },
  },
  plugins: [],
};
export default config;
