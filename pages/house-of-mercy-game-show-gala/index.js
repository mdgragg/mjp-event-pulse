import { useState } from 'react';
import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Section from 'components/Sections/Section';
import PlayerWithChat from 'components/BodyTemplates/PlayerWithChat';
import Body from 'components/template1/Body';
import Hero from 'components/IndividualEventAssets/ywca-women-of-achievement/Hero';
import { toast } from 'react-toastify';
import FullWrap from 'components/FullWrap';
import Banner_ImgBg from 'components/Banners/Banner_ImgBg';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';

import AuthWrap from 'components/AuthWrap';
export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '200px',
  green: '#97d700',
  grey: '#181818',
  white: null,
  blue: '#1e2c60',
  red: '#e41936',
  orange: '#FF5600',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Futura Bold',
  headerFontColor: 'white',
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};

export const EVENT_URL = 'house-of-mercy-game-show-gala';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const { event_meta, main_event } = props;
  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStartEnd = useCalculateIfStarted(main_event);
  const [auth, setAuth] = useState(false);

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
    </Page>
  );
};
// export async function getServerSideProps(ctx) {
//   const { preview } = cookies(ctx);
//   const { hasLoggedIn } = cookies(ctx);
//   return { props: {} };
// }

export async function getStaticProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
    },
  };
}

export default Index;
