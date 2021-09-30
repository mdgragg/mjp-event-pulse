import { getBreakoutSessions, getEventMeta } from 'lib/api';
import Splash from 'eventAssets/netjetssummit/Splash';
import { GetStaticPaths, GetStaticProps } from 'next';
import { StaticResponse } from 'types/PageResponses';
import { EVENT_URL } from '../index';
import BreakoutPage from 'eventAssets/netjetssummit/BreakoutPage';
import EventWrap from 'eventAssets/netjetssummit/EventWrap';

const Breakout = (props) => {
  const { event_meta, main_event, sub_event, breakout } = props;
  const chatLink = breakout.KeyValue.filter((k) => k.key === 'Chat')[0];

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
  const breakouts = await getBreakoutSessions(172);

  return {
    paths: breakouts.map((breakout) => ({
      params: { breakout: breakout.id },
    })),
    fallback: false, // See the "fallback" section below
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const event_data = await getEventMeta(EVENT_URL);
  const breakouts = await getBreakoutSessions(172);

  const main_event = event_data.events.filter(
    (ev) => ev.isMainEvent === true
  )[0];
  const sub_event = event_data.events.filter((ev) => ev.id === '172')[0];

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
