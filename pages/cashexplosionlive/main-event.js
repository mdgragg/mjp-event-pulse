import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import cookies from 'next-cookies';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import Footer from 'components/template1/Footer';
import SignUp from 'components/IndividualEventAssets/cashexplosionlive/SignUp';
import MainEvent from 'components/IndividualEventAssets/cashexplosionlive/MainEvent';
import Success from 'components/IndividualEventAssets/cashexplosionlive/Success';
import Wrap from 'components/IndividualEventAssets/cashexplosionlive/Wrap';
import attendee_capture from 'lib/fetchCalls/attendee_capture';
import { toast } from 'react-toastify';
import { EVENT_URL, event_theme } from './index';

const PLACEHOLD = 'https://placehold.co/';

const Decider = ({ template, main_event, theme }) => {
  switch (template) {
    case 'main-event':
      return <MainEvent main_event={main_event} theme={theme} />;
      break;
    default:
      return <MainEvent main_event={main_event} theme={theme} />;
  }
};

const Index = (props) => {
  const router = useRouter();

  const {
    event_meta,
    main_event,
    speakers,
    event_meta: { AuthRequired },
    main_event: { BreakoutSessions },
  } = props;

  var event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
    body_bg: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const MainPage = () => {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <Body>
          <Wrap theme={event_theme}>
            <Decider
              template={'main-event'}
              theme={event_theme}
              main_event={main_event}
            />
          </Wrap>
        </Body>
      </Page>
    );
  };

  return <MainPage />;
};

export async function getServerSideProps(ctx) {
  //console.log(ctx.req.cookies);

  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  try {
    let eventData = await getEventMeta(EVENT_URL);

    let main_event =
      eventData?.events?.filter((ev) => ev.isMainEvent === true)[0] || {};

    if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] === 'true') {
      return {
        props: {
          //meta will be the props for the event
          event_meta: eventData,
          main_event,
        },
      };
    }
    return {
      redirect: {
        destination: './preview',
        permanent: false,
      },
    };
  } catch (error) {
    console.log('get static props error: ', error);
    return {
      redirect: {
        destination: '/',
      },
    };
  }
}

export default Index;
