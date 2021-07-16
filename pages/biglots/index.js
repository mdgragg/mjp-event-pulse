import { useState } from 'react';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import LandingPage from 'eventAssets/biglots/LandingPage';
import MainPage from 'eventAssets/biglots/MainPage';

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
  primary: '#FF5600',
  secondary: '#ffffff',
  tertiary: '',
  info: '',
  warning: '',
  offWhite: '#f7f7f7',
  offBlack: '#161616',
};

export const FONTS = {
  title: { fontFamily: '', fontSize: '', letterSpacing: '', lineHeight: '' },
  body: {
    fontFamily: 'Futura Bold',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
  },
  primary: '', //default to title
  secondary: '', // default to body
  tertiary: '', // default to body
};

export const BUTTONS = {
  primary: {
    fontFamily: FONTS.body.fontFamily,
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: COLORS.primary,
    fontColor: COLORS.secondary,
    border: '',
  },
  secondary: {
    fontFamily: '',
    fontSize: '',
    letterSpacing: '',
    lineHeight: '',
    backgroundColor: '',
    fontColor: '',
    border: '',
  },
  big: {
    fontFamily: 'Futura Bold',
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
    fontColor: COLORS.orange,
    backgroundColor: 'white',
  },
};

export const BREAKPOINTS = {
  xl: 1920,
  lg: 1600,
  md: 1200,
  sm: 768,
  xs: 500,
};

export var event_theme = {
  colors: { ...COLORS },
  fonts: { ...FONTS },
  buttons: { ...BUTTONS },
  breakpoints: { ...BREAKPOINTS },
  headerHeight: '200px',
  headerOpacity: '0.75',
  videoBreakPoint: 0,
  maxSectionWidth: '1800px',
};

export const EVENT_URL = 'biglots';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const { event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const [auth, setAuth] = useState(false);

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
      <Body>
        {false ? (
          <LandingPage main_event={main_event} />
        ) : (
          <MainPage main_event={main_event} hasAuth={auth} />
        )}
      </Body>
    </Page>
  );
};

export async function getStaticProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];
  let theme = {};
  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
      theme,
    },
    revalidate: 3000,
  };
}

export default Index;
