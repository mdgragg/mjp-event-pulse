import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import LandingPage from 'eventAssets/biglotstownhall/LandingPage';
import MainPage from 'eventAssets/biglotstownhall/MainPage';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';

import { toast } from 'react-toastify';
import AuthWrap from 'components/AuthWrap';
import event_theme from 'eventAssets/biglots/theme.theme';

export const EVENT_URL = 'biglotstownhall';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const { event_meta, main_event } = props;

  var theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  return (
    <Page theme={theme}>
      <AuthWrap
        eventToCheck={main_event}
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
        signInText={
          <div
            style={{
              textAlign: 'left',
              maxWidth: '450px',
              margin: '1rem 4rem',
            }}
          >
            <p>
              Enter your Big Lots email address in the form of your unique
              <strong> associateID@biglots.com </strong> <br />
              (ex. 1234567@biglots.com) .
            </p>
            <p>
              Contact Joey D'Amico at{' '}
              <a href="mailto:jdamico@biglots.com">jdamico@biglots.com </a> if
              you experience any technical issues.
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
        <Meta title={event_meta.EventJobName}> </Meta>
        <Body>
          <MainPage main_event={main_event} />
          {/* <LandingPage main_event={main_event} /> */}
        </Body>
      </AuthWrap>
    </Page>
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
    revalidate: 300,
  };
}

export default Index;
