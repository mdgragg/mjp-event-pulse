import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';

import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import VideoBox__iFrame from 'components/VideoBoxes/Video__iFrame';
import Section__WithBG from 'components/Sections/Section__WithBG';
import AttendeeAuthModal from '../../components/Modals/AttendeeAuthModal';
import LandingPage from 'components/IndividualEventAssets/biglotstownhall/LandingPage';
import { toast } from 'react-toastify';

export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '200px',
  green: '#97d700',
  white: null,
  blue: '#1e2c60',
  red: '#b71f39',
  orange: '#FF5600',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Futura Bold',
  headerFontColor: 'white',
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};

export const EVENT_URL = 'biglotstownhall';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const session_token = EVENT_URL;
  const router = useRouter();

  const { event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const calculateIfStarted = () => {
    let now = new Date();
    const parsed_event_start = Date.parse(
      main_event.eventStartEnd.StartDateTime
    );

    let calc_time = parsed_event_start - now;

    if (calc_time <= 0) {
      return true;
    }
    return false;
  };

  const [hasStarted, setStarted] = useState(calculateIfStarted());

  const [hasAuthenticated, setHasAuthenticated] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setStarted(calculateIfStarted());
    }, 1000);

    // const storage_auth = sessionStorage.getItem(session_token);

    // if (storage_auth === 'true') {
    //   setHasAuthenticated(true);
    // } else {
    //   setHasAuthenticated(false);
    // }

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* <AttendeeAuthModal
        eventId={main_event.id}
        event_name={main_event.EventName}
        open={!hasAuthenticated}
        callback={(creds) => {
          setHasAuthenticated(true);
          sessionStorage.setItem(session_token, true);
          toast.success(creds);
        }}
      /> */}
      <div
        style={{
          filter: `${!hasAuthenticated ? 'blur(20px)' : 'blur(0px)}'}`,
        }}
      >
        <Page theme={event_theme}>
          <Meta title={event_meta.EventJobName}> </Meta>

          <Body>
            <LandingPage main_event={main_event} />
          </Body>
        </Page>
      </div>
    </>
  );
};
// export async function getServerSideProps(ctx) {
//   const { preview } = cookies(ctx);
//   const { hasLoggedIn } = cookies(ctx);
//   return { props: {} };
// }

export async function getStaticProps() {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
    },
  };
}

export default Index;
