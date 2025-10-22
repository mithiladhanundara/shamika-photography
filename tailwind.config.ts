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
        'primary': '#F5EFE6',
        'secondary': '#F9F9F9',
        'text-dark': '#5a524e',
        'text-light': '#8A827D',
        'accent-sage': '#9DAC8C',
        'accent-terracotta': '#E2725B',
        'accent-mustard': '#FFC857',
        'border-color': '#EAE5D9',
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
        serif: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
}
export default config