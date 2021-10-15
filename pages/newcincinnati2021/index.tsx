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
import default_theme from 'eventAssets/newcincinnati2021/newcincinnati2021.theme';
import {
  GET_SERVERSIDE_PROPS_DEFAULT,
  GET_STATIC_PROPS_DEFAULT,
} from 'src/page_responses/default';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import { CircleCounter } from 'components/Counters';
import NewBanner from 'eventAssets/newcincinnati2021/NewBanner';

export const EVENT_URL = `newcincinnati2021`;
const PLACEHOLD = 'https://placehold.co/';

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
          <div style={{ maxWidth: '160px', margin: '1rem auto' }}>
            <img
              style={{ width: '80%', margin: 'auto' }}
              src={main_event.LogoLink[0]?.Media?.url}
            />
          </div>
        }
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
        <FlexHero columns={'25% 50% 25%'}>
          <div></div>
          <div>
            <img
              style={{
                width: '100%',
                maxWidth: '200px',
                margin: '2rem auto',
              }}
              src={main_event.LogoLink[0]?.Media?.url || null}
            />
            <p>
              <DateParse date={main_event.eventStartEnd.StartDateTime} />
            </p>
          </div>
          <div>
            <CircleCounter event={main_event} prefix={`Join Us Live In`} />
          </div>
        </FlexHero>
        <BodyWrap>
          <div
            style={{
              minHeight: '60vh',
              backgroundColor: 'none',
              margin: '2rem auto',
              maxWidth: '98vw',
              paddingBottom: '10rem',
            }}
          >
            <PlayerWithChat
              children={null}
              hasStarted={true}
              videoUrl={main_event.streamLinks[0].url}
              chatUrl={main_event.streamLinks[1].url}
            />
          </div>

          <NewBanner />
        </BodyWrap>
      </AuthWrap>
    </ThemedPage>
  );
};

export async function getStaticProps(ctx) {
  try {
    return await GET_STATIC_PROPS_DEFAULT(EVENT_URL);
  } catch (error) {
    console.log('[event].js error: ', error);
    return {
      notFound: true,
    };
  }
}

export default Index;
