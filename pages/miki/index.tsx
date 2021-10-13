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
import default_theme from 'eventAssets/miki/miki.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import { BoxedCounter, CircleCounter } from 'components/Counters';
import { Clock } from 'components/__Assets__';

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = `miki`;
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
        eventToCheck={main_event}
        successCallback={(res) => {
          toast.success(
            `Hello ${
              res.Attendee.AttendeeFirst ? res.Attendee.AttendeeFirst : ''
            }, welcome to ${main_event.EventName}`
          );
        }}
      >
        <Meta title={main_event.EventName}>
          <title>{main_event.EventName}</title>
        </Meta>
        <FlexHero columns={`20% 60% 20%`}>
          <div>
            <img
              style={{
                width: '100%',
                maxWidth: '250px',
                margin: '2rem auto',
              }}
              src={main_event.LogoLink[0]?.Media?.url || null}
            />
            <br />
            <Clock format={`dddd MMMM DD`} />
            <br />
            <Clock format={`h:mm a zz`} />
          </div>
          <div>
            <Center>
              <img
                style={{
                  width: '100%',
                  maxWidth: '450px',
                  margin: '0.5rem auto',
                }}
                src={main_event.LogoLink[1]?.Media?.url || null}
              />
              <h1>{main_event.EventName}</h1>
              <h2>
                <i>
                  <DateParse date={main_event.eventStartEnd.StartDateTime} />
                </i>
              </h2>
            </Center>
          </div>
          <div>
            <Center>
              <CircleCounter event={main_event} />
            </Center>
          </div>
        </FlexHero>
        <BodyWrap>
          {main_event.streamLinks.length === 1 ? (
            <div
              style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <CenteredPlayer
                showing={true}
                hasStarted={true}
                videoUrl={main_event.streamLinks[0].url}
              />
            </div>
          ) : (
            <div
              style={{
                minHeight: '60vh',
                backgroundColor: 'none',
                margin: '2rem',
              }}
            >
              <PlayerWithChat
                children={null}
                hasStarted={true}
                videoUrl={main_event.streamLinks[0].url}
                chatUrl={main_event.streamLinks[1].url}
              />
            </div>
          )}

          {main_event.Description && (
            <Banner__WithPicture
              imgUrl={main_event.LogoLink[0]?.Media?.url || null}
              color={'black'}
              secondary={`white`}
              headerText={`About This Event`}
              innerWidth={`650px`}
              buttonText={`Learn More`}
              buttonLink={main_event.LogoLink[0]?.Link || '#'}
            >
              {main_event.Description}
            </Banner__WithPicture>
          )}
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
