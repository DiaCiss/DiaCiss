import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#FFF4F1',
          100: '#FFE4DC',
          200: '#FFC5B5',
          300: '#FF9E88',
          400: '#FF7055',
          500: '#E8501E',
          600: '#D44418',
          700: '#B83812',
          800: '#93290D',
          900: '#751F09',
          950: '#4A1206',
        },
        sand: {
          50:  '#FAF8F5',
          100: '#F0EDE8',
          200: '#E2DDD5',
          300: '#C9C2B8',
          400: '#A89E92',
          500: '#87796B',
          600: '#6B5D50',
          700: '#524538',
          800: '#3A2F24',
          900: '#1A1A1A',
          950: '#0D0D0D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(232,80,30,0.14)',
        'orange': '0 4px 20px rgba(232,80,30,0.3)',
      },
    },
  },
  plugins: [],
}
export default config
