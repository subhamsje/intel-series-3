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
        obsidian: {
          950: '#040507',
          900: '#06070a',
          850: '#0a0d14',
          800: '#0f1420',
          700: '#182030',
        },
        intel: {
          blue: '#0068B5',
          azure: '#0071C5',
          ice: '#E2F1FD',
          muted: '#8AA6C1',
        },
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.04em',
        widest: '0.12em',
      },
    },
  },
  plugins: [],
};
