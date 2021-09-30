import { getBreakoutSessions, getEventMeta } from 'lib/api';
import default_theme from 'eventAssets/netjetssummit/netjetssummit.theme';
import Splash from 'eventAssets/netjetssummit/Splash';
import { GetStaticPaths, GetStaticProps } from 'next';
import { StaticResponse } from 'types/PageResponses';
import { EVENT_URL } from '../index';
import { useRouter } from 'next/router';
import BreakoutPage from 'eventAssets/netjetssummit/BreakoutPage';
import EventWrap from 'eventAssets/netjetssummit/EventWrap';
const PLACEHOLD = 'https://placehold.co/';

const Breakout = (props) => {
  const router = useRouter();
  const { event_meta, main_event, sub_event, breakout } = props;

  const chatLink = breakout.KeyValue.filter((k) => k.key === 'Chat')[0];

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  return (
    <EventWrap eventToCheck={main_event} metaTitle={event_meta.EventName}>
      <Splash main_event={main_event} noHeader>
        <BreakoutPage
          name={breakout.Name}
          time={breakout.DateTime}
          video={breakout.Link.url}
          chat={chatLink.value}
          attachment={breakout.Attachments[0]?.Attachments[0]?.Media?.url}
        />
      </Splash>
    </EventWrap>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const breakouts = await getBreakoutSessions(171);

  return {
    paths: breakouts.map((breakout) => ({
      params: { breakout: breakout.id },
    })),
    fallback: false, // See the "fallback" section below
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const event_data = await getEventMeta(EVENT_URL);
  const breakouts = await getBreakoutSessions(171);

  const main_event = event_data.events.filter(
    (ev) => ev.isMainEvent === true
  )[0];
  const sub_event = event_data.events.filter((ev) => ev.id === '171')[0];

  const thisBreakout = breakouts.filter((b) => b.id === params.breakout)[0];

  const returnObj: StaticResponse = {
    props: {
      event_meta: event_data,
      main_event,
      sub_event,
      breakout: thisBreakout,
    },
    revalidate: 300,
  };

  return returnObj;
};

export default Breakout;
