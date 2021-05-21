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
import BattelleHero from 'components/IndividualEventAssets/cos2021/BattelleHero';
import Section from 'components/template1/Section';
import DateParse from 'components/assets/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';

export var event_theme = {
  heroHeight: '500px',
  fontFamily: null,
  headerOpacity: 0.6,
  white: null,
  blue: '#002d74',
  lightBlue: '#8dc6e8',
  red: null,
  buttonColor: null,
  headerFont: null,
  headerBgColor: 'black',
};
const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'cos2021';

const Index = (props) => {
  const router = useRouter();

  const session_token = EVENT_URL;
  const { event_meta, main_event } = props;
  const start = main_event.eventStartEnd.StartDateTime;
  const end = main_event.eventStartEnd.EndDateTime;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStarted = useCalculateIfStarted(start);

  return (
    <>
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <BattelleHero title={event_meta.EventJobName}>
          <h2 style={{ margin: 'auto', color: event_theme.blue }}>
            {!hasStarted ? 'Join Us Live In...' : 'Live Now!'}
            {/* <i>
              <DateParse date={main_event.eventStartEnd.StartDateTime} />
            </i> */}
          </h2>
          <h2 style={{ color: 'white', margin: '0 auto' }}>
            <Counter__JustNumbers
              start={main_event.eventStartEnd.StartDateTime}
            />
          </h2>
        </BattelleHero>

        <Body>
          <div
            style={{
              width: '90%',
              backgroundColor: '#f7f7f7',
              padding: '3rem 0',
              margin: '0 auto',
            }}
          >
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
                <div
                  style={{
                    height: '100%',
                    minHeight: '450px',
                    width: '100%',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <h2>CHAT HERE</h2>
                </div>
              </Grid>
            </Grid>
          </div>
          <BannerWithPicture
            imgUrl={main_event.LogoLink[0].Media.url}
            color={'white'}
            secondary={event_theme.blue}
            headerText={`About This Event`}
            innerWidth={`800px`}
            buttonText={`Learn More`}
            buttonLink={main_event.LogoLink[0].Link}
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

  try {
    let event_data = await getEventMeta(EVENT_URL);

    let main_event = event_data.events.filter(
      (ev) => ev.isMainEvent === true
    )[0];
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
        } else {
          return_object = {
            props: { event_meta: event_data, main_event },
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
  } catch (error) {
    console.log('[event].js error: ', error);
    return {
      redirect: {
        destination: '/404',
      },
    };
  }
}

export default Index;
