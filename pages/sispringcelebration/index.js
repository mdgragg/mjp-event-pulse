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
            {!hasStarted ? (
              <center>
                <h2
                  style={{
                    fontWeight: '800',
                    fontSize: '2rem',
                    color: event_theme.red,
                    margin: 'auto auto 0 auto',
                  }}
                >
                  STARTS IN
                </h2>
                <Counter
                  fontSize={'1rem'}
                  shadow={'0px'}
                  bgColor={event_theme.blue}
                  textColor={'white'}
                  hasStarted={hasStarted}
                  start={main_event.eventStartEnd.StartDateTime}
                />
              </center>
            ) : (
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
            )}
          </div>
        </FlexHero>

        <Body>
          <Section>
            <Grid container spacing={3}>
              <Grid item={true} md={8} sm={12} xs={12}>
                <VideoBox__StickyTop
                  isStarted={hasStarted}
                  src={
                    main_event.streamLinks.find((link) => link.isMain === true)
                      .url
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
                    render={
                      (data) => {
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
                      }
                      // data.name === null ? (

                      // ) : (
                      //   <div style={{ maxWidth: '80%' }}>
                      //     <center>
                      //       <img
                      //         src={data.imgSrc}
                      //         alt={data.name}
                      //         style={{
                      //           width: '250px',
                      //           height: 'auto',
                      //           marginTop: '4rem',
                      //         }}
                      //       />
                      //       <h4>{data.name}</h4>
                      //       <CountUp
                      //         formattingFn={(value) =>
                      //           Intl.NumberFormat('en-US', {
                      //             style: 'currency',
                      //             currency: 'USD',
                      //             minimumFractionDigits: 0,
                      //           }).format(value)
                      //         }
                      //         prefix="$ "
                      //         separator=","
                      //         duration={5}
                      //         start={data.previousBid}
                      //         end={data.currentBid || 0}
                      //       />
                      //     </center>
                      //   </div>
                      // )
                    }
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
        console.log('redirecting');
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