import { createTheme } from '@material-ui/core';

const COLORS = {
  red: 'rgba(173,33,28)',
  orange: '#FF5600',
  yellow: '#eace28',
  green: 'rgba(123,161,61)',
  blue: '#0166ab',
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
    tertiary: COLORS.tertiary,
  },
  background: {
    primary: COLORS.white,
    secondary: COLORS.green,
    tertiary: COLORS.tertiary,
  },
};
const FONTS = {
  title: {
    fontFamily: 'Meta Pro',
    fontSize: 'clamp(1.5rem, 20vw, 2rem)',
    letterSpacing: '',
    fontWeight: '800',
    lineHeight: '3rem',
  },
  body: {
    fontFamily: 'Meta Pro',
    fontWeight: '200',
    fontSize: 'clamp(1.25rem, 20vw, 1rem)',
    letterSpacing: '',
    lineHeight: 'auto',
    margin: '0',
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
    fontFamily: 'Meta Pro',
    fontSize: '0.85rem',
    letterSpacing: '2px',
    lineHeight: 'inherit',
    backgroundColor: COLORS.green,
    color: 'white',
    border: '',
  },
  secondary: {
    fontFamily: FONTS.body.fontFamily,
    fontSize: '1rem',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: '',
    color: '',
    border: '',
  },
  big: {
    fontFamily: 'Meta Pro',
    fontSize: '1rem',
    letterSpacing: '2px',
    lineHeight: 'auto',
    backgroundColor: COLORS.red,
    color: COLORS.white,
    border: '5px solid white',
  },
  small: {
    fontFamily: '',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: '',
    color: '',
    border: '',
    hover: {
      fontColor: '',
      bgColor: '',
    },
  },
  hover: {
    color: COLORS.red,
    backgroundColor: COLORS.white,
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
  },
  p: {
    ...FONTS.body,
  },
};

const GLOBALS = {
  heroHeight: '500px',
  heroBgColor: COLORS.secondary,
  headerOpacity: '1',
  videoBreakPoint: 700,
  maxSectionWidth: '1800px',
};

export const default_theme = {
  ...createTheme(),
  typography: { ...TYPOGRAPHY },
  colors: { ...COLORS },
  palette: { ...PALETTE },
  fonts: { ...FONTS },
  buttons: { ...BUTTONS },
  breakpoints: { ...BREAKPOINTS },
  ...GLOBALS,
};

export default default_theme;
