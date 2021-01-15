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
import GivingTherm from 'components/assets/GivingTherm';

export const event_theme = {
  bg: '#2997a9',
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

  const bgImage =
    main_event.KeyValue[0].value || 'http://lorempixel.com/1920/1080/';

  useEffect(() => {
    console.log(Object.keys(window));
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
        <Meta title={event_meta.EventJobName}>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
        
          (function (f, u, n, r, a, i, s, e) {
          var data = {
            window: window,
            document: document,
            tag: 'script',
            data: 'funraise',
            orgId: f,
            uri: u,
            common: n,
            client: r,
            script: a,
          };
          var scripts;
          var funraiseScript;
          data.window[data.data] = data.window[data.data] || [];
          if (
            data.window[data.data].scriptIsLoading ||
            data.window[data.data].scriptIsLoaded
          )
            return;
          data.window[data.data].loading = true;
          data.window[data.data].push('init', data);
          scripts = data.document.getElementsByTagName(data.tag)[0];
          funraiseScript = data.document.createElement(data.tag);
          funraiseScript.async = true;
          funraiseScript.src =
            data.uri + data.common + data.script + '?orgId=' + data.orgId;
          scripts.parentNode.insertBefore(funraiseScript, scripts);
        })(
          '0d6c4935-52e1-42dd-acd3-0a41cbac2c41',
          'https://assets.funraise.io',
          '/widget/common/2.0',
          '/widget/client',
          '/inject-form.js'
        )`,
            }}
          ></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              window.funraise.push(
                'create',
                { form: 14206 },
                {
                  selector: '#fr-placed-form-container-14206',
                  type: 'grow_contained',
                }
              )
          `,
            }}
          />
        </Meta>

        <Hero
          blur={0}
          hasStarted={hasStarted}
          title={event_meta.EventJobName}
          bgImage={bgImage}
          start={main_event.eventStartEnd.StartDateTime}
        ></Hero>

        <Body>
          <Section minHeight={`100vh`}>
            <Grid container={true} spacing={3}>
              <Grid item={true} md={9} sm={12}>
                <VideoBox isStarted={hasStarted} />
                <GivingTherm />
              </Grid>
              <Grid item={true} md={3} sm={12}>
                <div
                  id="fr-placed-form-container-14206"
                  style={{ minHeight: '415px' }}
                ></div>
              </Grid>
            </Grid>
          </Section>

          <Section showButton={true} title="Speakers">
            <Grid container={true} spacing={3} justify={'center'}>
              <ListItem md={4} timeout={500} />
              <ListItem md={4} timeout={1000} />
              <ListItem md={4} timeout={2000} />
            </Grid>
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

  if (AuthRequired) {
    if (loginState.loggedIn && !verified.verified) {
      return (
        <Page theme={event_theme}>
          <LoginPage>
            <p>you are logged in but not verified for this event</p>
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
          <p>Please log in to view this event</p>
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
