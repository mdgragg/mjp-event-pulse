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
              style={{ width: '120px' }}
              src={main_event.KeyValue[0]?.value}
            />
          </div>
          <div>
            {' '}
            <img
              style={{ width: '600px' }}
              src={main_event.KeyValue[1]?.value}
            />
          </div>
          <div>
            <center>
              <h2
                style={{
                  fontWeight: '800',
                  fontSize: '2rem',
                  color: event_theme.red,
                  margin: 'auto auto 0 auto',
                }}
              >
                STARTS IN
              </h2>
              <Counter
                fontSize={'1rem'}
                shadow={'0px'}
                bgColor={event_theme.blue}
                hasStarted={hasStarted}
                start={main_event.eventStartEnd.StartDateTime}
              />
            </center>
          </div>
        </FlexHero>

        <Body></Body>
        <center>
          <Link href="./preview">
            <p style={{ cursor: 'pointer', fontWeight: '800' }}>Log In</p>
          </Link>
        </center>
        <Footer></Footer>
      </Page>
    );
  };

  return <MainPage />;
};

export async function getServerSideProps(ctx) {
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
