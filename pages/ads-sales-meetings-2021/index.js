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

import Section from 'components/template1/Section';
import SingleEvent from 'components/BreakoutSessions/SingleEvent';
import ServerSentEvents from '../../components/RealTimeAssets/ServerSentEvents';
import NameScroller from '../../components/RealTimeAssets/NameScroller';

import Agenda from 'components/IndividualEventAssets/ads-sales-meetings-2021/Agenda';
import SingleAuctionItem from 'components/IndividualEventAssets/SingleAuctionItem';
export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  heroHeight: '450px',
  green: '#93c84e',
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
  headerBgColor: 'black',
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

  const speakers = [
    'Single Speaker',
    'Single Speaker',
    'Single Speaker',
    'Single Speaker',
    'Single Speaker',
  ];

  event_theme = {
    ...event_theme,
    header_image: main_event.HeaderImage.url,
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
          <div></div>
          <div>
            <center>
              <img
                style={{ width: '100%', maxWidth: '350px', margin: 'auto' }}
                src={main_event.KeyValue[0]?.value}
              />

              <h1 style={{ margin: 'auto' }}>2021 Sales Meeting</h1>
              <h2 style={{ margin: 'auto' }}>
                <i> April 12th at 1:00pm EST</i>
              </h2>
            </center>
          </div>
          <div>
            <center>
              <Counter
                fontSize={'1rem'}
                shadow={'0px'}
                bgColor={event_theme.green}
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
              <Grid item={true} md={8} sm={12} xs={12}>
                <Agenda />
              </Grid>
              <Grid item={true} md={4} xs={12}>
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
              <Grid item md={8} xs={12}></Grid>
              <Grid item md={4} xs={12}></Grid>
            </Grid>
          </Section>

          <BannerWithPicture
            innerWidth={`60%`}
            color={'#ffffff'}
            imgUrl={main_event.KeyValue[0]?.value}
            headerText="About The Event"
            children={`Aute minim sint irure consectetur reprehenderit deserunt voluptate. Nostrud pariatur voluptate ipsum nisi non. Est minim id minim deserunt labore quis dolor quis officia excepteur sunt sunt enim. Reprehenderit fugiat reprehenderit culpa tempor laboris ad. In ullamco eiusmod quis enim minim nostrud reprehenderit cupidatat qui consectetur et. `}
          ></BannerWithPicture>
          <Section>
            <Grid container spacing={3} justify="center">
              {speakers.map((spkr) => (
                <Grid item md={4}>
                  <CircleSpeaker>{spkr}</CircleSpeaker>
                </Grid>
              ))}
            </Grid>
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
  const { preview } = cookies(ctx);
  console.log(preview);
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  try {
    let eventData = await getEventMeta('ads-sales-meetings-2021');
    if (
      eventData.eventStatus?.EventStatus === 'Preview' &&
      preview !== 'true'
    ) {
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
