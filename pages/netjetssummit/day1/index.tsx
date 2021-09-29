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
const PLACEHOLD = 'https://placehold.co/';

const Day1 = (props) => {
  const router = useRouter();
  const { event_meta, main_event, sub_event } = props;

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
        <Meta title={`Net Jets Summit Day 1`}>
          <title>{`Net Jets Summit Day 1`}</title>
        </Meta>

        <Splash main_event={main_event}>
          {router.query.breakout ? (
            <div>
              <h1>{router.query.breakout}</h1>
              <Link href={'./day1'}>Back</Link>
            </div>
          ) : (
            <SingleDay day={sub_event} dayQuery={`day1`} />
          )}
        </Splash>
      </AuthWrap>
    </ThemedPage>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];
  let sub_event = event_data.events.filter((ev) => ev.id === '171')[0];

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
