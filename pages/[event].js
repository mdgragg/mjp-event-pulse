import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import withApollo from 'lib/withApollo';
import { UserContext } from 'lib/context/UserContext';
import _ from 'lodash';
import { getEventMeta, getMainEventMeta } from 'lib/api';

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

export var event_theme = {
  heroHeight: null,
  fontFamily: null,
  headerOpacity: null,
  white: null,
  blue: null,
  red: null,
  buttonColor: null,
  headerFont: null,
  headerBgColor: null,
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
    bgImage:
      main_event.KeyValue[0]?.value || 'https://lorempixel.com/1920/1080/',
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

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
      <Header theme={event_theme}>
        <Navbar info={main_event} />
      </Header>

      <Hero
        hasStarted={hasStarted}
        title={event_meta.EventJobName}
        bgImage="http://lorempixel.com/1500/500/"
        start={main_event.eventStartEnd.StartDateTime}
      ></Hero>

      <Body>
        <Section>
          <Grid container={true} spacing={3}>
            <Grid item={true} md={9} sm={12}>
              <VideoBox isStarted={hasStarted} />
            </Grid>
            <Grid item={true} md={3} sm={12}>
              <Sidebar theme={event_theme} />
            </Grid>
          </Grid>
        </Section>

        <Banner color="#181818"></Banner>
        <Section showButton={true} title="Speakers">
          <Grid container={true} spacing={3} justify={'center'}>
            <ListItem md={4} timeout={500} />
            <ListItem md={4} timeout={1000} />
            <ListItem md={4} timeout={2000} />
          </Grid>
        </Section>
        <Section showButton={true} title="Platinum Sponsors">
          <Grid container={true} spacing={3} justify={'center'}></Grid>
        </Section>
        <Section showButton={true} title="Gold Sponsors">
          <Grid container={true} spacing={3} justify={'center'}>
            <Grid item={true} md={4}>
              <img src="http://lorempixel.com/350/250/"></img>
            </Grid>

            <Grid item={true} md={4}>
              <img src="http://lorempixel.com/350/240/"></img>
            </Grid>

            <Grid item={true} md={4}>
              <img src="http://lorempixel.com/350/220/"></img>
            </Grid>
          </Grid>
        </Section>
        <Section
          showButton={false}
          title={`${event_meta.EventJobName} in the News`}
        >
          <Grid container={true} spacing={3} justify={'center'}>
            <ListItemSmall />
            <ListItemSmall />
          </Grid>
        </Section>

        <EventSearch
          currenthref={event_meta.eventUrl}
          events={event_meta.events}
        />

        <Section></Section>
      </Body>
      <Footer>
        <div></div>
        <div className="signoff">
          <center>Copyright 2020 Mill James</center>
        </div>
        <div></div>
      </Footer>
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.

  //get the event job data from our api
  let url = ctx.req.url.slice(1);

  //make sure it is lowercase
  if (url !== url.toLowerCase()) {
    return {
      redirect: {
        destination: `${url.toLowerCase()}`,
      },
    };
  }
  console.log(url);

  try {
    let eventData = await getEventMeta(url);
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
