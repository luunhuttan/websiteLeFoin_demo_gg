/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFFDF8',      // Background
        'brown': '#4A3F35',      // Main text
        'straw': '#EAD8B7',      // Section background
        'earth': '#C7A17A',      // Accent background
        'orange': '#E9803E',     // CTA buttons
        'olive': '#7E8D61',      // Headers
        'moss': '#4E5B3B',       // Hover states
        // Le Foin mood board colors
        lightTeal: '#AFCBBB',
        aquaticBlue: '#71A6B6',
        mossGreen: '#C3D6C4',
        amber: '#E5873E',
        hazelnut: '#7A5C42',
        water: '#D9E4E2',
        goldenSand: '#D8B279',
        leaf: '#48664E',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],     // Headers
        'sans': ['Inter', 'sans-serif'],            // Body text
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#4A3F35',
            a: {
              color: '#E9803E',
              '&:hover': {
                color: '#4E5B3B',
              },
            },
            h1: {
              fontFamily: 'Playfair Display, serif',
              color: '#4E5B3B',
            },
            h2: {
              fontFamily: 'Playfair Display, serif',
              color: '#4E5B3B',
            },
            h3: {
              fontFamily: 'Playfair Display, serif',
              color: '#4E5B3B',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 