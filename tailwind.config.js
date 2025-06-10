/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './client/src/**/*.{vue,js,ts,jsx,tsx}', 
    './server/src/**/*.{js,ts,jsx,tsx}',     
  ],

  theme: {
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite',
        long: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },

    },
  },
  plugins: [],
}

