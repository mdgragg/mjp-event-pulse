import { createTheme } from '@material-ui/core';

const COLORS = {
  red: '#b71f39',
  orange: '#FF5600',
  yellow: '#eace28',
  green: '#97d700',
  blue: '#1e2c60',
  indigo: '#0d2f49',
  violet: '#5602b7',
  white: '#ffffff',
  black: '#000000',
  primary: '#204D9B',
  secondary: 'white',
  tertiary: '#204D9B',
  info: '',
  warning: '',
  offWhite: '#f7f7f7',
  offBlack: '#161616',
};

const FONTS = {
  title: {
    fontFamily: 'Roboto ',
    fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
    letterSpacing: '',
    fontWeight: '800',
    lineHeight: '4.5rem',
  },
  body: {
    fontFamily: 'Avenir',
    fontWeight: '200',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
  },
  get primary() {
    return this.body;
  }, //default to title
  get secondary() {
    return this.body;
  }, // default to body
  get tertiary() {
    return this.body;
  }, // default to body
};

export const BUTTONS = {
  primary: {
    fontFamily: 'Avenir',
    fontSize: '0.85rem',
    letterSpacing: '2px',
    lineHeight: 'inherit',
    backgroundColor: COLORS.tertiary,
    fontColor: 'white',
    border: '',
  },
  secondary: {
    fontFamily: FONTS.body.fontFamily,
    fontSize: '1rem',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: '',
    fontColor: '',
    border: '',
  },
  big: {
    fontFamily: 'Avenir',
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
    fontColor: 'white',
    backgroundColor: 'black',
  },
};

const BREAKPOINTS = {
  xl: 1920,
  lg: 1600,
  md: 1200,
  sm: 768,
  xs: 500,
};

const TYPOGRAPHY = {
  h1: {
    color: COLORS.secondary,
    ...FONTS.title,
  },
  h2: {
    color: COLORS.secondary,
    fontSize: 'clamp(1.25rem, 10vw, 1rem)',
  },
  h3: {
    color: COLORS.tertiary,
  },
};

export const default_theme = {
  ...createTheme(),
  typography: { ...TYPOGRAPHY },
  colors: { ...COLORS },
  fonts: { ...FONTS },
  buttons: { ...BUTTONS },
  breakpoints: { ...BREAKPOINTS },
  heroHeight: '380px',
  heroBgColor: COLORS.tertiary,
  headerOpacity: '1',
  videoBreakPoint: 700,
  maxSectionWidth: '1800px',
};

export default default_theme;
