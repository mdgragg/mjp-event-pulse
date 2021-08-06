import { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import { toast } from 'react-toastify';
import AuthWrap from '../../components/AuthWrap';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';

import { useRouter } from 'next/router';
import { AppContext } from 'context/AppContext';
import { event_theme, MainPage } from '../../eventAssets/tofresearchseries2021';
export const EVENT_URL = 'tofresearchseries2021';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const router = useRouter();
  const { event_meta, main_event } = props;

  let theme = {
    ...event_theme,
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
      eventToCheck={main_event}
      successCallback={(creds) => {
        toast.success(
          `Hello ${
            creds.Attendee.AttendeeFirst ? creds.Attendee.AttendeeFirst : ''
          }, welcome to ${main_event.EventName}`
        );
      }}
    >
      <Page theme={theme}>
        <Meta title={main_event.EventName}> </Meta>
        <Body>
          <MainPage main_event={main_event} />
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
