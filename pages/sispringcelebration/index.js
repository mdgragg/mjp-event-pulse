import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import cookies from 'next-cookies';
import _ from 'lodash';
import { getEventMeta, getEventMetaMain, getMainEventMeta } from 'lib/api';

import { Grid, Button } from '@material-ui/core';
import Link from 'next/link';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';

import Body from 'components/template1/Body';
import VideoBox from 'components/template1/VideoBox';

import BannerWithPicture from 'components/Banners/BannerWithPicture';
import FlexHero from 'components/Heroes/FlexHero';
import Counter from 'components/Counters/Counter';
import Footer from 'components/template1/Footer';

import Section from 'components/template1/Section';
import SingleEvent from 'components/BreakoutSessions/SingleEvent';
import ServerSentEvents from '../../components/RealTimeAssets/ServerSentEvents';
import CountUp from 'react-countup';
export var event_theme = {
  heroHeight: '25vh',
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
              style={{ width: '120px' }}
              src={main_event.KeyValue[0]?.value}
            />
          </div>
          <div>
            {' '}
            <img
              style={{ width: '600px' }}
              src={main_event.KeyValue[1]?.value}
            />
          </div>
          <div>
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
          </div>
        </FlexHero>

        <Body>
          <Section>
            <Grid container spacing={3}>
              <Grid item={true} md={8} sm={12} xs={12}>
                <VideoBox
                  isStarted={true}
                  src={'https://player.vimeo.com/video/448679350'}
                />

                <Button
                  style={{ margin: '2rem auto', display: 'block' }}
                  color={'primary'}
                  variant="outlined"
                >
                  Watch on Smart TV
                </Button>
              </Grid>
              <Grid item={true} md={4} xs={12}>
                <ServerSentEvents
                  endpoint="http://localhost:4444/auction"
                  render={(data) => (
                    <div style={{ textAlign: 'center', fontSize: '2rem' }}>
                      <center>
                        <h3>{data.name}</h3>

                        <CountUp
                          formattingFn={(value) =>
                            Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                            }).format(value)
                          }
                          prefix="$ "
                          separator=","
                          duration={5}
                          start={data.currentBid - 100}
                          end={data.currentBid || 0}
                        />
                      </center>
                    </div>
                  )}
                ></ServerSentEvents>
                <p style={{ fontSize: '1.25rem', textAlign: 'center' }}>
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
          <Section showButton title="Platinum Sponsors">
            <Grid container spacing={3} justify={'center'}></Grid>
          </Section>
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
