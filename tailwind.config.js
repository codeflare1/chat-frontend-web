/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#0d6efd',
        'darkblue':'#0b5ed7',
        'Newblack':'#1E1E1E',
        'newgray':'#4A4A4A',
        'grayLight':'#F9f9f9',
        'grayc':'#598496',
        'sidebar':'#f4f4f4',
        'search':'#e2e2e2',
        'Chathover':'#e9e9e9',
        'bgChat':'#f9f9f9',
        'grayn':'#888',
        'profile':'#e6e6e6',
      },
      padding:{
        '51':'51px',
        '50':'50px',
        '70':'70px',
        '140':'140px',
        '35':'35px',
        '27':'27px',
        '87':'87px',
        '14d':'14px',
      },
      maxWidth:{
        '27':'27rem',
        '493':'493px',
        '58':'58px',
        '135':'135px',
      },
      margin:{
        '30':'30px',
        '78':'78px',
      },
      fontSize: {
        '64': ['64px', '150%'],
        '40': ['40px', '150%'],
        'xxs': ['10px', '14px '],
      },
      lineHeight:{
        '200':'200%',
        '18':'18px',
      },
      gap:{
        '108':'108px',
        '82':'82px',
      },
      boxShadow: {
        'cardShad': '0 2px 13px 2px rgb(0 0 0 / 10%)',
        'cardShadow': '0 2px 13px 2px #157efd1f',
        'chatWrite': '0px -10px 20px 0px #c7c7c75c',
      },
      width:{
        '95':'95%',
        '400':'400px',
        'newW':'-webkit-fill-available',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], 
      },
      minWidth:{
        unset:'unset'
      },
      height:{
        '500':'500px',
      }
    },
  },
  plugins: [],
}