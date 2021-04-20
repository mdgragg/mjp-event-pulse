import { useEffect, useState, useContext } from 'react';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import { Grid, Button } from '@material-ui/core';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import Footer from 'components/template1/Footer';
import { EVENT_URL, event_theme } from './index';
import FlexHero from 'components/Heroes/FlexHero';
import DateParse from '../../components/assets/DateParse';
import Section from 'components/template1/Section';
const PLACEHOLD = 'https://placehold.co/';

const ThankYou = (props) => {
  const {
    event_meta,
    main_event,
    event_meta: { AuthRequired },
    main_event: { BreakoutSessions },
  } = props;

  let the_event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  // const [hasStarted, setStarted] = useState(calculateIfStarted());

  // const [hasStarted, setStarted] = createContext(false);

  const MainPage = () => {
    return (
      <Page theme={the_event_theme}>
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
              <h2>
                <i>Thank You for Attending The </i>
              </h2>
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
              <h2
                style={{
                  fontWeight: '800',
                  fontSize: '2rem',
                  color: 'white',
                  padding: '0.5rem',
                  backgroundColor: event_theme.blue,
                  margin: 'auto auto 0 auto',
                }}
              >
                This Event Has Ended
              </h2>
            </center>
          </div>
        </FlexHero>

        <Body>
          <Section>
            <Grid container spacing={3}>
              <Grid item md={1}>
                {' '}
              </Grid>
              <Grid item={true} md={10} sm={12} xs={12}>
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
              <Grid item md={1}>
                {' '}
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
            buttonLink={`https://www.nffcolumbus.com/ `}
          >
            {main_event.Description && main_event.Description}
          </BannerWithPicture>
        </Body>
      </Page>
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

export default ThankYou;
