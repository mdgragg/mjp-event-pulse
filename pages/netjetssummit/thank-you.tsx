import { FullPage__SolidColor } from 'components/BodyTemplates';
import Page from 'components/PageTemplates';
import React from 'react';
import { useRouter } from 'next/router';
import { default_theme as theme } from 'components/Themes/default.theme';
import { FlexHero } from 'components/Heroes';
import { Box__XYCentered } from 'components/Boxes';
import Center from 'components/Center';
import { Counter__JustNumbers } from 'components/Counters';
import { getEventMeta } from 'lib/api';
import { EVENT_URL } from './index';
import Splash from 'eventAssets/netjetssummit/Splash';
import EventWrap from 'eventAssets/netjetssummit/EventWrap';
const ThankYou = ({ event_meta, main_event }) => {
  return (
    <EventWrap eventToCheck={main_event} metaTitle={'This event has ended'}>
      <Splash main_event={main_event} />
    </EventWrap>
  );
};

export async function getServerSideProps(ctx) {
  try {
    let event_data = await getEventMeta(EVENT_URL);

    let main_event = event_data.events.filter(
      (ev) => ev.isMainEvent === true
    )[0];

    return {
      props: {
        main_event,
        event_data,
      },
    };
  } catch (error) {
    console.log('[event].js error: ', error);
    return {
      redirect: {
        destination: '/404',
      },
    };
  }
}

export default ThankYou;
