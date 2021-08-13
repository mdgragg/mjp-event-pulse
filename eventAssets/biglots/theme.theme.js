export const COLORS = {
  red: '#b71f39',
  orange: '#FF5600',
  yellow: '',
  green: '#97d700',
  blue: '#1e2c60',
  indigo: '',
  violet: '',
  white: '#ffffff',
  black: '#000000',
  primary: '#FF5600',
  secondary: '#ffffff',
  tertiary: '',
  info: '',
  warning: '',
  offWhite: '#f7f7f7',
  offBlack: '#161616',
};

export const FONTS = {
  title: {
    fontFamily: 'Futura Bold',
    fontSize: '2.5rem',
    letterSpacing: '',
    lineHeight: '',
  },
  body: {
    fontFamily: 'Futura Bold',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
  },
  get primary() {
    return this.title;
  }, //default to title
  secondary: '', // default to body
  tertiary: '', // default to body
};

export const BUTTONS = {
  primary: {
    fontFamily: FONTS.body.fontFamily,
    fontSize: '1.5rem',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: COLORS.primary,
    fontColor: COLORS.secondary,
    border: '',
  },
  secondary: {
    fontFamily: FONTS.body.fontFamily,
    fontSize: '1rem',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: COLORS.primary,
    fontColor: COLORS.secondary,
    border: '',
  },
  big: {
    fontFamily: 'Futura Bold',
    fontSize: '2rem',
    letterSpacing: '2px',
    lineHeight: 'auto',
    backgroundColor: COLORS.primary,
    fontColor: COLORS.secondary,
    border: '5px solid white',
  },
  small: {
    fontFamily: '',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: '',
    fontColor: '',
    border: '',
    hover: {
      fontColor: '',
      bgColor: '',
    },
  },
  hover: {
    fontColor: COLORS.orange,
    backgroundColor: 'white',
  },
};

export const BREAKPOINTS = {
  xl: 1920,
  lg: 1600,
  md: 1200,
  sm: 768,
  xs: 500,
};

var event_theme = {
  colors: { ...COLORS },
  fonts: { ...FONTS },
  buttons: { ...BUTTONS },
  breakpoints: { ...BREAKPOINTS },
  headerHeight: '200px',
  headerOpacity: '0.75',
  videoBreakPoint: 0,
  maxSectionWidth: '1800px',
};

export default event_theme;
