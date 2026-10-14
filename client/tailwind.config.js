/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: '#260811',
          900: '#380E1B',
          800: '#4A1424', // Deep Maroon primary
          700: '#611B30',
          600: '#7B223D',
          50: '#FDF4F6',
        },
        gold: {
          900: '#755B23',
          800: '#9B792F',
          700: '#B08C3B',
          600: '#C5A15B', // Antique Gold primary
          500: '#D5B573',
          400: '#E4CB94',
          300: '#EFE0BE',
          200: '#F6EEDC',
          100: '#FAF6ED', // Warm Ivory
          50: '#FDFBF7',
        },
        ivory: '#FAF6ED',
        beige: {
          DEFAULT: '#EDE4D5',
          dark: '#DECDB8',
          light: '#F5EFE5',
        },
        charcoal: {
          DEFAULT: '#262321',
          light: '#3D3835',
          dark: '#181615',
          muted: '#665F5A',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        heading: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'temple': '0 10px 30px -10px rgba(74, 20, 36, 0.15)',
        'gold-glow': '0 0 20px rgba(197, 161, 91, 0.25)',
        'card-elevated': '0 4px 20px -2px rgba(38, 35, 33, 0.08), 0 2px 6px -1px rgba(38, 35, 33, 0.04)',
      }
    },
  },
  plugins: [],
}
