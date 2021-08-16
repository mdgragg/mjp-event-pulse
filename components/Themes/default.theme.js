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
  primary: 'black',
  secondary: 'white',
  tertiary: 'var(--mjp-orange)',
  info: '',
  warning: '',
  offWhite: '#f7f7f7',
  offBlack: '#161616',
};

const FONTS = {
  title: {
    fontFamily: 'Avenir',
    fontSize: '2rem',
    letterSpacing: '',
    fontWeight: '800',
    lineHeight: '',
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
    color: COLORS.tertiary,
  },
  h2: {
    color: COLORS.tertiary,
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
  headerHeight: '200px',
  heroBgColor: 'white',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  maxSectionWidth: '1800px',
};

export default default_theme;
