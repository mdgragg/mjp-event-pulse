import { createTheme } from '@material-ui/core';
import type { BREAKPOINTS, BUTTONS, COLORS, FONTS, GLOBALS, MJxTheme, PALETTE, TYPOGRAPHY } from 'types/Theme';

const THEME_COLORS: COLORS = {
  red: 'tomato',
  orange: '#FF5600',
  yellow: '#eace28',
  green: 'rgb(73,163,90)',
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
const THEME_PALETTE: PALETTE = {
  text: {
    primary: THEME_COLORS.black,
    secondary: THEME_COLORS.green,
    tertiary: THEME_COLORS.white,
    error: 'red',
    info: 'blue',
    success: 'green'
  },
  background: {
    primary: THEME_COLORS.white,
    secondary: THEME_COLORS.white,
    tertiary: THEME_COLORS.orange,
    error: 'red',
    info: 'blue',
    success: 'green'
  },
  error: THEME_COLORS.red,
  info: 'blue',
  success: 'green'

};
const THEME_FONTS: FONTS = {
  title: {
    fontFamily: 'Roboto ',
    fontSize: 'clamp(1.5rem, 20vw, 2rem)',
    letterSpacing: '',
    fontWeight: '800',
    lineHeight: '3rem',
  },
  body: {
    fontFamily: 'Roboto',
    fontWeight: '200',
    fontSize: 'clamp(1.25rem, 20vw, 1rem)',
    letterSpacing: '',
    lineHeight: 'auto',
  },
  get secondary() {
    return this.body;
  }, // default to body
  get tertiary() {
    return this.body;
  }, // default to body
};

export const THEME_BUTTONS: BUTTONS = {
  primary: {
    fontFamily: 'Roboto',
    fontSize: '0.85rem',
    letterSpacing: '2px',
    lineHeight: 'inherit',
    backgroundColor: THEME_COLORS.orange,
    color: 'white',
    border: '',
  },
  secondary: {
    fontFamily: THEME_FONTS.body.fontFamily,
    fontSize: '1rem',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: '',
    color: '',
    border: '',
  },
  big: {
    fontFamily: 'Roboto',
    fontSize: '2rem',
    letterSpacing: '2px',
    lineHeight: 'auto',
    backgroundColor: THEME_COLORS.primary,
    color: THEME_COLORS.secondary,
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
  },
  hover: {
    color: 'white',
    backgroundColor: THEME_COLORS.offBlack,
  },
};

const THEME_BREAKPOINTS : BREAKPOINTS= {
  xl: 1920,
  lg: 1600,
  md: 1200,
  sm: 768,
  xs: 500,
};

const THEME_TYPOGRAPHY: TYPOGRAPHY = {
  h1: {
    color: THEME_COLORS.black,
    ...THEME_FONTS.title,
  },
  h2: {
    color: THEME_COLORS.black,
    textAlign: 'left',

  },
  h3: {
    color: THEME_COLORS.black,
  },
  h4: {
    color: THEME_COLORS.primary,
  },
  h5: {
    color: THEME_COLORS.primary,
  },
  h6: {
    color: THEME_COLORS.primary,
  },
  body1: {
    ...THEME_FONTS.body,
  },
  body2: {
    ...THEME_FONTS.body,
  },
};

const THEME_GLOBALS :GLOBALS = {
  heroHeight: '350px',
  heroBgColor: THEME_COLORS.white,
  headerOpacity: '0.3',
  videoBreakPoint: 700,
  maxSectionWidth: '1800px',
} 

export const mjxTheme: MJxTheme = {
  muiTheme:{ ...createTheme()},
  typography: { ...THEME_TYPOGRAPHY },
  colors: { ...THEME_COLORS },
  palette: { ...THEME_PALETTE },
  fonts: { ...THEME_FONTS },
  buttons: { ...THEME_BUTTONS },
  breakpoints: { ...THEME_BREAKPOINTS },
  ...THEME_GLOBALS
};

export default mjxTheme;
