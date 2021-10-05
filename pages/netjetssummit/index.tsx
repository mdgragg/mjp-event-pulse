import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import ThemedPage from 'components/__GLOBALS__/ThemedPage';
import Body from 'components/template1/Body';
import { Banner__WithPicture } from 'components/Banners';
import FlexHero from 'components/Heroes/FlexHero';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { toast } from 'react-toastify';
import Center from 'components/Center';
import default_theme from 'eventAssets/netjetssummit/netjetssummit.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import Splash from 'eventAssets/netjetssummit/Splash';
import EventWrap from 'eventAssets/netjetssummit/EventWrap';
import HomePage from 'eventAssets/netjetssummit/HomePage';
import { GetStaticProps } from 'next';
import { StaticResponse } from 'types/PageResponses';

export const EVENT_URL = `netjetssummit`;

const Index = (props) => {
  const { event_meta, main_event } = props;

  return (
    <EventWrap eventToCheck={main_event} metaTitle={event_meta.EventJobName}>
      {/* <Splash main_event={main_event} /> */}
      <HomePage main_event={main_event} />
     </EventWrap>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  const returnObj: StaticResponse = {
    props: {
      event_meta: event_data,
      main_event,
    },
    revalidate: 120,
  };

  return returnObj;
};

export default Index;
