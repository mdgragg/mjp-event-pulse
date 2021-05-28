import { useEffect, useState, useContext } from 'react';
import Route, { Router, useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import { calculateIfStarted, calculateIfEnded } from 'lib/helpers';
import useCalculateStartEnd from 'hooks/useCalculateIfStarted';
import { Grid } from '@material-ui/core';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import BattelleHero from 'components/IndividualEventAssets/cos2021/BattelleHero';
import Section from 'components/template1/Section';
import Fluid__iFrame from 'components/iFrames/Fluid__iFrame';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';

export const EVENT_URL = 'cos2021';

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
  videoBreakPoint: 0,
};

const Index = (props) => {
  const { event_meta, main_event } = props;
  const router = useRouter();

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url,
  };

  const hasStartEnd = useCalculateStartEnd(main_event);

  useEffect(() => {
    if (event_meta.eventStatus.EventStatus === 'Ended') {
      router.push('./');
    }
  }, []);

  return (
    <>
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <BattelleHero
          title={event_meta.EventJobName}
          counter_area={
            <h2 style={{ color: 'white', margin: '0 auto' }}>
              {!hasStartEnd.hasStarted
                ? 'Join Us Live In...'
                : hasStartEnd.hasEnded
                ? 'This Event Has Ended'
                : 'Live Now!'}
              <br />
              <Counter__JustNumbers
                start={main_event.eventStartEnd.StartDateTime}
                end={main_event.eventStartEnd.EndDateTime}
                afterStarted={' '}
                afterEnded={' '}
              />
            </h2>
          }
        >
          <h2 style={{ margin: 'auto', color: event_theme.blue }}>
            A Year Like No Other <br />
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
                    isStarted={hasStartEnd.hasStarted}
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
                  <Fluid__iFrame
                    src={
                      main_event.streamLinks.find((l) => l.Service === 'Chat')
                        .url
                    }
                  />
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
            buttonText={null}
            buttonLink={null}
          >
            {main_event.Description && main_event.Description}
          </BannerWithPicture>
        </Body>
      </Page>
    </>
  );
};

export async function getStaticProps() {
  let event_data = await getEventMeta(EVENT_URL);

  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
    },
    revalidate: 300,
  };
}

export default Index;
