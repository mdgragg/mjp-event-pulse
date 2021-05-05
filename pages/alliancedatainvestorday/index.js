import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';

import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';

import Section__WithBG from 'components/Sections/Section__WithBG';

import AttendeeAuthModal from '../../components/Modals/AttendeeAuthModal';
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
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Akzidenz-Grotesque-Bold',
  headerFontColor: 'white',
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};

export const EVENT_URL = 'alliancedatainvestorday';
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
  const [hasAuthenticated, setHasAuthenticated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStarted(calculateIfStarted());
    }, 1000);
    const storage_auth = sessionStorage.getItem(session_token);
    if (storage_auth === 'true') {
      setHasAuthenticated(true);
    } else {
      setHasAuthenticated(false);
    }
    return () => clearInterval(interval);
  }, []);

  const MainPage = () => {
    return (
      <>
        <AttendeeAuthModal
          eventId={main_event.id}
          event_name={main_event.EventName}
          open={!hasAuthenticated}
          callback={(creds) => {
            setHasAuthenticated(true);
            sessionStorage.setItem(session_token, true);
            toast.success(creds);
          }}
          headerContent={
            <img src="https://storage.googleapis.com/mjp-stream-public/alliancedatainvestorday/logo.png" />
          }
          otherFields={{
            Company: {
              name: 'Company',
              displayName: 'Company',
              value: '',
              required: 'true',
            },
          }}
        />
        <div
          style={{
            filter: `${!hasAuthenticated ? 'blur(20px)' : 'blur(0px)}'}`,
          }}
        >
          <Page theme={event_theme}>
            <Meta title={event_meta.EventJobName}> </Meta>

            <Body>
              <Section__WithBG imgSrc={main_event?.HeaderImage?.url}>
                <div
                  style={{
                    width: '90%',
                    margin: 'auto',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      justifySelf: 'flex-start',
                      alignSelf: 'flex-start',
                    }}
                  >
                    <img
                      src={
                        'https://storage.googleapis.com/mjp-stream-public/alliancedatainvestorday/logo.png'
                      }
                      style={{
                        position: 'relative',
                        zIndex: '100',
                        height: '130px',
                        width: 'auto',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      maxWidth: '1000px',
                      height: 'calc(100vh - 150px)',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    {hasAuthenticated ? (
                      <VideoBox__StickyTop
                        src={main_event.streamLinks[0].url}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </Section__WithBG>
            </Body>
          </Page>
        </div>
      </>
    );
  };

  return <MainPage />;
};

export async function getStaticProps(ctx) {
  let eventData = await getEventMeta(EVENT_URL);

  let main_event = eventData.events.filter((ev) => ev.isMainEvent === true)[0];

  if (eventData.eventStatus.EventStatus === 'Ended') {
    return {
      redirect: {
        destination: `${EVENT_URL}/thank-you`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      //meta will be the props for the event
      event_meta: eventData,
      main_event,
    },
    revalidate: 6000,
  };
}

export default Index;
