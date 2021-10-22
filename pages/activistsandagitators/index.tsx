import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import ThemedPage from 'components/__GLOBALS__/ThemedPage';
import Body from 'components/template1/Body';
import { Banner__WithPicture } from 'components/Banners';
import FlexHero from 'components/Heroes/FlexHero';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { toast } from 'react-toastify';
import Center from 'components/Center';
import default_theme from 'eventAssets/activistsandagitators/activistsandagitators.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import SplashHero from 'components/Heroes/SplashHero';
import { CircleCounter } from 'components/Counters';
import HeaderContent from 'eventAssets/activistsandagitators/HeaderContent';
import { CaptionAccordion } from 'components/Captioning';
import AuthHeaderContent from '../../eventAssets/activistsandagitators/AuthHeaderContent';
import YWCA_SponsorMap from 'eventAssets/activistsandagitators/YWCA_SponsorMap';

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = `activistsandagitators`;
const Index = (props) => {
  const router = useRouter();

  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStarted = useCalculateIfStarted(main_event);
  const [auth, setAuth] = useState(false);

  return (
    <ThemedPage theme={event_theme}>
      <AuthWrap
        headerContent={
          <AuthHeaderContent logo={main_event.LogoLink[0]?.Media?.url} />
        }
        otherFields={{
          Company: {
            required: false,
            value: '',
            displayName: 'Company',
          },
          NoAttendees: {
            required: true,
            value: '',
            displayName: 'Number of People Watching With You',
          },
        }}
        eventToCheck={main_event}
        successCallback={({ message }) => {
          toast.success(
            `Hello ${
              message.Attendee.AttendeeFirst
                ? message.Attendee.AttendeeFirst
                : ''
            }, welcome to ${main_event.EventName}`
          );
        }}
      >
        <Meta title={main_event.EventName}>
          <title>{main_event.EventName}</title>
        </Meta>
        <SplashHero>
          <HeaderContent main_event={main_event} />
        </SplashHero>
        <BodyWrap>
          <div
            style={{
              minHeight: '100vh',
              backgroundColor: 'none',
              margin: '2rem',
            }}
          >
            <PlayerWithChat
              hasStarted={true}
              videoUrl={main_event.streamLinks[0].url}
              chatUrl={main_event.streamLinks[1].url}
            >
              <CaptionAccordion />
            </PlayerWithChat>
          </div>
          <YWCA_SponsorMap eventId={main_event.id} />
        </BodyWrap>
      </AuthWrap>
    </ThemedPage>
  );
};

export async function getServerSideProps(ctx) {
  try {
    return GET_SERVERSIDE_PROPS_DEFAULT(ctx, EVENT_URL);
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
