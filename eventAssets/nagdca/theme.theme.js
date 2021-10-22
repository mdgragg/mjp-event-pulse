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
  primary: '#0047bb',
  secondary: 'white',
  tertiary: '#141b4d',
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

const FONTS = {
  title: {
    fontFamily: 'Akzidenz-Grotesque-Bold',
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    letterSpacing: '',
    fontWeight: '800',
    lineHeight: '4.5rem',
  },
  body: {
    fontFamily: 'Akzidenz-Grotesque-Bold',
    fontWeight: '200',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
  },
  get special() {
    return this.title;
  }, //default to title
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
    fontColor: COLORS.primary,
    backgroundColor: '#f7f7f7',
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
  h4: {
    fontSize: '1rem',
    color: COLORS.white,
    lineHeight: '2rem',
  },
};

const GLOBALS = {
  heroHeight: '240px',
  heroBgColor: COLORS.primary,
  headerOpacity: '1',
  videoBreakPoint: 700,
  maxSectionWidth: '1800px',
};

export const default_theme = {
  ...createTheme(),
  colors: { ...COLORS },
  palette: { ...PALETTE },
  fonts: { ...FONTS },
  buttons: { ...BUTTONS },
  typography: { ...TYPOGRAPHY },
  breakpoints: { ...BREAKPOINTS },
  ...GLOBALS,
};

export default default_theme;
