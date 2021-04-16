import { useEffect, useState, useContext } from 'react';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import Footer from 'components/template1/Footer';
import { EVENT_URL } from './index';

export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '600px',
  green: '#97d700',
  white: null,
  blue: '#1e2c60',
  red: '#b71f39',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Akzidenz-Grotesque-Bold',
  headerFontColor: 'white',
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};

const PLACEHOLD = 'https://placehold.co/';

const ThankYou = (props) => {
  const { event_meta, main_event, speakers } = props;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const MainPage = () => {
    return (
      <>
        <Page theme={event_theme}>
          <Meta title={event_meta.EventJobName}> </Meta>
          <Body></Body>
          <Footer></Footer>
        </Page>
      </>
    );
  };

  return <MainPage />;
};
// export async function getServerSideProps(ctx) {
//   const { preview } = cookies(ctx);
//   const { hasLoggedIn } = cookies(ctx);
//   return { props: {} };
// }

export async function getServerSideProps(ctx) {
  //console.log(ctx.req.cookies);

  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  return {
    redirect: {
      destination: `/${EVENT_URL}`,
    },
  };
}

export default ThankYou;
