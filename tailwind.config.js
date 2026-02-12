/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0B0D1E',
          darker: '#060711',
          blue: '#1E3A8A',
          purple: '#7C3AED',
          pink: '#EC4899',
        }
      },
      backgroundImage: {
        'stars': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0iZyI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwLjgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjIwJSIgY3k9IjMwJSIgcj0iMXB4IiBmaWxsPSJ1cmwoI2cpIi8+PGNpcmNsZSBjeD0iODAlIiBjeT0iMjAlIiByPSIxcHgiIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSI0MCUiIGN5PSI3MCUiIHI9IjFweCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjYwJSIgY3k9IjUwJSIgcj0iMXB4IiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.8), 0 0 60px rgba(236, 72, 153, 0.6)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
