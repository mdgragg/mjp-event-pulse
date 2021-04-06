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
  heroHeight: '350px',
  green: '93c84e',
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

        <FlexHero hasStarted={hasStarted} title={event_meta.EventJobName}>
          <div>
            <center>
              <h2 style={{ color: '#181818', margin: 'auto' }}>
                2021 Sales Meetings
              </h2>
            </center>
          </div>
          <div>
            {' '}
            <img
              style={{ width: '100%', maxWidth: '500px' }}
              src={main_event.KeyValue[0]?.value}
            />
            <center>
              <h2 style={{ color: '#181818', margin: 'auto' }}>
                April 12th at 1pm
              </h2>
            </center>
          </div>
          <div>
            <center>
              <Counter
                fontSize={'1rem'}
                shadow={'0px'}
                bgColor={'#181818'}
                textColor={'#93c84e'}
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
                <VideoBox__StickyTop
                  isStarted={true}
                  src={
                    main_event.streamLinks.find((link) => link.isMain === true)
                      .url
                  }
                />
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
                ></div>
                <p
                  style={{
                    fontSize: '1.25rem',
                    textAlign: 'center',
                    maxWidth: '80%',
                    margin: '1rem auto 0 auto',
                  }}
                >
                  For more information please contact our helpdesk.
                </p>
                <a href="#bidpal-help">
                  <Button
                    style={{ margin: '2rem auto', display: 'block' }}
                    color={'primary'}
                    variant="outlined"
                  >
                    Help
                  </Button>
                </a>
              </Grid>
              <Grid item={true} md={8} xs={12}></Grid>
              <Grid item={true} md={4} xs={12}></Grid>
            </Grid>
          </Section>

          <BannerWithPicture color={'#181818'}></BannerWithPicture>
        </Body>
        <Footer></Footer>
      </Page>
    );
  };

  return <MainPage />;
};

export async function getServerSideProps(ctx) {
  //console.log(ctx.req.cookies);
  const { preview } = cookies(ctx);
  console.log(preview);
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  try {
    let eventData = await getEventMeta('ads-sales-meetings-2021');

    if (eventData.eventStatus.EventStatus === 'Preview' && preview !== 'true') {
      return {
        redirect: {
          destination: 'ads-sales-meetings-2021/preview',
        },
      };
    }
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
