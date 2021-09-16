import { Theme as MuiTheme } from "@material-ui/core";

/**
 * What does this do?
 */
export type COLORS = {
  red: string;
  orange: string;
  yellow: string;
  green: string;
  blue: string;
  indigo: string;
  violet: string;
  white: string;
  black: string;
  primary: string;
  secondary: string;
  tertiary: string;
  offWhite: string;
  offBlack: string;
  [x: string]: string;
};

type PaletteType = {
  primary: string;
  secondary: string;
  tertiary: string;
  error: string;
  info: string;
  success: string;
};

/**
 * All colors for the page should be handled here
 */
export type PALETTE = {
  /**
   * colors for text throughout the page
   */
  text: PaletteType;
  /**
   * colors for background throughout the page
   */
  background: PaletteType;
  info: string;
  error: string;
  success: string;
};

type FontType = {
  fontFamily: string;
  fontSize: string;
  letterSpacing?: string;
  lineHeight?: string
  textDecoration?: string
  fontWeight?: string
};

export type FONTS = {
  title: FontType;
  body: FontType;
  secondary: ''; // default to body
  tertiary: ''; // default to body
};

type ButtonType = {
  fontFamily: string;
  fontSize: string;
  letterSpacing: string;
  lineHeight: string;
  backgroundColor: string;
  color: string;
  border: string;
};

export type BUTTONS = {
  primary: ButtonType;
  secondary: ButtonType;
  big: ButtonType;
  small: ButtonType;
  hover: {
    color: string;
    backgroundColor: string;
  };
};

export type TYPOGRAPHY = {
  h1: {
    [x: string]: string;
  };
  h2: {
    [x: string]: string;
  };
  h3: {
    [x: string]: string;
  };
  h4: {
    [x: string]: string;
  };
  h5: {
    [x: string]: string;
  };
  h6: {
    [x: string]: string;
  };
  body1: {
    [x: string]: string;
  };
  body2: {
    [x: string]: string;
  };
};

export type BREAKPOINTS = {
  xl: number;
  lg: number;
  md: number;
  sm: number;
  xs: number;
};

export type GLOBALS = {
  heroHeight: string;
  heroBgColor: string;
  headerOpacity: string;
  videoBreakPoint: number;
  maxSectionWidth: string;
  [x: string] : any
};

export type MJxTheme = {
    colors: COLORS
    palette: PALETTE
    fonts: FONTS
    buttons: BUTTONS
    typography: TYPOGRAPHY
    breakpoints: BREAKPOINTS
    muiTheme: MuiTheme
    [x: string] : any 
};

export default MJxTheme