import { useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import { Banner__WithPicture } from 'components/Banners';
import MJHero from 'components/Heroes/MJHero';
import Section from 'components/Sections/Section';
import ClientOnly from 'components/__Assets__/ClientOnly';
import PublicChat from 'components/Chat/PublicChat';
import { mjxTheme } from '../../components/__GLOBALS__/mjx.theme';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { Button__Primary } from 'components/Buttons';
import { Video__StickyTop__WithCountdown } from 'components/VideoBoxes';
import Before from 'components/LinkBoxes/Before';
import SponsorMap from 'eventAssets/tofresearchseries2021/SponsorMap';
import { ExpandMore } from '@material-ui/icons';
import CaptionAccordion from 'components/Captioning/CaptionAccordion';
const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'mjp-demo-event';

const Index = (props) => {
  const { event_meta, main_event, children } = props;

  let event_theme = {
    ...mjxTheme,
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
    <BodyWrap>
      <Section>
        <div
          style={{
            maxWidth: '1920px',
            margin: 'auto',
            minHeight: '100vh',
          }}
        >
          <PlayerWithChat
            hasStarted={true}
            chatUrl={null}
            chatComponent={<PublicChat slug={main_event.slug} />}
            videoUrl={main_event.streamLinks[0].url}
          >
            <CaptionAccordion />
          </PlayerWithChat>
        </div>
      </Section>
      <hr />
      <Section>
        <h2>Player With Countdown Example:</h2>
        <div
          style={{
            maxWidth: '1920px',
            margin: 'auto',
            minHeight: '100vh',
          }}
        >
          <Video__StickyTop__WithCountdown
            start={main_event.eventStartEnd.StartDateTime}
            showBefore={
              <Before
                imgSrc={main_event.LogoLink[0].Media.url}
                main_event={main_event}
                counterStyles={{ textColor: 'black', titleColor: 'black' }}
              />
            }
          />
        </div>
      </Section>
      <Banner__WithPicture
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
      </Banner__WithPicture>
      <hr />
      <Section>
        <h2>Sponsors Example:</h2>
        <SponsorMap eventId={147} />
      </Section>
    </BodyWrap>
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
