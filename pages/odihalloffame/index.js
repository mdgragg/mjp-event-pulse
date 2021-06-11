import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import { Grid } from '@material-ui/core';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import FlexHero from 'components/Heroes/FlexHero';
import Section from 'components/Sections/Section';
import DateParse from 'components/assets/DateParse';
import Agenda from 'components/IndividualEventAssets/odihalloffame/Agenda';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { toast } from 'react-toastify';
export const EVENT_URL = 'odihalloffame';
export var event_theme = {
  heroHeight: '500px',
  fontFamily: null,
  headerOpacity: 0,
  white: null,
  blue: null,
  red: 'rgb(187, 0, 0)',
  buttonColor: null,
  headerFont: 'College Block',
  headerBgColor: 'black',
  headerFontColor: 'rgb(187, 0, 0)',
  videoBreakPoint: 1500,
};
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const router = useRouter();
  const EVENT_URL = router.query.event;
  const { event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStarted = useCalculateIfStarted(main_event);

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
      <FlexHero title={event_meta.EventJobName}>
        <div>
          <img
            style={{
              width: '100%',
              maxWidth: '350px',
              margin: '2rem auto',
            }}
            src={main_event.LogoLink[0]?.Media?.url || null}
          />
        </div>
        <div>
          <center>
            <h1
              style={{
                margin: 'auto',
                fontSize: '3rem',
                width: '80%',
                letterSpacing: '5px',
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
                color: '#666666',
                letterSpacing: '0px',
                fontSize: '2rem',
                fontFamily: 'Avenir',
              }}
            >
              <Counter__JustNumbers
                prefix={'Join Us Live In'}
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
        <Section>
          <div
            style={{
              minHeight: '60vh',
              backgroundColor: 'none',
              margin: '2rem',
            }}
          >
            <PlayerWithChat
              videoUrl={main_event.streamLinks[0].url}
              chatUrl={main_event.streamLinks[1].url}
              showing={true}
              hasStarted={true}
              children={
                <a href={main_event.LogoLink[0]?.Link} target="_blank">
                  <button> Learn More About This Event</button>
                </a>
              }
            />
          </div>
        </Section>
        <Section>
          <Agenda />
        </Section>
        {main_event.Description && (
          <BannerWithPicture
            imgUrl={main_event.LogoLink[0]?.Media?.url || null}
            color={'white'}
            secondary={`black`}
            headerText={`About This Event`}
            innerWidth={`650px`}
            buttonText={`Learn More`}
            buttonLink={main_event.LogoLink[0]?.Link || '#'}
          >
            {main_event.Description}
          </BannerWithPicture>
        )}
      </Body>
    </Page>
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
    return {
      props: { event_meta: event_data, main_event },
    };
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
