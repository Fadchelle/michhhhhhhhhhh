/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Netflix-inspired color palette for MichieHots
        'netflix': {
          'red': '#e50914',
          'black': '#000000',
          'dark': '#141414',
          'gray': '#2f2f2f',
          'light-gray': '#564d4d',
          'white': '#ffffff'
        },
        // Custom theme colors
        'michiehots': {
          'primary': '#e50914',
          'secondary': '#f40612',
          'dark': '#0f0f0f',
          'darker': '#000000',
          'gray': {
            100: '#f8f8f8',
            200: '#e8e8e8', 
            300: '#d8d8d8',
            400: '#b8b8b8',
            500: '#989898',
            600: '#787878',
            700: '#585858',
            800: '#383838',
            900: '#181818'
          }
        }
      },
      fontFamily: {
        'sans': ['Helvetica Neue', 'Arial', 'sans-serif'],
        'netflix': ['Netflix Sans', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem', 
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem'
      },
      aspectRatio: {
        'video': '16 / 9',
        'poster': '2 / 3',
        'card': '16 / 9'
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      backdropBlur: {
        'xs': '2px'
      },
      boxShadow: {
        'netflix': '0 4px 16px rgba(229, 9, 20, 0.3)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.3)'
      }
    }
  },
  plugins: [
    // Custom utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none'
          }
        },
        '.text-shadow-sm': {
          'text-shadow': '1px 1px 2px rgba(0, 0, 0, 0.5)'
        },
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.5)'
        },
        '.text-shadow-lg': {
          'text-shadow': '3px 3px 6px rgba(0, 0, 0, 0.7)'
        },
        '.gradient-overlay': {
          'background': 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
        }
      }
      addUtilities(newUtilities)
    }
  ]
}