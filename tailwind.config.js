/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#4A90E2',
          cream: '#FFF8E7',
          gold: '#FFD700',
        },
        accent: {
          gray: '#4A4A4A',
          red: '#E57373',
        },
        warm: {
          50: '#FFF8E7',
          100: '#FFE8B3',
          200: '#FFD700',
          300: '#FFC107',
        }
      },
      fontFamily: {
        'lora': ['Lora', 'serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'base': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      borderRadius: {
        'polaroid': '8px',
        'card': '12px',
      },
      boxShadow: {
        'polaroid': '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'card': '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
} 