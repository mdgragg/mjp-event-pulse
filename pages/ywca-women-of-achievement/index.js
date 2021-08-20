import { useState } from 'react';
import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Section from 'components/Sections/Section';
import PlayerWithChat from 'components/BodyTemplates/PlayerWithChat';
import Body from 'components/template1/Body';
import Hero from 'eventAssets/ywca-women-of-achievement/Hero';
import YWCA_Body from 'eventAssets/ywca-women-of-achievement/YWCA_Body';
import AfterEnded from 'eventAssets/ywca-women-of-achievement/AfterEnded';
import YWCA_STYLE from 'eventAssets/ywca-women-of-achievement/YWCA_STYLE';
import { toast } from 'react-toastify';
import { Banner__ImgBg } from 'components/Banners';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';

import AuthWrap from 'components/AuthWrap';
import event_theme from 'eventAssets/ywca-women-of-achievement/theme.theme';

export const EVENT_URL = 'ywca-women-of-achievement';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const { event_meta, main_event } = props;
  let theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStartEnd = useCalculateIfStarted(main_event);

  return (
    <AuthWrap
      eventToCheck={main_event}
      successCallback={(res) => {
        toast.success(
          `Hello ${
            res.Attendee.AttendeeFirst ? res.Attendee.AttendeeFirst : ''
          }, welcome to ${main_event.EventName}`
        );
      }}
    >
      <Page theme={theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <YWCA_STYLE>
          <Body>
            <Hero main_event={main_event} />
            <Section>
              {event_meta.eventStatus.EventStatus === 'Ended' ? (
                <AfterEnded />
              ) : (
                <PlayerWithChat
                  videoUrl={main_event.streamLinks[0].url}
                  chatUrl={main_event.streamLinks[1].url}
                  showing={true}
                  hasStarted={true}
                />
              )}
            </Section>
            <Section>
              <YWCA_Body main_event={main_event} hasStartEnd={hasStartEnd} />
            </Section>
            <Banner__ImgBg
              imgSrc={
                'https://storage.googleapis.com/mjp-stream-public/ywca-women-of-achievement/WOA2015-1861bw-1400x791.jpg'
              }
              imgAlt="Background pattern of radiating lines"
            >
              <div
                style={{
                  backgroundColor: 'rgba(255,255,255,0.75)',
                  maxWidth: '650px',
                  padding: '3rem',
                  margin: 'auto',
                }}
              >
                <h3>About This Event</h3>
                <p>{main_event.Description}</p>
                <a href={main_event.LogoLink[0]?.Link} target="_blank">
                  <button> Learn More</button>
                </a>
                <img
                  src={main_event.LogoLink[0].Media.url}
                  style={{ height: '80px', width: 'auto', margin: '2rem auto' }}
                />
              </div>
            </Banner__ImgBg>
          </Body>
        </YWCA_STYLE>
      </Page>
    </AuthWrap>
  );
};
// export async function getServerSideProps(ctx) {
//   const { preview } = cookies(ctx);
//   const { hasLoggedIn } = cookies(ctx);
//   return { props: {} };
// }

export async function getStaticProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
    },
    revalidate: 500,
  };
}

export default Index;
