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
import default_theme from 'eventAssets/quantumhealthcab/quantumhealthcab.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import AgendaBoard from 'components/Agenda/AgendaBoard';
import { BreakoutBoard } from 'components/BreakoutSessions';
import { BoxedCounter } from 'components/Counters';
import BreakoutTimeline from 'eventAssets/quantumhealthcab/BreakoutTimeline';

const PLACEHOLD = 'https://placehold.co/';
const EVENT_URL = 'quantumhealthcab';
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
        <FlexHero>
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
            <Center>
              <div>
                <img
                  style={{
                    width: '100%',
                    maxWidth: '350px',
                    margin: '2rem auto',
                  }}
                  src={main_event.LogoLink[1]?.Media?.url || null}
                />
              </div>
              {/* <h1>{main_event.EventName}</h1> */}
              <h2>
                <i>
                  <DateParse date={main_event.eventStartEnd.StartDateTime} />
                </i>
              </h2>
            </Center>
          </div>
          <div>
            <Center>
              <BoxedCounter event={main_event} prefix={`Join Us Live In`} />
            </Center>
          </div>
        </FlexHero>
        <BodyWrap>
          <div
            style={{
              padding: '3rem 2% 6rem 2%',
              maxWidth: '1200px',
              margin: 'auto',
            }}
          >
            <BreakoutTimeline breakouts={main_event.BreakoutSessions} />

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
          </div>
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
