import { useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';

import LandingPage from '../../eventAssets/biglots/LandingPage';
import { EVENT_URL } from './index';

import default_theme from 'eventAssets/biglots/theme.theme';

const Index = ({ event_meta, main_event }) => {
  const router = useRouter();
  useEffect(() => {
    if (event_meta.eventStatus.EventStatus !== 'Ended') {
      router.push(`/${EVENT_URL}`);
    }
  }, []);

  return (
    <Page theme={default_theme}>
      <Meta title={main_event.EventName}> </Meta>
      <Body>
        <LandingPage main_event={main_event} />
      </Body>
    </Page>
  );
};

export async function getStaticProps(ctx) {
  let eventData = await getEventMeta(EVENT_URL);
  let main_event = eventData.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: eventData,
      main_event,
    },
    revalidate: 500,
  };
}

export default Index;
