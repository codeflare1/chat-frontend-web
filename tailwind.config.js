/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#157EFD',
        'Newblack':'#1E1E1E',
        'newgray':'#4A4A4A',
        'grayLight':'#F9f9f9',
        'grayc':'#598496',
      },
      padding:{
        '51':'51px',
        '50':'50px',
        '70':'70px',
        '140':'140px',
        '35':'35px',
        '27':'27px',
        '87':'87px',
      },
      maxWidth:{
        '27':'27rem',
        '493':'493px',
        '58':'58px',
      },
      margin:{
        '30':'30px',
        '78':'78px',
      },
      fontSize: {
        '64': ['64px', '150%'],
        '40': ['40px', '150%'],
      },
      lineHeight:{
        '200':'200%',
        '18':'18px',
      },
      gap:{
        '108':'108px',
      },
      boxShadow: {
        'cardShad': '0 2px 13px 2px rgb(0 0 0 / 10%)',
        'cardShadow': '0 2px 13px 2px #157efd1f',
      },
      width:{
        '95':'95%',
        '400':'400px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}