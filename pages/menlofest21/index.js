import { useRouter } from 'next/router';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import FullWrap from 'components/FullWrap';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import Video__StickyTop__WithCountdown from 'components/VideoBoxes/Video__StickyTop__WithCountdown';
import FlexHero from 'components/Heroes/FlexHero';
import Section from 'components/template1/Section';
import PasswordAuthModal from 'components/Modals/AuthModal__Password';

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
  purple: '#b1c6e6',
  brown: '#7c5437',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  footerBg: '#b1c6e6',
  headerOpacity: '0',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Akzidenz-Grotesque-Bold',
  headerFontColor: 'white',
  headerBgColor: '#b1c6e6',
  maxSectionWidth: '1800px',
};

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'menlofest21';
const Index = (props) => {
  const session_token = EVENT_URL;
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

  return (
    <>
      <PasswordAuthModal
        event_meta={main_event}
        open={!hasAuthenticated}
        headerContent={
          <img
            style={{
              margin: 'auto',
              height: '150px',
              width: 'auto',
              padding: '1rem',
            }}
            src={`https://storage.googleapis.com/mjp-stream-public/menlofest21/logo-size.png`}
          />
        }
        callback={(creds) => {
          setHasAuthenticated(true);
          sessionStorage.setItem(session_token, true);
          toast.success(creds);
        }}
      />
      <FullWrap className={hasAuthenticated ? '' : 'blurred'}>
        <Page theme={event_theme}>
          <Meta title={event_meta.EventJobName}> </Meta>
          <FlexHero
            hasStarted={hasStarted}
            title={event_meta.EventJobName}
            bgColor={event_theme.purple}
          >
            <div style={{ textAlign: 'center' }}>
              <img
                src="https://storage.googleapis.com/mjp-stream-public/menlofest21/logo-size.png"
                alt="logo"
              />
            </div>
            <div style={{ margin: 'auto' }}>
              <center>
                <h2 style={{ margin: 'auto' }}>
                  Thank you for attending{' '}
                  <span style={{ color: event_theme.brown }}>
                    {' '}
                    Menlo Fest Virtual Event 2021
                  </span>{' '}
                </h2>
                <h2 style={{ margin: 'auto' }}>
                  <i> Please enjoy the full recording of the event below</i>
                </h2>
              </center>
            </div>

            <div>
              <center>
                <div
                  style={{
                    fontSize: '1.5rem',
                    backgroundColor: event_theme.brown,
                    padding: '1rem 0',
                    fontFamily: 'Ace Sans',
                  }}
                >
                  <h3>Thank You For Your Support!</h3>
                </div>
              </center>
            </div>
          </FlexHero>

          <Body>
            <Section>
              <Grid container spacing={3}>
                <Grid item={true} md={12} sm={12} xs={12}>
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
                      <Video__StickyTop__WithCountdown
                        showMinutesBefore={195}
                        start={main_event.eventStartEnd.StartDateTime}
                        isStarted={true}
                        src={
                          main_event.streamLinks.find(
                            (link) => link.isMain === true
                          ).url
                        }
                        showBefore={<></>}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </Grid>
              </Grid>
            </Section>
          </Body>
          <Footer></Footer>
        </Page>
      </FullWrap>
    </>
  );
};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: './',
    },
  };
}

export default Index;
