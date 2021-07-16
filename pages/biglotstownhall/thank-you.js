import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';

import { Grid } from '@material-ui/core';

import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';

import Body from 'components/template1/Body';
import Section__WithBG from 'components/Sections/Section__WithBG';

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

  const MainPage = () => {
    return (
      <>
        <Page theme={event_theme}>
          <Meta title={event_meta.EventJobName}> </Meta>

          <Body>
            <Section__WithBG imgSrc={main_event?.HeaderImage?.url}>
              <img
                src={
                  'https://storage.googleapis.com/mjp-stream-public/alliancedatainvestorday/logo.png'
                }
                style={{
                  position: 'absolute',
                  zIndex: '100',
                  top: '65px',
                  left: '25px',
                  height: '130px',
                  width: 'auto',
                }}
              />

              <Grid container spacing={10}>
                <Grid item={true} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      maxWidth: '1000px',
                      margin: 'auto',
                      height: '100vh',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: '1000',
                      position: 'relative',
                    }}
                  >
                    <h2 style={{ fontSize: '4rem', textAlign: 'center' }}>
                      Thank you for attending {main_event.EventName}
                    </h2>
                  </div>
                </Grid>
              </Grid>
            </Section__WithBG>
          </Body>
        </Page>
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

export async function getStaticProps(ctx) {
  //console.log(ctx.req.cookies);

  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  let eventData = await getEventMeta(EVENT_URL);

  let main_event = eventData.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: eventData,
      main_event,
    },
  };
}

export default Index;
