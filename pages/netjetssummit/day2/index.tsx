import { getEventMeta } from 'lib/api';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import ThemedPage from 'components/__GLOBALS__/ThemedPage';
import { toast } from 'react-toastify';
import default_theme from 'eventAssets/netjetssummit/netjetssummit.theme';
import Splash from 'eventAssets/netjetssummit/Splash';
import { GetStaticPaths, GetStaticProps } from 'next';
import { StaticResponse } from 'types/PageResponses';
import { EVENT_URL } from '../index';
import SingleDay from 'eventAssets/netjetssummit/SingleDay';
import { useRouter } from 'next/router';
import Link from 'next/link';
import EventWrap from 'eventAssets/netjetssummit/EventWrap';

const Day1 = (props) => {
  const router = useRouter();
  const { event_meta, main_event, sub_event } = props;

  return (
    <EventWrap eventToCheck={main_event} metaTitle={event_meta.EventName}>
      <Splash main_event={main_event}>
        <SingleDay day={sub_event} dayQuery={`day2`} title={`Day 2`} />
      </Splash>
    </EventWrap>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];
  let sub_event = event_data.events.filter((ev) => ev.id === '172')[0];

  const returnObj: StaticResponse = {
    props: {
      event_meta: event_data,
      main_event,
      sub_event,
    },
    revalidate: 300,
  };

  return returnObj;
};

export default Day1;
