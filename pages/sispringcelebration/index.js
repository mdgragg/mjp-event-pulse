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
import VideoBox__StickyTop__WithCountdown from 'components/VideoBoxes/Video__StickyTop__WithCountdown';
import VideoBox__iFrame from 'components/VideoBoxes/Video__iFrame';
import FetchHtml from 'components/iFrames/FetchHtml';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import FlexHero from 'components/Heroes/FlexHero';
import Counter from 'components/Counters/Counter';
import Footer from 'components/template1/Footer';

import Section from 'components/template1/Section';
import SingleEvent from 'components/BreakoutSessions/SingleEvent';
import ServerSentEvents from '../../components/RealTimeAssets/ServerSentEvents';
import NameScroller from '../../components/RealTimeAssets/NameScroller';

import NameTable from 'components/IndividualEventAssets/sispringcelebration/NameTable';
import SingleAuctionItem from 'components/IndividualEventAssets/SingleAuctionItem';
export var event_theme = {
  heroHeight: '22vh',
  fontFamily: null,
  headerOpacity: null,
  videoBreakPoint: 700,
  white: null,
  blue: '#1e2c60',
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  red: '#b71f39',
  buttonColor: null,
  headerFont: null,
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};
const Index = (props) => {
  const router = useRouter();

  const {
    event_meta,
    main_event,
    event_meta: { AuthRequired },
    main_event: { BreakoutSessions },
  } = props;

  event_theme = {
    ...event_theme,
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
        {event_meta.AuthRequired ? (
          <div style={{ textAlign: 'center' }}>
            <h2>PREVIEW</h2>
            <p>
              Public page <Link href={`${router.pathname}/landing`}> here</Link>
            </p>
          </div>
        ) : null}
        <FlexHero hasStarted={hasStarted} title={event_meta.EventJobName}>
          <div>
            <img
              style={{ width: '100%', maxWidth: '100px' }}
              src={main_event.KeyValue[0]?.value}
            />
          </div>
          <div>
            {' '}
            <img
              style={{ width: '100%', maxWidth: '500px' }}
              src={main_event.KeyValue[1]?.value}
            />
          </div>
          <div>
            <center>
              <Counter
                fontSize={'1rem'}
                shadow={'0px'}
                bgColor={event_theme.blue}
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
              <Grid item={true} md={8} sm={12} xs={12}>
                <VideoBox__StickyTop__WithCountdown
                  showMinutesBefore={15}
                  start={main_event.eventStartEnd.StartDateTime}
                  isStarted={true}
                  src={
                    main_event.streamLinks.find((link) => link.isMain === true)
                      .url
                  }
                  showBefore={
                    <div
                      style={{
                        height: 'inherit',
                        width: '100%',
                        backgroundColor: '#181818',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        color: 'white',
                      }}
                    >
                      <p
                        style={{
                          margin: '3rem auto',
                          maxWidth: '50%',
                          fontSize: '1.5rem',
                          textAlign: 'center',
                        }}
                      >
                        The event hasn't started yet. This video stream will
                        update when it does.
                      </p>
                      <div
                        style={{
                          position: 'relative',
                          zIndex: '99',
                          backgroundColor: 'white',
                          height: '300px',
                          width: '300px',
                          borderRadius: '200px',
                          marginBottom: '2rem',
                        }}
                      >
                        <img
                          style={{
                            position: 'absolute',
                            top: '20%',
                            transformOrigin: 'center center',
                            left: '0',
                            right: '0',
                            width: '100%',
                            maxWidth: '150px',
                            zIndex: '100',
                            margin: 'auto',
                          }}
                          src={main_event.KeyValue[0]?.value}
                        />
                      </div>
                    </div>
                  }
                />

                <Button
                  style={{ margin: '2rem auto', display: 'block' }}
                  color={'primary'}
                  variant="outlined"
                  onClick={() => {
                    window.location.href = main_event.streamLinks.find(
                      (link) => link.Service === 'VimeoLink'
                    ).url;
                  }}
                >
                  Slow Connection?
                </Button>
              </Grid>
              <Grid item={true} md={4} xs={12}>
                {/* <FetchHtml endpoint="https://facebook.com" />
                <VideoBox__iFrame
                  stickTop={false}
                  isStarted={true}
                  src={
                    'https://bputil11.bidpal.net/Scoreboard/preview/start/bpe369297'
                  }
                /> */}
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'inherit',
                    minHeight: '300px',
                  }}
                >
                  <ServerSentEvents
                    endpoint={
                      main_event.streamLinks.find(
                        (link) => link.Service === 'LiveAssets'
                      ).url
                    }
                    render={(data) => {
                      if (data) {
                        switch (data.name) {
                          case null:
                            return (
                              <img
                                style={{ width: '120px' }}
                                src={main_event.KeyValue[0]?.value}
                              />
                            );
                            break;
                          case 'scroller':
                            return (
                              <NameScroller
                                title="Donations"
                                length={data.names.length}
                                children={<NameTable data={data} />}
                              />
                            );
                            break;
                          default:
                            return <SingleAuctionItem data={data} />;
                            break;
                        }
                      } else {
                        return (
                          <img
                            style={{ width: '120px' }}
                            src={main_event.KeyValue[0]?.value}
                          />
                        );
                      }
                    }}
                  ></ServerSentEvents>
                </div>
                <p
                  style={{
                    fontSize: '1.25rem',
                    textAlign: 'center',
                    maxWidth: '80%',
                    margin: '1rem auto 0 auto',
                  }}
                >
                  To join the live auction, download the bidpal app and follow
                  along on your phone. Having trouble?
                </p>
                <a href="#bidpal-help">
                  <Button
                    style={{ margin: '2rem auto', display: 'block' }}
                    color={'primary'}
                    variant="outlined"
                  >
                    Bidpal Help
                  </Button>
                </a>
              </Grid>
              <Grid item={true} md={8} xs={12}></Grid>
              <Grid item={true} md={4} xs={12}>
                <center>
                  <h2>Chat</h2>
                </center>
                <div
                  style={{
                    height: '510px',
                    color: '#181818',
                    maxWidth: '360px',
                    margin: '0 auto 2rem auto',
                    border: '3px solid rgba(0,0,0,0.05)',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <iframe
                    src={
                      main_event.streamLinks.find(
                        (link) => link.Service === 'Chat'
                      ).url
                    }
                    width="96%"
                    height="96%"
                    frameborder="0"
                    style={{ margin: 'auto', height: '100%' }}
                  ></iframe>
                </div>
              </Grid>
            </Grid>
          </Section>

          <BannerWithPicture color={event_theme.blue}></BannerWithPicture>
          <span id="bidpal-help" />
          <Section title="Bidpal Resources">
            <Grid container spacing={3} justify={'center'}>
              {BreakoutSessions[1]?.map((session) => (
                <Grid item key={session.id}>
                  <SingleEvent buttonText="Click Here" session={session} />
                </Grid>
              ))}
            </Grid>
          </Section>
          {/* <Section showButton title="Platinum Sponsors">
            <Grid container spacing={3} justify={'center'}></Grid>
          </Section> */}
        </Body>
        <Footer></Footer>
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
    let eventData = await getEventMeta('sispringcelebration');

    let main_event = eventData.events.filter(
      (ev) => ev.isMainEvent === true
    )[0];

    //make breakout sessions array by category
    let breakoutObj = {};

    main_event.BreakoutSessions.forEach((sesh) => {
      let key = Object.keys(breakoutObj).find(
        (title) => title === sesh.Category
      );
      if (!key) {
        breakoutObj[sesh.Category] = [sesh];
      } else {
        breakoutObj[sesh.Category] = [...breakoutObj[sesh.Category], sesh];
      }
    });

    main_event.BreakoutSessions = breakoutObj;

    if (eventData.AuthRequired) {
      if (cookies(ctx).preview !== 'true') {
        return {
          redirect: {
            destination: '/sispringcelebration/landing',
          },
        };
      }
    }
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
