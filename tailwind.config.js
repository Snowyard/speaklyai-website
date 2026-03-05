/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C3AED',
        'primary-light': '#8B5CF6',
        'primary-dark': '#5B21B6',
        accent: '#10B981',
        dark: '#0F172A',
        'dark-mid': '#1E293B',
      },
    },
  },
  plugins: [],
};
