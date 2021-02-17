import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import withApollo from 'lib/withApollo';
import { UserContext } from 'lib/context/UserContext';
import _ from 'lodash';
import { getEventMeta, getEventMetaMain, getMainEventMeta } from 'lib/api';

import { Grid, Button } from '@material-ui/core';
import LoginBox from 'components/globals/Login';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Header from 'components/template1/Header';
import Navbar from 'components/template1/Navbar';
import Body from 'components/template1/Body';
import VideoBox from 'components/template1/VideoBox';
import Sidebar from 'components/template1/Sidebar';
import Banner from 'components/template1/Banner';
import Hero from 'components/template1/Hero';
import Footer from 'components/template1/Footer';
import ListItem from 'components/template1/ListItem';
import Section from 'components/template1/Section';
import ListItemSmall from 'components/template1/ListItemSmall';
import EventSearch from 'components/template1/EventSearch';
import cookies from 'next-cookies';
import LoginPage from 'components/globals/Login/LoginPage';
import SingleEvent from 'components/sccellarauction/SingleEvent';

export const event_theme = {
  // bg: '#BADA55'
  heroHeight: '30vh',
  fontFamily: 'Roboto',
  headerOpacity: 9,
  white: 'white',
  blue: '#14204a',
  red: 'red',
  buttonColor: '#1f3c74',
};

const Index = (props) => {
  const {
    event_meta,
    main_event,
    event_meta: { AuthRequired },
  } = props;

  const router = useRouter();

  const [hasStarted, setStarted] = useState(false);
  const [verified, setVerified] = useState({ verified: false });

  const calculateIfStarted = () => {
    let now = Date.now();
    const parsed_event_start = Date.parse(
      main_event.eventStartEnd.StartDateTime
    );

    let bool = now >= main_event.eventStartEnd.StartDateTime;

    return bool;
  };

  const bgImage =
    main_event.KeyValue[0].value || 'http://lorempixel.com/1920/1080/';

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

        <Hero
          hasStarted={hasStarted}
          title={event_meta.EventJobName}
          bgImage={bgImage}
          start={main_event.eventStartEnd.StartDateTime}
        ></Hero>

        <Body>
          <Section title="Nominees Watch Party Rooms">
            <Grid container spacing={3} justify={'center'}>
              <Grid item spacing={3}>
                <SingleEvent />
              </Grid>
              <Grid item spacing={3}>
                <SingleEvent />
              </Grid>
              <Grid item spacing={3}>
                <SingleEvent />
              </Grid>
            </Grid>
          </Section>
          <Section title="School Watch Party Rooms">
            <Grid container spacing={3} justify={'center'}>
              <Grid item spacing={3}>
                <SingleEvent />
              </Grid>
              <Grid item spacing={3}>
                <SingleEvent />
              </Grid>
              <Grid item spacing={3}>
                <SingleEvent />
              </Grid>
            </Grid>
          </Section>

          <Banner
            secondary={event_theme.white}
            color={event_theme.blue}
            headerText={'Need help?'}
          >
            <p style={{ maxWidth: '500px' }}>
              {' '}
              Please contact us if you are having trouble accessing the site:{' '}
              <a style={{ color: 'white' }} href="">
                help@help.com needs updated
              </a>{' '}
              or scroll below to see the help rooms.
            </p>
          </Banner>
          <Section title="Help & Additional Rooms">
            <Grid container spacing={3} justify={'center'}>
              <Grid item md={4}>
                <SingleEvent />
              </Grid>
              <Grid item md={4}>
                <SingleEvent />
              </Grid>
              <Grid item md={4}>
                <SingleEvent />
              </Grid>
            </Grid>
          </Section>
          <Section showButton title="Sponsors">
            <Grid container spacing={3} justify={'center'}>
              <ListItem md={4} timeout={500} />
              <ListItem md={4} timeout={1000} />
              <ListItem md={4} timeout={2000} />
            </Grid>
          </Section>

          <Section>
            <EventSearch
              currenthref={event_meta.eventUrl}
              events={event_meta.events}
            />
          </Section>
        </Body>
        <Footer>
          <div></div>

          <div></div>
        </Footer>
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

export async function getServerSideProps(ctx) {
  //console.log(ctx.req.cookies);
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  try {
    let eventData = await getEventMeta('sccellarauction');
    const values = {
      props: {
        //meta will be the props for the event
        event_meta: eventData,
        main_event: eventData.events.filter((ev) => ev.isMainEvent === true)[0],
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
