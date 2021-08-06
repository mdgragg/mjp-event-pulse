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
  primary: 'white',
  secondary: '#9f7953',
  tertiary: '#055574',
  info: '',
  warning: '',
  offWhite: '#f7f7f7',
  offBlack: '#161616',
};

export const FONTS = {
  title: { fontFamily: '', fontSize: '', letterSpacing: '', lineHeight: '' },
  body: {
    fontFamily: 'Futura Bold',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
  },
  primary: '', //default to title
  secondary: '', // default to body
  tertiary: '', // default to body
};

export const BUTTONS = {
  primary: {
    fontFamily: FONTS.body.fontFamily,
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: COLORS.secondary,
    fontColor: COLORS.primary,
    border: '',
  },
  secondary: {
    fontFamily: '',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: COLORS.secondary,
    fontColor: COLORS.primary,
    border: '',
  },
  big: {
    fontFamily: 'Futura Bold',
    fontSize: '2rem',
    letterSpacing: '2px',
    lineHeight: 'auto',
    backgroundColor: COLORS.secondary,
    fontColor: COLORS.primary,
    border: '5px solid white',
  },
  small: {
    fontFamily: '',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: COLORS.secondary,
    fontColor: COLORS.primary,
    border: '',
    hover: {
      fontColor: '',
      bgColor: '',
    },
  },
  hover: {
    fontColor: COLORS.tertiary,
    backgroundColor: COLORS.primary,
  },
};

export const BREAKPOINTS = {
  xl: 1920,
  lg: 1600,
  md: 1200,
  sm: 768,
  xs: 500,
};

export var event_theme = {
  colors: { ...COLORS },
  fonts: { ...FONTS },
  buttons: { ...BUTTONS },
  breakpoints: { ...BREAKPOINTS },
  heroBgColor: COLORS.primary,
  heroHeight: '500px',
  headerOpacity: '0.75',
  videoBreakPoint: 0,
  maxSectionWidth: '1800px',
};
