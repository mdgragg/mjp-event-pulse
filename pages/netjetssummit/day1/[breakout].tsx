import { getBreakoutSessions, getEventMeta } from 'lib/api';
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
import { PlayerWithChat } from 'components/BodyTemplates';
import { Button__Primary } from 'components/Buttons';
import { Typography } from '@material-ui/core';
import { DateParse } from 'components/__Assets__';
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
    <ThemedPage theme={event_theme}>
      <AuthWrap
        eventToCheck={main_event}
        successCallback={(res) => {
          toast.success(
            `Hello ${
              res.Attendee.AttendeeFirst ? res.Attendee.AttendeeFirst : ''
            }, welcome to ${main_event.EventName}`
          );
        }}
      >
        <Meta title={main_event.EventName}>
          <title>{main_event.EventName}</title>
        </Meta>

        <Splash main_event={main_event} noHeader>
          <div style={{ width: '90vw', margin: '5rem auto 10rem' }}>
            <h1>{breakout.Name}</h1>
            <Typography variant={`overline`}>
              <div style={{ margin: '1rem auto' }}>
                <DateParse date={breakout.DateTime} />
              </div>
            </Typography>
            <div style={{ margin: '5rem auto' }}>
              <PlayerWithChat
                hasStarted={true}
                videoUrl={breakout.Link.url}
                chatUrl={chatLink.value}
                styles={{
                  chat: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    border: '0px',
                  },
                  wrap: {
                    backgroundColor: 'rgba(0,0,0,0)',
                  },
                }}
              >
                <Link href={'../day1'}>
                  <Button__Primary>Back To Day 1</Button__Primary>
                </Link>
              </PlayerWithChat>
            </div>
          </div>
        </Splash>
      </AuthWrap>
    </ThemedPage>
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
