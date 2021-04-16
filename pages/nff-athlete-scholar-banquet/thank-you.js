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
          <FlexHero title={event_meta.EventJobName}>
            <div></div>
            <div>
              <center>
                <img
                  style={{ width: '100%', maxWidth: '350px', margin: 'auto' }}
                  src={main_event.KeyValue[0]?.value}
                />

                <h2
                  style={{
                    margin: 'auto',
                    backgroundColor: event_theme.green,
                    padding: '10px',
                    width: 'max-content',
                  }}
                >
                  {' '}
                  Thank You For Attending our
                  <br /> 2021 Sales Meeting
                </h2>
                <h2 style={{ margin: '2rem auto' }}>
                  <i> April 12th at 1:00pm EST</i>
                </h2>
              </center>
            </div>
            <div></div>
          </FlexHero>

          <Body>
            <Section>
              <Grid container spacing={3}>
                <Grid item={true} md={8} sm={12} xs={12}>
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <VideoBox__StickyTop src={main_event.streamLinks[0].url} />
                  </div>
                </Grid>
                <Grid item={true} md={4} xs={12}>
                  <Agenda />
                  <a href="#bidpal-help">
                    {/* <Button
                    style={{ margin: '2rem auto', display: 'block' }}
                    color={'primary'}
                    variant="outlined"
                  >
                    Help
                  </Button> */}
                  </a>
                </Grid>
                <Grid item md={8} xs={12}></Grid>
                <Grid item md={4} xs={12}></Grid>
              </Grid>
            </Section>

            <Section headerText="Speakers">
              <Grid container spacing={3} justify="center">
                {speakers &&
                  speakers.map((spkr, index) => (
                    <Grid item md={3} key={`speaker-map--${spkr.id}`}>
                      <CircleSpeaker
                        imgSrc={spkr.Thumbnail[0].url}
                        timeout={1000 * index}
                      >
                        <h4>
                          {spkr.FirstName} {spkr.LastName}
                        </h4>
                        <p>{spkr.Description}</p>
                      </CircleSpeaker>
                    </Grid>
                  ))}
              </Grid>
            </Section>
            <Section>
              <Grid container spacing={3}>
                <Grid item={true} md={8} sm={12} xs={12}></Grid>
                <Grid item={true} md={4} xs={12}></Grid>
                <Grid item md={8} xs={12}></Grid>
                <Grid item md={4} xs={12}></Grid>
              </Grid>
            </Section>
          </Body>
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

export async function getStaticProps(ctx) {
  //console.log(ctx.req.cookies);

  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  return {
    redirect: {
      destination: '/',
    },
  };
}

export default ThankYou;
