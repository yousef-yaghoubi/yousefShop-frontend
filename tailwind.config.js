module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      screens: {
        'xs' : '450px',
        'xxxs' : '310px',
        'xxs' : '350px',
        'ml' : '886px',
        'lx' : '1150px'
      },
      borderRadius: {
        'ten' : '10px'
      },
      gridTemplateColumns: {
        '2fr' : '1fr 1fr',
        '1fr' : '1fr',
      },
      gridTemplateRows: {
        '0fr' : '0fr',
        '1fr' : '1fr' 
      },
      colors:{
        'white': '#ffffff',
        'white-50': '#EAEEF2',
        'white-60': '#a1a1a1',
        'white-70': '#545454',
        'orange-theme': '#ff9100',
        'orange-theme-50': '#cc7d15',
        'border-color' : 'rgba(202, 202, 202, .5)'
      },
      fontFamily: {
       'yekanBakhBlack': 'yekanBakhBlack',
       'yekanBakhBold': 'yekanBakhBold',
       'yekanBakhLight': "yekanBakhLight",
       'yekanBakhThin': 'yekanBakhThin'
      },
      boxShadow:{
        'profile' : '0 13px 25px 3px #efc58f',
        'custom' : '0 3px 49px 0 rgba(0, 0, 0, 0.06)',
        'customImage' : '0 0 51px 15px #e3e3e3',
        'input' : '0px 8px 13px -11px #ff9100',
        'inputTrue' : '0px 8px 13px -11px green',
        'inputFalse' : '0px 8px 13px -11px red',
        'title' : '0px 2px 10px 0px #d1d1d1',
        'btnComment' : '0px 4px 24px 0px rgba(0,0,0,0.1)'
      },
    },
  },
  plugins: [],
}
