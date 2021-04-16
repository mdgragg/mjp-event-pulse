import { useEffect, useState, useContext, createContext } from 'react';
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

import Section from 'components/template1/Section';
import SingleEvent from 'components/BreakoutSessions/SingleEvent';
import ServerSentEvents from '../../components/RealTimeAssets/ServerSentEvents';
import DateParse from '../../components/assets/DateParse';

import Agenda from 'components/IndividualEventAssets/ads-sales-meetings-2021/Agenda';
import SingleAuctionItem from 'components/IndividualEventAssets/SingleAuctionItem';
import AttendeeAuthModal from '../../components/Modals/AttendeeAuthModal';
import { toast } from 'react-toastify';
export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '600px',
  green: '#97d700',
  white: null,
  blue: '#002e5c',
  red: '#b71f39',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Tiempos Fine',
  headerFontColor: 'black',
  headerBgColor: 'white',
  headerOpacity: '0.6',
  maxSectionWidth: '1800px',
};

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'nff-athlete-scholar-banquet';

const Index = (props) => {
  const session_token = EVENT_URL;
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

  // const [hasStarted, setStarted] = createContext(false);

  const [hasAuthenticated, setHasAuthenticated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStarted(calculateIfStarted());
    }, 1000);

    const storage_auth = sessionStorage.getItem(session_token);

    if (storage_auth === 'true') {
      setHasAuthenticated(true);
    } else {
      setHasAuthenticated(false);
    }

    return () => clearInterval(interval);
  }, []);

  const MainPage = () => {
    return (
      <>
        <AttendeeAuthModal
          eventId={main_event.id}
          event_name={main_event.EventName}
          open={!hasAuthenticated}
          callback={(creds) => {
            setHasAuthenticated(true);
            sessionStorage.setItem(session_token, true);
            toast.success(creds);
          }}
        />
        <div
          style={{
            filter: `${!hasAuthenticated ? 'blur(20px)' : 'blur(0px)}'}`,
          }}
        >
          <Page theme={event_theme}>
            <Meta title={event_meta.EventJobName}> </Meta>
            <FlexHero hasStarted={hasStarted} title={event_meta.EventJobName}>
              <div></div>
              <div>
                <center>
                  <img
                    style={{
                      width: '100%',
                      maxWidth: '350px',
                      margin: '2rem auto',
                    }}
                    src={main_event.KeyValue[0]?.value}
                  />

                  <h1
                    style={{ margin: 'auto', fontSize: '3rem', width: '80%' }}
                  >
                    {main_event.EventName}
                  </h1>
                  <h2 style={{ margin: 'auto' }}>
                    <i>
                      <DateParse
                        date={main_event.eventStartEnd.StartDateTime}
                      />
                    </i>
                  </h2>
                </center>
              </div>
              <div>
                <center>
                  <Counter
                    fontSize={'1rem'}
                    shadow={'0px'}
                    bgColor={event_theme.blue}
                    counterText={'Starts In'}
                    counterTextColor={'white'}
                    textColor={'white'}
                    hasStarted={hasStarted}
                    afterStarted={
                      <>
                        <center>
                          <h2
                            style={{
                              fontWeight: '800',
                              fontSize: '2rem',
                              color: 'white',
                              padding: '0.5rem',
                              backgroundColor: event_theme.red,
                              margin: 'auto auto 0 auto',
                            }}
                          >
                            Live Now
                          </h2>
                        </center>
                      </>
                    }
                    start={main_event.eventStartEnd.StartDateTime}
                  />
                </center>
              </div>
            </FlexHero>

            <Body>
              <Section>
                <Grid container spacing={3}>
                  <Grid item md={1}>
                    {' '}
                  </Grid>
                  <Grid item={true} md={10} sm={12} xs={12}>
                    <div
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {hasAuthenticated ? (
                        <VideoBox__StickyTop
                          isStarted={true}
                          src={main_event.streamLinks[0].url}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </Grid>
                  <Grid item md={1}>
                    {' '}
                  </Grid>
                </Grid>
              </Section>
              <BannerWithPicture
                imgUrl={main_event.KeyValue[1]?.value}
                color={'black'}
                secondary={`white`}
                headerText={`About this Event`}
                innerWidth={`650px`}
                buttonText={`Learn More`}
                buttonLink={`https://www.nffcolumbus.com/ `}
              >
                {main_event.Description && main_event.Description}
              </BannerWithPicture>
            </Body>
          </Page>
        </div>
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
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  let eventData = await getEventMeta(EVENT_URL);

  const preview_cookie = ctx.req.cookies[`preview_cookie__${EVENT_URL}`];

  let main_event = eventData.events.filter((ev) => ev.isMainEvent === true)[0];

  if (
    eventData.eventStatus.EventStatus === 'Preview' &&
    preview_cookie !== 'true'
  ) {
    return {
      redirect: {
        destination: EVENT_URL + '/preview',
        permanent: false,
      },
    };
  }
  return {
    props: {
      //meta will be the props for the event
      event_meta: eventData,
      main_event,
    },
  };
}

export default Index;
