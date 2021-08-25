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

const PALETTE = {
  text: {
    primary: COLORS.white,
    secondary: COLORS.secondary,
    tertiary: COLORS.tertiary,
  },
  background: {
    primary: COLORS.tertiary,
    secondary: COLORS.secondary,
    tertiary: COLORS.tertiary,
  },
};


export const FONTS = {
  title: { fontFamily: '', fontSize: '', letterSpacing: '', lineHeight: '' },
  body: {
    fontFamily: 'Avenir',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
  },
  get primary() {
    this.body;
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
    backgroundColor: COLORS.tertiary,
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
    fontFamily: 'Avenir',
    fontSize: '2.5rem',
    letterSpacing: '0px',
    lineHeight: 'auto',
    backgroundColor: COLORS.secondary,
    fontColor: COLORS.primary,
    border: '0px solid white',
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
    fontColor: COLORS.primary,
    backgroundColor: COLORS.secondary,
  },
};

export const BREAKPOINTS = {
  xl: 1920,
  lg: 1600,
  md: 1200,
  sm: 768,
  xs: 500,
};
const TYPOGRAPHY = {
  h1: {
    color: COLORS.tertiary,
  },
  h2: {
    color: COLORS.tertiary,
  },
  h3: {
    color: COLORS.tertiary,
  },
};

const GLOBALS = {
  heroHeight: '240px',
  heroBgColor: COLORS.primary,
  headerOpacity: '1',
  videoBreakPoint: 700,
  maxSectionWidth: '1800px',
};

export var event_theme = {
  colors: { ...COLORS },
  typography: { ...TYPOGRAPHY },
  palette: { ...PALETTE },
  fonts: { ...FONTS },
  buttons: { ...BUTTONS },
  breakpoints: { ...BREAKPOINTS },
  ...GLOBALS

};
