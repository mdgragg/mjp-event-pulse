import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from '../../components/PageTemplates/index';

import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import VideoBox__iFrame from 'components/VideoBoxes/Video__iFrame';
import Section__WithBG from 'components/Sections/Section__WithBG';
import EmailOnlyModal from '../../components/Modals/AttendeeList__EmailOnlyModal';
import LandingPage from 'components/IndividualEventAssets/biglotstownhall/LandingPage';
import MainPage from 'components/IndividualEventAssets/biglotstownhall/MainPage';
import { toast } from 'react-toastify';
import FullWrap from 'components/FullWrap';
import useHasAuthorized from 'hooks/useHasAuthorized';
import AuthWrap from '../../components/AuthWrap';

export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '200px',
  green: '#97d700',
  white: null,
  blue: '#1e2c60',
  red: '#b71f39',
  orange: '#FF5600',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Futura Bold',
  headerFontColor: 'white',
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};

export const EVENT_URL = 'biglotstownhall';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const { event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const [auth, setAuth] = useState(false);

  return (
    <AuthWrap
      event_to_check={main_event}
      title={
        <>
          Please Sign In to Join
          <br />
          <strong> Big Lots' Q1 Town Hall</strong>
        </>
      }
      callback={(creds) => {
        toast.success(
          `Hello ${
            creds.Attendee.AttendeeFirst ? creds.Attendee.AttendeeFirst : ''
          }, welcome to Big Lots Q1 Virtual Town Hall`
        );
      }}
      options={['emailOnly']}
      render={(v) => setAuth(v)}
      signInText={
        <div
          style={{ textAlign: 'left', maxWidth: '450px', margin: '1rem 4rem' }}
        >
          <p>
            Enter your Big Lots email address in the form of your unique
            <strong> associateID@biglots.com </strong> <br />
            (ex. 1234567@biglots.com) .
          </p>
          <p>
            Contact Joey D'Amico at{' '}
            <a href="mailto:jdamico@biglots.com">jdamico@biglots.com </a> if you
            experience any technical issues.
          </p>
        </div>
      }
      headerContent={
        <div
          style={{
            backgroundColor: event_theme.orange,
            height: '80px',
            width: '80px',
            padding: '20px',
            margin: '1rem auto',
          }}
        >
          <img
            style={{ height: 'auto', width: '90%' }}
            src={main_event.LogoLink[0].Media.url}
          />
        </div>
      }
    >
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <Body>
          {main_event.AuthOptions.AuthorizationType === 'Public' ? (
            <LandingPage main_event={main_event} />
          ) : (
            <MainPage main_event={main_event} hasAuth={auth} />
          )}
        </Body>
      </Page>
    </AuthWrap>
  );
};

export async function getStaticProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
    },
    revalidate: 3000,
  };
}

export default Index;
