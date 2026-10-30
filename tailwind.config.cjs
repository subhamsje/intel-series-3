/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Intel One Mono"', 'ui-monospace', 'monospace'],
        display: ['Inter', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Primary Redesign Palette (Reference Colors)
        intel: {
          sky: '#0593C6',       // Electric Sky Blue (Reference)
          pink: '#D83995',      // Vivid Hot Pink (Reference)
          white: '#FCFFFF',     // Clean Bright White (Reference)
          azure: '#0071C5',     // Classic Intel Azure
          ice: '#E0F2FE',       // Sky Blue tint
          rose: '#FCE7F3',      // Hot Pink tint
        },
        // Atmospheric deep twilight neutrals for optimal contrast & luminescence
        twilight: {
          950: '#03060C',
          900: '#060B16',
          850: '#0A1122',
          800: '#0E172E',
          700: '#162344',
        },
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.04em',
        widest: '0.12em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
