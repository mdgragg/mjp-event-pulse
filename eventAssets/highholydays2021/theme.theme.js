import { createTheme } from '@material-ui/core';

const COLORS = {
  red: '#76201D',
  orange: '#FF5600',
  yellow: '#eace28',
  green: '#97d700',
  blue: '#1e2c60',
  indigo: '#0d2f49',
  violet: '#5602b7',
  white: '#ffffff',
  black: '#000000',
  primary: 'white',
  secondary: '#1e372f',
  tertiary: '#4f4f4d',
  info: '',
  warning: '',
  offWhite: '#f7f7f7',
  offBlack: '#161616',
};
const PALETTE = {
  text: {
    primary: COLORS.red,
    secondary: COLORS.white,
    tertiary: COLORS.white,
  },
  background: {
    primary: COLORS.white,
    secondary: COLORS.red,
    tertiary: COLORS.red,
  },
};
const FONTS = {
  title: {
    fontFamily: 'Roboto ',
    fontSize: '1.25rem',
    letterSpacing: '',
    fontWeight: '800',
    lineHeight: 'auto',
  },
  body: {
    fontFamily: 'Roboto',
    fontWeight: '200',
    fontSize: '1rem',
    letterSpacing: '',
    lineHeight: 'auto',
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
    fontFamily: 'Roboto',
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
    fontFamily: 'Roboto',
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
    backgroundColor: COLORS.secondary,
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
    color: COLORS.red,
    ...FONTS.title,
  },
  h2: {
    color: COLORS.red,
    ...FONTS.body,
  },
  h3: {
    color: COLORS.red,
    fontSize: '2rem'
  },
  p: {
    ...FONTS.body,
  },
};

export const default_theme = {
  ...createTheme(),
  typography: { ...TYPOGRAPHY },
  colors: { ...COLORS },
  palette: { ...PALETTE },
  fonts: { ...FONTS },
  buttons: { ...BUTTONS },
  breakpoints: { ...BREAKPOINTS },
  heroHeight: '250px',
  heroBgColor: COLORS.white,
  headerOpacity: '0.1',
  videoBreakPoint: 700,
  maxSectionWidth: '1800px',
};

export default default_theme;
