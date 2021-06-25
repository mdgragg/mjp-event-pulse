import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import { Grid } from '@material-ui/core';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates/index';
import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import FlexHero from 'components/Heroes/FlexHero';
import DHLBody from 'components/IndividualEventAssets/dhl-virtual-town-hall/Body';
import DateParse from 'components/assets/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';

export const EVENT_URL = 'dhl-virtual-town-hall';
export var event_theme = {
  primary: '#d30411',
  secondary: '#ffcc00',
  heroHeight: '250px',
  fontFamily: null,
  headerOpacity: 1,
  white: null,
  blue: null,
  red: '#d30411',
  buttonColor: null,
  headerFont: 'Delivery',
  headerBgColor: '#ffcc00',
  headerFontColor: '#d30411',
  videoBreakPoint: 1500,
};
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const router = useRouter();
  const EVENT_URL = router.query.event;
  const { event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    header_image: null,
  };

  const hasStarted = useCalculateIfStarted(main_event);

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
      <FlexHero title={event_meta.EventJobName}>
        <div style={{ textAlign: 'center' }}>
          <img src={main_event.LogoLink[0]?.Media?.url || null} />
        </div>
        <div>
          <center>
            <h1
              style={{
                margin: 'auto',
                fontSize: '3rem',
                width: '80%',
              }}
            >
              {main_event.EventName}
            </h1>
            <h2 style={{ margin: 'auto', fontFamily: 'Avenir' }}>
              <i>
                <DateParse date={main_event.eventStartEnd.StartDateTime} />
              </i>
            </h2>
          </center>
        </div>
        <div>
          <center>
            <h2
              style={{
                color: 'white',
                fontSize: '1.5rem',
                fontFamily: 'Avenir',
              }}
            >
              <Counter__JustNumbers
                prefix={'Starts In'}
                start={main_event.eventStartEnd.StartDateTime}
                end={main_event.eventStartEnd.EndDateTime}
                afterStarted={'Live Now!'}
                afterEnded={'Thank You for Attending'}
              />
            </h2>
          </center>
        </div>
      </FlexHero>
      <Body>
        <DHLBody main_event={main_event} />

        {/* <BannerWithPicture
          style={{ fontFamily: 'Delivery', color: event_theme.primary }}
          color={event_theme.secondary}
          secondary={event_theme.primary}
          headerText={`Agenda`}
          innerWidth={`650px`}
        >
          {' '}
          Agenda items can go here or it can be deleted
        </BannerWithPicture> */}
        {main_event.Description && (
          <BannerWithPicture
            style={{ fontFamily: 'Delivery', color: event_theme.primary }}
            imgUrl={main_event.LogoLink[0]?.Media?.url || null}
            color={event_theme.secondary}
            secondary={event_theme.primary}
            headerText={`About This Event`}
            innerWidth={`650px`}
            textColor={event_theme.primary}
          >
            {main_event.Description}
          </BannerWithPicture>
        )}
        <div
          style={{
            width: '100%',
            height: '250px',
            backgroundColor: event_theme.secondary,
          }}
        ></div>
      </Body>
    </Page>
  );
};

export async function getStaticProps(ctx) {
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
    return {
      props: { event_meta: event_data, main_event },
      revalidate: 500,
    };
  } catch (error) {
    console.log('[event].js error: ', error);
    return {
      redirect: {
        destination: './',
      },
    };
  }
}

export default Index;
