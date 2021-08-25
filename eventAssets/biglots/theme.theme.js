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

const PALETTE = {
  text: {
    primary: COLORS.white,
    secondary: COLORS.secondary,
    tertiary: COLORS.tertiary,
  },
  background: {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    tertiary: COLORS.tertiary,
  },
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
const TYPOGRAPHY = {
  h1: {
    color: COLORS.secondary,
    ...FONTS.title,
  },
  h2: {
    ...FONTS.title,
    color: COLORS.secondary,
    fontSize: 'clamp(1.25rem, 10vw, 1rem)',

  },
  h3: {
    color: COLORS.tertiary,
  },
  h4: {
    fontSize: '1rem',
    color: COLORS.white,
    lineHeight: '2rem',
  },
};


export const BREAKPOINTS = {
  xl: 1920,
  lg: 1600,
  md: 1200,
  sm: 768,
  xs: 500,
};

const GLOBALS = {
  heroHeight: '240px',
  heroBgColor: COLORS.primary,
  headerOpacity: '1',
  videoBreakPoint: 700,
  maxSectionWidth: '1800px',
};

var event_theme = {
  colors: { ...COLORS },
  palette: { ...PALETTE },
  fonts: { ...FONTS },
  buttons: { ...BUTTONS },
  typography: { ...TYPOGRAPHY },
  breakpoints: { ...BREAKPOINTS },
  ...GLOBALS,
};

export default event_theme;
