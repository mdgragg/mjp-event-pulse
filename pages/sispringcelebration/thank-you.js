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
import FlexHero from 'components/Heroes/FlexHero';
import Counter from 'components/Counters/Counter';
import Footer from 'components/template1/Footer';
import ListItem from 'components/template1/ListItem';
import Section from 'components/template1/Section';
import SingleEvent from 'components/BreakoutSessions/SingleEvent';

export var event_theme = {
  heroHeight: '25vh',
  bg: 'white',
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

  const MainPage = () => {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <FlexHero hasStarted={hasStarted} title={event_meta.EventJobName}>
          <div>
            <img
              style={{ width: '100%', maxWidth: '100px' }}
              src={main_event.KeyValue[0]?.value}
            />
          </div>
          <div>
            {' '}
            <img
              style={{ width: '100%', maxWidth: '500px' }}
              src={main_event.KeyValue[1]?.value}
            />
          </div>
          <div>
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
                Thank You!
              </h2>
            </center>
          </div>
        </FlexHero>
        <Body>
          <div
            style={{
              backgroundColor: event_theme.blue,
              padding: '1rem 0',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: `white`, fontSize: '2rem' }}>
              Thank You for Joining the
              <br /> SI Fathers’ Club Spring Celebration & Auction{' '}
            </h2>
            <h3 style={{ color: 'white' }}>
              {' '}
              Please “raise your paddle” to support:
            </h3>
          </div>

          <Section>
            <center>
              <div
                style={{
                  padding: '2rem',
                  backgroundColor: 'white',
                  display: 'inline-block',
                  margin: '1rem',
                }}
              >
                <img
                  style={{ margin: '2rem auto' }}
                  src="https://storage.googleapis.com/mjp-stream-public/st.-ignatius-annual-fundraiser/image001.png"
                  alt="CATS"
                />
              </div>
            </center>
            <div style={{ maxWidth: '800px', margin: 'auto' }}>
              <p style={{ fontSize: '1.5rem' }}>
                The <strong>Fund-A-Need</strong> proceeds will go to expanding
                our current Learning Center to maximize the academic resources
                for all SI students by increasing the physical space. <br />
                <br />
                <strong>
                  The new expanded space will be called "CATS" - the Center for
                  Academics and Targeted Support
                </strong>{' '}
                and will be open to the entire SI community. The Learning
                Specialists at St. Ignatius will work collaboratively with
                faculty members so that the students are best able to access
                curriculum and instruction. The construction work on this
                exciting new space will be done over the summer so that "CATS",
                the new learning center will be ready at the start of the school
                year. Your donation to the Fund-A-Need will have a direct impact
                on the daily lives of all the SI students. To donate to the
                Fund-a-Need,{' '}
                <a href="https://one.bidpal.net/siauction21/search/donation">
                  {' '}
                  click here.{' '}
                </a>
              </p>
            </div>
          </Section>
        </Body>
        <Footer></Footer>
      </Page>
    );
  };

  return <MainPage />;
};

export async function getStaticProps(ctx) {
  //console.log(ctx.req.cookies);
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  try {
    let eventData = await getEventMeta('sispringcelebration');

    let main_event = eventData.events.filter(
      (ev) => ev.isMainEvent === true
    )[0];

    //make breakout sessions array by category

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
