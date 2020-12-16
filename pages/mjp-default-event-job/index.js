import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import withApollo from 'lib/withApollo';
import { UserContext } from 'lib/context/UserContext';
import _ from 'lodash';
import { getEventMeta, getEventMetaMain, getMainEventMeta } from 'lib/api';
import { GET_MAIN_EVENT_META } from 'lib/gql-query';
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
export const event_theme = {
  // bg: '#BADA55'
  fontFamily: 'Roboto',
};

const Template1 = (props) => {
  const { loginState, verify_main_event } = useContext(UserContext);

  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [hasStarted, setStarted] = useState(false);
  const [verified, setVerified] = useState({ verified: false });

  let event_meta = props.meta;
  const main_event = props.meta.events[0];
  const { AuthRequired } = props.meta;

  useEffect(() => {
    let now = Date.now();

    let dateStart = main_event.eventStartEnd.StartDateTime;

    if (dateStart < now) {
      setStarted(false);
    }
  }, []);

  useEffect(() => {
    if (AuthRequired) {
      verify_main_event(props.meta).then((result) => {
        setVerified({ verified: result });
      });
    }
  }, [loginState.loggedIn]);

  const MainPage = () => {
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

        <LoginBox />
      </Page>
    );
  };

  if (AuthRequired) {
    if (loginState.loggedIn && !verified.verified) {
      return (
        <Page theme={event_theme}>
          <LoginPage>
            <h1>you are logged in but not verified for this event</h1>
            <Link href="/me"> My Account</Link>
          </LoginPage>
        </Page>
      );
    }
    if (verified && loginState.loggedIn) {
      return <MainPage />;
    } else {
      return (
        <Page theme={event_theme}>
          <LoginPage />
        </Page>
      );
    }
  } else {
    return <MainPage />;
  }
};

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.

  //get the event job data from our api
  let url = ctx.req.url.slice(1);

  let eventData = await getEventMeta(url);

  if (!eventData) {
    eventData = {};
  }

  //this is what will load as the "context" if we haven't come here through
  //our preview link

  //set the context object to whatever our api is saying

  const values = {
    props: {
      //meta will be the props for the event
      meta: eventData,
      mainEvent: eventData.events.filter((ev) => ev.isMainEvent === true)[0],
    },
  };
  return values;
}

export default withApollo(Template1);
