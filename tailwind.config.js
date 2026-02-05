/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: { DEFAULT: '#f5e6c8', dark: '#e8d5a8' },
        ink: '#2c1810',
        ruby: { DEFAULT: '#9b1b30', dark: '#7a1526', light: '#c4354d' },
        gold: { DEFAULT: '#c9a84c', light: '#e8d48b', dark: '#a08030' },
        royal: { DEFAULT: '#2d1b4e', light: '#4a2d7a' },
        forest: '#2d6a2e',
        'shard-petal': '#f0b0c4',
        'shard-ribbon': '#8ec3e8',
        'shard-candle': '#f0d080',
      },
      fontFamily: {
        heading: ['Cinzel', 'Georgia', 'serif'],
        body: ['Crimson Text', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(201,168,76,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(201,168,76,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
