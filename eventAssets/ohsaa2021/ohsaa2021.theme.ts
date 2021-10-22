import { createTheme } from '@material-ui/core';
import type { BREAKPOINTS, BUTTONS, COLORS, FONTS, MJxTheme, PALETTE, TYPOGRAPHY } from 'types/Theme';

const THEME_COLORS: COLORS = {
  red: '#b71f39',
  orange: '#FF5600',
  yellow: '#fbee13',
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
const THEME_PALETTE: PALETTE = {
  text: {
    primary: THEME_COLORS.black,
    secondary: THEME_COLORS.yellow,
    tertiary: THEME_COLORS.white,
    error: 'red',
    info: 'blue',
    success: 'green'
  },
  background: {
    primary: THEME_COLORS.white,
    secondary: THEME_COLORS.black,
    tertiary: THEME_COLORS.orange,
    error: 'red',
    info: 'blue',
    success: 'green'
  },
  error: 'blue',
  info: 'blue',
  success: 'green'

};
const THEME_FONTS: FONTS = {
  title: {
    fontFamily: 'BTTF',
    fontSize: 'clamp(1.5rem, 4vw, 4rem)',
    letterSpacing: '',
    fontWeight: '800',
    lineHeight: 'clamp(1rem, 5vw, 4rem)',
  },
  body: {
    fontFamily: 'Avenir',
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
    color: THEME_COLORS.primary,
    ...THEME_FONTS.title,
  },
  h2: {
    color: THEME_COLORS.black,
    background: 'linear-gradient(180deg, rgba(255,103,8,1) 4%, rgba(253,191,34,1) 31%, rgba(252,227,53,1) 65%, rgba(255,106,13,1) 94%)',
    width: 'max-content',
    margin: '1rem auto',
    textAlign: 'center',
    padding: '10px'
  },
  h3: {
    color: THEME_COLORS.white,
    fontSize: 'clamp(0.5rem, 10vw, 1rem)',
    letterSpacing: '',
    fontWeight: '400',
    lineHeight: 'clamp(1rem, 3vw, 1.5rem)',
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

export const default_theme: MJxTheme = {
  muiTheme:{ ...createTheme()},
  typography: { ...THEME_TYPOGRAPHY },
  colors: { ...THEME_COLORS },
  palette: { ...THEME_PALETTE },
  fonts: { ...THEME_FONTS },
  buttons: { ...THEME_BUTTONS },
  breakpoints: { ...THEME_BREAKPOINTS },
  heroHeight: '450px',
  heroBgColor: THEME_COLORS.black,
  headerOpacity: '0.2',
  videoBreakPoint: 700,
  maxSectionWidth: '1800px',
};


