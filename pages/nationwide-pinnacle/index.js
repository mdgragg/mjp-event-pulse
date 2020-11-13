import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import withApollo from 'lib/withApollo';
import { UserContext } from 'lib/context/UserContext';
import _ from 'lodash';
import { getEventMeta, getEventByUrl } from '../../lib/api';
import { Grid, Button } from '@material-ui/core';
import LoginBox from 'components/globals/Login';
import Admin from './components/admin';
import Meta from 'components/globals/Meta';
import Page from '../../components/template1/Page';
import Header from '../../components/template1/Header';
import Navbar from '../../components/template1/Navbar';
import Body from '../../components/template1/Body';
import VideoBox from '../../components/template1/VideoBox';
import Sidebar from '../../components/template1/Sidebar';
import Banner from '../../components/template1/Banner';
import Hero from '../../components/template1/Hero';
import Footer from '../../components/template1/Footer';
import { login, verify } from 'lib/fetchCalls/login';
import ListItem from '../../components/template1/ListItem';
import Section from '../../components/template1/Section';
import ListItemSmall from '../../components/template1/ListItemSmall';
import EventSearch from '../../components/template1/EventSearch';
import cookies from 'next-cookies';

export const event_theme = {
  // bg: '#BADA55'
  fontFamily: 'Roboto',
};

const Template1 = (props) => {
  const { loginState, verify_main_event } = useContext(UserContext);

  const { username, email, token } = props.creds;

  const { error, loading, data } = useQuery(gql`
    query {
      eventJobs {
        eventUrl
      }
    }
  `);

  const router = useRouter();
  const [hasStarted, setStarted] = useState(false);

  const [sidbarState, toggleSidebar] = useState(null);

  let event_meta = props.meta;
  const { AuthRequired } = props.meta;

  useEffect(() => {
    let now = Date.now();

    let dateStart =
      Date.parse(event_meta.eventJobStartEnd.StartDateTime) - 18000000;

    if (dateStart < now) {
      setStarted(true);
    }
  }, []);

  // useEffect(() => {
  //   if (AuthRequired) {
  //     verify_main_event(props.meta);
  //   }
  // }, [loginState.creds]);

  const MainPage = () => {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <Header theme={event_theme}>
          <Navbar info={event_meta} />
        </Header>
        <Hero
          hasStarted={hasStarted}
          title={event_meta.EventJobName}
          bgImage="http://lorempixel.com/1500/500/"
          start={event_meta.events.filter((event) => event.isMainEvent == true)}
        />
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

        <h3>path: {router.pathname} </h3>
        <LoginBox />
        <ul>
          {_.keys(event_meta.events).map((event, key) => {
            const info = event_meta.events[event];
            return (
              <li key={`li--${key}`}>
                <Link key={info.id} href={`${router.pathname}/${info.slug}`}>
                  {info.EventName}
                </Link>
              </li>
            );
          })}
        </ul>
      </Page>
    );
  };

  if (AuthRequired) {
    if (loginState.loggedIn) {
      return <MainPage />;
    } else {
      return (
        <Page theme={event_theme}>
          <h1> Yed</h1>
          <LoginBox />
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
  const { creds } = cookies(ctx) || {};

  //get the event job data from our api
  let url = ctx.req.url.slice(1);

  const eventData = await getEventMeta(url);
  //this is what will load as the "context" if we haven't come here through
  //our preview link

  //set the context object to whatever our api is saying

  const values = {
    props: {
      //meta will be the props for the event
      meta: eventData,
      creds: 'testing from page',
      loginData: 'testing form page',
    },
  };
  return values;
}

export default withApollo(Template1);
