import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import withApollo from 'lib/withApollo';
import { UserContext } from 'lib/context/UserContext';
import _ from 'lodash';
import { getEventMeta, getEventMetaMain, getMainEventMeta } from 'lib/api';
import base from 'lib/firebase/base';
import { fireBaseApp as fb } from 'lib/firebase/base';

import { Grid, Button } from '@material-ui/core';
import LoginBox from 'components/globals/Login';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Hero from 'components/Heroes/Hero';
import Navbar from 'components/template1/Navbar';
import Body from 'components/template1/Body';
import CABLE from 'components/IndividualEventAssets/osu-cable-policy-roundtable';
import Footer from 'components/template1/Footer';
import ListItem from 'components/template1/ListItem';
import Section from 'components/template1/Section';
import ListItemSmall from 'components/template1/ListItemSmall';
import EventSearch from 'components/template1/EventSearch';
import cookies from 'next-cookies';
import LoginPage from 'components/globals/Login/LoginPage';
import PublicChat from '../../components/Chat/PublicChat';

const event_job_slug = '2021-jfcs-faces-of-inspiration';

export var event_theme = {
  heroHeight: '550px',
  videoBreakPoint: null,
  maxSectionWidth: null,
  fontFamily: 'Avenir',
  headerOpacity: null,
  white: null,
  green: '#4F854A',
  blue: '#005198',
  lightBlue: '#60A4D8',
  red: null,
  buttonColor: null,
  headerFont: null,
  headerBgColor: null,
};

const Index = (props) => {
  const router = useRouter();
  // const { error, loading, data } = useQuery(getMainEventMeta(50));
  const { speakers, event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    bgImage: main_event.KeyValue[0]?.value || 'https://placehold.co/1920x860',
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

  const calculateIfEnded = () => {
    let now = new Date();
    const parsed_event_end = Date.parse(main_event.eventStartEnd.EndDateTime);

    let calc_time = parsed_event_end - now;

    if (calc_time <= 0) {
      return true;
    }
    return false;
  };

  const [hasStarted, setStarted] = useState(calculateIfStarted());
  const [hasEnded, setEnded] = useState(calculateIfEnded());

  useEffect(() => {
    const interval = setInterval(() => {
      setStarted(calculateIfStarted());
      setEnded(calculateIfEnded());
      if (calculateIfEnded() && !hasEnded) {
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const MainPage = () => {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>

        <Hero
          blur={0}
          hasStarted={hasStarted}
          title={main_event.EventName}
          start={main_event.eventStartEnd.StartDateTime}
        ></Hero>
        <Body>
          <Section>
            <div style={{ height: '800px' }}>
              <PublicChat />
            </div>
          </Section>
        </Body>
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
    let eventData = await getEventMeta(event_job_slug);
    let main_event = eventData.events[0];
    let speakers = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + '/events/56'
    ).then((res) => res.json());

    speakers = speakers.EventSpeakers;

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
        speakers,
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
