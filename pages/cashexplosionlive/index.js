import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import cookies from 'next-cookies';
import _ from 'lodash';
import { getEventMeta, getEventMetaMain, getMainEventMeta } from 'lib/api';

import { Grid, Button } from '@material-ui/core';
import Link, { navigate } from 'next/link';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';

import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import VideoBox__iFrame from 'components/VideoBoxes/Video__iFrame';
import CircleSpeaker from 'components/ListItems/CircleSpeaker';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import FlexHero from 'components/Heroes/FlexHero';
import Counter from 'components/Counters/Counter';
import Footer from 'components/template1/Footer';

import PreviewTemplate from './[...preview_template]';
import Section from 'components/template1/Section';
import SingleEvent from 'components/BreakoutSessions/SingleEvent';
import ServerSentEvents from '../../components/RealTimeAssets/ServerSentEvents';
import NameScroller from '../../components/RealTimeAssets/NameScroller';

import Agenda from 'components/IndividualEventAssets/ads-sales-meetings-2021/Agenda';
import SignUp from 'components/IndividualEventAssets/cashexplosionlive/SignUp';
import MainEvent from 'components/IndividualEventAssets/cashexplosionlive/MainEvent';
import Success from 'components/IndividualEventAssets/cashexplosionlive/Success';
import Wrap from 'components/IndividualEventAssets/cashexplosionlive/Wrap';

export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '600px',
  green: '#00d35a',
  lightGreen: '#6dff80',
  purple: '#667ff6',
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
export const EVENT_URL = 'cashexplosionlive';

const Decider = ({ template, main_event, theme }) => {
  switch (template) {
    case 'success':
      return <Success main_event={main_event} theme={theme} />;
      break;
    case 'signup':
      return <SignUp main_event={main_event} theme={theme} />;
      break;
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

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
    body_bg: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const calculateIfStarted = () => {
    let now = new Date();
    const parsed_event_start = Date.parse(
      main_event.eventStartEnd.StartDateTime
    );

    let calc_time = parsed_event_start - now;

    if (calc_time <= 0) {
      return true;
    }
    return false;
  };

  const [hasStarted, setStarted] = useState(calculateIfStarted());
  const [deciderTemplate, setDeciderTemplate] = useState('main-event');

  useEffect(() => {
    const interval = setInterval(() => {
      setStarted(calculateIfStarted());
    }, 1000);

    return () => clearInterval(interval);
  });

  const MainPage = () => {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <Body>
          <Wrap theme={event_theme}>
            <Decider
              template={deciderTemplate}
              theme={event_theme}
              main_event={main_event}
            />
          </Wrap>
        </Body>
        <Footer>
          {event_meta.eventStatus.EventStatus === 'Preview' ? (
            <div>
              <h2>Preview Area</h2>
              <button
                style={{ display: 'inline', margin: '0 1rem' }}
                onClick={() => setDeciderTemplate('main-event')}
              >
                Main Event
              </button>

              <button
                style={{ display: 'inline', margin: '0 1rem' }}
                onClick={() => setDeciderTemplate('signup')}
              >
                Sign Up
              </button>

              <button
                style={{ display: 'inline', margin: '0 1rem' }}
                onClick={() => setDeciderTemplate('success')}
              >
                Success
              </button>
            </div>
          ) : null}
        </Footer>
      </Page>
    );
  };

  return <MainPage />;
};

export async function getServerSideProps(ctx) {
  //console.log(ctx.req.cookies);
  const preview = ctx.req.cookies[`preview_cookies--${EVENT_URL}`];
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  try {
    let eventData = await getEventMeta(EVENT_URL);
    if (
      eventData.eventStatus?.EventStatus === 'Preview' &&
      preview !== 'true'
    ) {
      return {
        redirect: {
          destination: `${EVENT_URL}/preview`,
        },
      };
    }
    let main_event =
      eventData?.events?.filter((ev) => ev.isMainEvent === true)[0] || {};

    const values = {
      props: {
        //meta will be the props for the event
        event_meta: eventData,
        main_event,
      },
    };
    return values;
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
