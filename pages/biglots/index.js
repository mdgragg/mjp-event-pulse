import { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import { toast } from 'react-toastify';
import AuthWrap from '../../components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import LandingPage from 'eventAssets/biglots/LandingPage';
import MainPage from 'eventAssets/biglots/MainPage';
import { useRouter } from 'next/router';
import { AppContext } from 'context/AppContext';
import default_theme from 'eventAssets/biglots/theme.theme';

export const EVENT_URL = 'biglots';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const router = useRouter();
  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const {
    state: { hasAuth },
  } = useContext(AppContext);

  useEffect(() => {
    if (event_meta.eventStatus.EventStatus === 'Ended') {
      router.push(`${EVENT_URL}/thank-you`);
    }
  }, []);

  return (
    <AuthWrap
      otherFields={{
        Company: {
          displayName: 'Company',
          value: '',
          required: true,
        },
      }}
      eventToCheck={main_event}
      title={
        <>
          <div
            style={{
              backgroundColor: event_theme.colors.orange,
              height: '90px',
              width: '90px',
              padding: '5px',
              margin: '1rem auto',
            }}
          >
            <img
              style={{ height: 'auto', width: '90%' }}
              src={main_event.LogoLink[0].Media.url}
            />
          </div>
          Please Sign In to Join
          <br />
          <strong> {main_event.EventName}</strong>
        </>
      }
      successCallback={(creds) => {
        toast.success(
          `Hello ${
            creds.Attendee.AttendeeFirst ? creds.Attendee.AttendeeFirst : ''
          }, welcome to ${main_event.EventName}`
        );
      }}
      signInText={
        <div
          style={{ textAlign: 'left', maxWidth: '450px', margin: '1rem 4rem' }}
        >
          <p>Please sign in with your information to access the event.</p>
          <p>
            Contact Joey D'Amico at{' '}
            <a href="mailto:jdamico@biglots.com">jdamico@biglots.com </a> if you
            experience any technical issues.
          </p>
        </div>
      }
    >
      <Page theme={event_theme}>
        <Meta title={main_event.EventName}> </Meta>
        <Body>
          <MainPage main_event={main_event} hasAuth={hasAuth} />
        </Body>
      </Page>
    </AuthWrap>
  );
};

export async function getServerSideProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];
  let theme = {};
  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
      theme,
    },
  };
}

export default Index;
