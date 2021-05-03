import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import { Grid } from '@material-ui/core';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import FlexHero from 'components/Heroes/FlexHero';
import Counter from 'components/Counters/Counter';
import Footer from 'components/template1/Footer';
import Section from 'components/template1/Section';
import Agenda from 'components/IndividualEventAssets/ads-sales-meetings-2021/Agenda';
import PasswordAuthModal from '../../components/Modals/PasswordAuthModal';
import { toast } from 'react-toastify';
export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '350px',
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

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'menlofest21';
const Index = (props) => {
  const session_token = 'menlo-token';
  const router = useRouter();

  const {
    event_meta,
    main_event,
    event_meta: { AuthRequired },
    main_event: { BreakoutSessions },
  } = props;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x350',
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

    // if (storage_auth === 'true') {
    //   setHasAuthenticated(true);
    // } else {
    //   setHasAuthenticated(false);
    // }

    return () => clearInterval(interval);
  }, []);

  const MainPage = () => {
    return (
      <>
        <PasswordAuthModal
          eventId={main_event.id}
          open={!hasAuthenticated}
          callback={(creds) => {
            setHasAuthenticated(true);
            sessionStorage.setItem(session_token, true);
            toast.success(creds);
          }}
        />
        <div
          style={{
            filter: `${!hasAuthenticated ? 'blur(20px)' : 'blur(0px)}'}`,
          }}
        >
          <Page theme={event_theme}>
            <Meta title={event_meta.EventJobName}> </Meta>
            <FlexHero hasStarted={hasStarted} title={event_meta.EventJobName}>
              <div></div>
              <div>
                <center>
                  <img
                    style={{ width: '100%', maxWidth: '350px', margin: 'auto' }}
                    src={main_event.KeyValue[0]?.value}
                  />

                  <h2 style={{ margin: 'auto' }}>Text 'Menlo' to 24293</h2>
                  <h2 style={{ margin: 'auto' }}>
                    <i> To sign up for live bidding</i>
                  </h2>
                </center>
              </div>
              <div>
                <center>
                  <Counter
                    fontSize={'1rem'}
                    shadow={'0px'}
                    bgColor={event_theme.green}
                    counterText={'Starts In'}
                    counterTextColor={'white'}
                    textColor={'white'}
                    hasStarted={hasStarted}
                    afterStarted={
                      <>
                        <center>
                          <h2
                            style={{
                              fontWeight: '800',
                              fontSize: '2rem',
                              color: 'white',
                              padding: '0.5rem',
                              backgroundColor: event_theme.red,
                              margin: 'auto auto 0 auto',
                            }}
                          >
                            Live Now
                          </h2>
                        </center>
                      </>
                    }
                    start={main_event.eventStartEnd.StartDateTime}
                  />
                </center>
              </div>
            </FlexHero>

            <Body>
              <Section>
                <Grid container spacing={3}>
                  <Grid item={true} md={8} sm={12} xs={12}>
                    <div
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                  </Grid>
                  <Grid item={true} md={4} xs={12}>
                    <Agenda />
                    <a href="#bidpal-help">
                      {/* <Button
                    style={{ margin: '2rem auto', display: 'block' }}
                    color={'primary'}
                    variant="outlined"
                  >
                    Help
                  </Button> */}
                    </a>
                  </Grid>
                  <Grid item md={8} xs={12}></Grid>
                  <Grid item md={4} xs={12}></Grid>
                </Grid>
              </Section>

              <Section>
                <Grid container spacing={3}>
                  <Grid item={true} md={8} sm={12} xs={12}></Grid>
                  <Grid item={true} md={4} xs={12}></Grid>
                  <Grid item md={8} xs={12}></Grid>
                  <Grid item md={4} xs={12}></Grid>
                </Grid>
              </Section>
            </Body>
            <Footer></Footer>
          </Page>
        </div>
      </>
    );
  };

  return <MainPage />;
};
// export async function getServerSideProps(ctx) {
//   const { preview } = cookies(ctx);
//   const { hasLoggedIn } = cookies(ctx);
//   return { props: {} };
// }

export async function getServerSideProps(ctx) {
  //console.log(ctx.req.cookies);

  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

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
  };
}

export default Index;
