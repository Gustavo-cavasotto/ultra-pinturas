/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './components/**/*.html',
    './js/**/*.js',
    './css/**/*.css'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'primary': '#0F1F3D',
        'secondary': '#1C4E80', 
        'accent': '#FFFFFF',
        'light-gray': '#F4F6F8',
        'dark-gray': '#333333',
        
        // Additional Colors
        'yellow-accent': '#FCD34D',
        'green-accent': '#10B981',
        'red-accent': '#EF4444',
        'blue-accent': '#3B82F6',
        
        // Dark mode colors
        'dark-primary': '#111827',
        'dark-secondary': '#1F2937',
        'dark-accent': '#F9FAFB'
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif']
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
        '6xl': '3.75rem'
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '128': '32rem',
        '144': '36rem'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'bounce-soft': 'bounceSoft 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(15, 31, 61, 0.9), rgba(28, 78, 128, 0.8))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
      },
      backdropBlur: {
        'xs': '2px'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      gridTemplateColumns: {
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms'
      }
    }
  },
  plugins: [
    // Custom plugins
    function({ addUtilities, addComponents, theme }) {
      // Custom utilities
      addUtilities({
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)'
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)'
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-track': {
            background: theme('colors.gray.100')
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme('colors.secondary'),
            'border-radius': '3px'
          }
        },
        '.gpu-accelerated': {
          'transform': 'translateZ(0)',
          'will-change': 'transform'
        }
      })

      // Custom components
      addComponents({
        '.btn': {
          display: 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          'border-radius': theme('borderRadius.full'),
          'font-weight': theme('fontWeight.semibold'),
          'text-decoration': 'none',
          transition: 'all 300ms ease',
          cursor: 'pointer',
          border: 'none',
          outline: 'none'
        },
        '.btn-primary': {
          'background-color': theme('colors.secondary'),
          color: theme('colors.accent'),
          '&:hover': {
            'background-color': theme('colors.primary'),
            transform: 'translateY(-2px)',
            'box-shadow': theme('boxShadow.lg')
          }
        },
        '.btn-secondary': {
          'background-color': 'transparent',
          color: theme('colors.secondary'),
          border: `2px solid ${theme('colors.secondary')}`,
          '&:hover': {
            'background-color': theme('colors.secondary'),
            color: theme('colors.accent'),
            transform: 'translateY(-2px)'
          }
        },
        '.card': {
          'background-color': theme('colors.accent'),
          'border-radius': theme('borderRadius.2xl'),
          padding: theme('spacing.6'),
          'box-shadow': theme('boxShadow.medium'),
          transition: 'all 300ms ease',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        },
        '.card-hover': {
          '&:hover': {
            transform: 'translateY(-8px)',
            'box-shadow': theme('boxShadow.large')
          }
        },
        '.glass': {
          'background-color': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      })
    }
  ]
}
