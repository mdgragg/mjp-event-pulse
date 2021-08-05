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
import Banner_ImgBg from 'components/Banners/Banner_ImgBg';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';

import AuthWrap from 'components/AuthWrap';
export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '200px',
  green: '#97d700',
  grey: '#181818',
  white: null,
  blue: '#1e2c60',
  red: '#e41936',
  orange: '#fa4616',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Futura Bold',
  headerFontColor: 'white',
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};

export const EVENT_URL = 'ywca-women-of-achievement';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const { event_meta, main_event } = props;
  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStartEnd = useCalculateIfStarted(main_event);
  const [auth, setAuth] = useState(false);

  return (
    <AuthWrap
      event_to_check={main_event}
      callback={(res) => {
        toast.success(
          `Hello ${
            res.Attendee.AttendeeFirst ? res.Attendee.AttendeeFirst : ''
          }, welcome to ${main_event.EventName}`
        );
      }}
      render={(value) => setAuth(value)}
    >
      <Page theme={event_theme}>
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
                  showing={auth}
                  hasStarted={true}
                />
              )}
            </Section>
            <Section>
              <YWCA_Body main_event={main_event} hasStartEnd={hasStartEnd} />
            </Section>
            <Banner_ImgBg
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
            </Banner_ImgBg>
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
