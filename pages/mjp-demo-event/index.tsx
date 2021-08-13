import { useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import { Grid } from '@material-ui/core';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import MJHero from 'components/Heroes/MJHero';
import Section from 'components/Sections/Section';
import ClientOnly from 'components/__Assets__/ClientOnly';
import PublicChat from 'components/Chat/PublicChat';
import { default_theme } from '../../components/Themes/default.theme';
const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'mjp-demo-event';

const Index = (props) => {
  const { event_meta, main_event, children } = props;

  let event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  return (
    <>
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        {children ? children : <PageBody main_event={main_event} />}
      </Page>
    </>
  );
};

export const PageBody = ({ main_event }) => (
  <>
    <MJHero main_event={main_event} />
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
              <PublicChat slug={main_event.slug} />
            </ClientOnly>
            {/* <FullChat slug={`mjp-demo`} /> */}
          </Grid>
        </Grid>
      </Section>
      <BannerWithPicture
        imgUrl={main_event.KeyValue[1]?.value}
        color={'black'}
        secondary={`white`}
        textColor={`white`}
        headerText={`About This Event`}
        innerWidth={`650px`}
        buttonText={`Learn More`}
        buttonLink={`#`}
      >
        {main_event.Description && main_event.Description}
      </BannerWithPicture>
    </Body>
  </>
);

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  let initial_data = await fetch(
    'https://millsjameseventcms-testing.firebaseio.com/test-2.json'
  ).then((res) => res.json());

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
          test: initial_data,
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
