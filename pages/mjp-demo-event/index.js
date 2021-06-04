import { useEffect, useState, useContext } from 'react';
import Route, { Router, useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import { calculateIfStarted, calculateIfEnded } from 'lib/helpers';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import { Grid } from '@material-ui/core';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import FlexHero from 'components/Heroes/FlexHero';
import Section from 'components/Sections/Section';
import DateParse from 'components/assets/DateParse';
import Counter from 'components/Counters/Counter';
import useTestBool from '../../hooks/useTestBool';
import ClientOnly from 'components/assets/ClientOnly';
import PublicChat from 'components/Chat/PublicChat';
export var event_theme = {
  heroHeight: '500px',
  fontFamily: null,
  headerOpacity: 0.6,
  white: null,
  blue: null,
  red: null,
  buttonColor: null,
  headerFont: null,
  headerBgColor: 'black',
};
const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'mjp-demo-event';

const Index = (props) => {
  const router = useRouter();

  const EVENT_URL = router.query.event;

  const session_token = EVENT_URL;
  const { event_meta, main_event } = props;
  const start = main_event.eventStartEnd.StartDateTime;
  const end = main_event.eventStartEnd.EndDateTime;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStarted = useCalculateIfStarted(main_event);

  return (
    <>
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <FlexHero title={event_meta.EventJobName}>
          <div></div>
          <div>
            <center>
              <img
                style={{
                  width: '100%',
                  maxWidth: '350px',
                  margin: '2rem auto',
                }}
                src={main_event.KeyValue[0]?.value}
              />

              <h1 style={{ margin: 'auto', fontSize: '3rem', width: '80%' }}>
                {main_event.EventName}
              </h1>
              <h2 style={{ margin: 'auto' }}>
                <i>
                  <DateParse date={main_event.eventStartEnd.StartDateTime} />
                </i>
              </h2>
            </center>
          </div>
          <div>
            <center>
              <Counter
                fontSize={'1rem'}
                shadow={'0px'}
                bgColor={event_theme.blue}
                counterText={'Starts In'}
                counterTextColor={event_theme.gold}
                textColor={event_theme.gold}
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
                        Live Now!
                      </h2>
                    </center>
                  </>
                }
                start={start}
                end={end}
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
                  <VideoBox__StickyTop
                    isStarted={true}
                    src={main_event.streamLinks[0].url}
                  />
                </div>
              </Grid>
              <Grid item md={4}>
                <ClientOnly>
                  <PublicChat slug={`chat`} />
                </ClientOnly>
                {/* <FullChat slug={`mjp-demo`} /> */}
              </Grid>
            </Grid>
          </Section>
          <BannerWithPicture
            imgUrl={main_event.KeyValue[1]?.value}
            color={'black'}
            secondary={`white`}
            headerText={`About this Event`}
            innerWidth={`650px`}
            buttonText={`Learn More`}
            buttonLink={`#`}
          >
            {main_event.Description && main_event.Description}
          </BannerWithPicture>
        </Body>
      </Page>
    </>
  );
};

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];
  let return_object;

  switch (event_data.eventStatus.EventStatus) {
    case 'Preview':
      if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] !== 'true') {
        return_object = {
          redirect: {
            destination: `${EVENT_URL}/preview`,
            permanent: false,
          },
        };
      }
      break;
    case 'Ended':
      return_object = {
        redirect: {
          destination: `${EVENT_URL}/thank-you`,
          permanent: false,
        },
      };
      break;
    case 'Live':
      return_object = {
        props: {
          //meta will be the props for the event
          event_meta: event_data,
          main_event,
        },
      };
      break;
    default:
      return_object = {
        redirect: {
          destination: `/`,
          permanent: false,
        },
        // revalidate: 600,
      };
  }

  return return_object;
}

export default Index;
