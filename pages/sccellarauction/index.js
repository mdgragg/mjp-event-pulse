import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';

import Link from 'next/link';

import _ from 'lodash';
import { getEventMeta, getEventMetaMain, getMainEventMeta } from 'lib/api';
import { Grid, Button } from '@material-ui/core';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import HeroWithImage from 'components/Heroes/HeroWithImage';
import Footer from 'components/template1/Footer';
import Section from 'components/template1/Section';
import LoginPage from 'components/globals/Login/LoginPage';
import SingleEvent from 'components/BreakoutSessions/SingleEvent';

export var event_theme = {
  // bg: '#BADA55'
  heroHeight: '45vh',
  fontFamily: 'Roboto',
  headerOpacity: 0,
  white: 'white',
  blue: '#14204a',
  red: 'red',
  buttonColor: '#1f3c74',
  headerFont: 'Akzidenz-Grotesque-Bold',
  headerBgColor: 'red',
};

const Index = (props) => {
  const router = useRouter();

  const {
    event_meta,
    main_event,
    event_meta: { AuthRequired },
    main_event: { BreakoutSessions },
  } = props;

  //add to the theme based on values here,
  //this might be replaced in the future with a
  //site builder thing
  event_theme = {
    ...event_theme,
    bgImage: main_event.KeyValue[0].value || 'https://placehold.co/1920x1080',
  };

  const [verified, setVerified] = useState({ verified: false });

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
    const timeout = setInterval(() => {
      setStarted(calculateIfStarted());
    }, 1000);

    return () => clearInterval(timeout);
  }, []);

  const MainPage = () => {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>

        <HeroWithImage
          hasStarted={hasStarted}
          title={event_meta.EventJobName}
          start={main_event.eventStartEnd.StartDateTime}
          imgSrc={main_event.KeyValue[1].value}
        ></HeroWithImage>

        <Body>
          <Section>
            <Grid container spacing={3} justify={'center'}>
              {BreakoutSessions[1].map((session) => (
                <Grid item key={session.id}>
                  <SingleEvent session={session} />
                </Grid>
              ))}
            </Grid>
          </Section>
          <Section>
            <Grid container spacing={3} justify={'center'}>
              {BreakoutSessions[2].map((session) => (
                <Grid item key={session.id}>
                  <SingleEvent session={session} />
                </Grid>
              ))}
            </Grid>
          </Section>

          {BreakoutSessions[3] && (
            <Section>
              <Grid container spacing={3} justify={'center'}>
                {BreakoutSessions[3]?.map((session) => (
                  <Grid item key={session.id}>
                    <SingleEvent session={session} />
                  </Grid>
                ))}
              </Grid>
            </Section>
          )}
          <BannerWithPicture
            secondary={event_theme.blue}
            color={event_theme.white}
            headerText={'The 29th Annual Cellar Auction - A Red Cross Affair'}
            imgUrl={`https://storage.googleapis.com/mjp-stream-public/sccellarauction/rfe-logo.png`}
          >
            <div style={{ maxWidth: '500px', margin: 'auto' }}>
              <center>
                <p>March 6, 2021 - 6:30 pm</p>
                <p>Sponsor & VIP Resource Page</p>
                <p>Made Possible By:</p>
              </center>
            </div>
          </BannerWithPicture>
        </Body>
      </Page>
    );
  };

  if (AuthRequired) {
    return (
      <Page theme={event_theme}>
        <LoginPage>
          <p>Auth Required</p>
          <Link href="/me"> My Account</Link>
        </LoginPage>
      </Page>
    );
  } else {
    return <MainPage />;
  }
};

export async function getStaticProps() {
  //console.log(ctx.req.cookies);
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  try {
    let eventData = await getEventMeta('sccellarauction');

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
