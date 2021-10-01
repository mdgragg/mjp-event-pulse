import { createTheme } from '@material-ui/core';
import MJxTheme from 'types/Theme';

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
  darkBlue: '#0047bb',
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
    secondary: COLORS.primary,
    tertiary: COLORS.blue,
  },
  background: {
    primary: COLORS.offWhite,
    secondary: COLORS.white,
    tertiary: COLORS.white,
  },
};

const FONTS = {
  title: {
    fontFamily: 'Akzidenz-Grotesque-Bold',
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    letterSpacing: '',
    fontWeight: '800',
    lineHeight: 'clamp(2rem, 7vw, 3rem)',
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
    backgroundColor: COLORS.blue,
    color: 'white',
    border: '',
  },
  secondary: {
    fontFamily: 'Avenir',
    fontSize: '1rem',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: COLORS.blue,
    color: COLORS.white,
    border: '',
  },
  big: {
    fontFamily: 'Avenir',
    fontSize: '2rem',
    letterSpacing: '2px',
    lineHeight: 'auto',
    backgroundColor: COLORS.primary,
    color: COLORS.secondary,
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
      color: '',
      bgColor: '',
    },
  },
  hover: {
    color: COLORS.primary,
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
    color: COLORS.primary,
    fontSize: 'clamp(1.5rem, 20vw, 2rem)',

  },
  h3: {
    color: COLORS.white,
  },
  h4: {
    fontSize: '2rem',
    color: COLORS.white,
    lineHeight: '2rem',
  },
};

const GLOBALS = {
  heroHeight: '240px',
  heroBgColor: COLORS.primary,
  headerOpacity: '1',
  videoBreakPoint: 1000,
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
