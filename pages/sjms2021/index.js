import { useEffect, useState, useContext, createContext } from 'react';
import { Router, useRouter } from 'next/router';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';

import { Grid, Button } from '@material-ui/core';
import Link, { navigate } from 'next/link';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';

import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import FlexHero from 'components/Heroes/FlexHero';
import Counter from 'components/Counters/Counter';
import Footer from 'components/template1/Footer';
import Section from 'components/template1/Section';
import DateParse from '../../components/assets/DateParse';

export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '700px',
  green: '#97d700',
  white: null,
  blue: '#0d1d5f',
  red: '#b71f39',
  gold: '#dfb88f',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 1200,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Segoe',
  headerFontColor: 'white',
  headerBgColor: 'white',
  headerOpacity: '1',
  maxSectionWidth: '1800px',
};

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'sjms2021';

const Index = (props) => {
  const session_token = EVENT_URL;

  const { event_meta, main_event } = props;

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

  useEffect(() => {
    const interval = setInterval(() => {
      setStarted(calculateIfStarted());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const MainPage = () => {
    return (
      <>
        <Page theme={event_theme}>
          <Meta title={event_meta.EventJobName}> </Meta>
          <FlexHero title={event_meta.EventJobName}>
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

                <h1 style={{ margin: 'auto', fontSize: '3rem', width: '80%' }}>
                  {main_event.EventName}
                </h1>
                <h2 style={{ margin: 'auto' }}>
                  <i>
                    <DateParse date={main_event.eventStartEnd.StartDateTime} />
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
                  counterTextColor={event_theme.gold}
                  textColor={event_theme.gold}
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
                          Live Now!
                        </h2>
                      </center>
                    </>
                  }
                  start={main_event.eventStartEnd.StartDateTime}
                  end={main_event.eventStartEnd.EndDateTime}
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
                    <VideoBox__StickyTop
                      isStarted={true}
                      src={main_event.streamLinks[0].url}
                    />
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
              buttonLink={`https://www.sjms.net/spring-gala `}
            >
              {main_event.Description && main_event.Description}
            </BannerWithPicture>
          </Body>
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
  return {
    redirect: {
      destination: './',
      permanent: false,
    },
  };
}

export default Index;
