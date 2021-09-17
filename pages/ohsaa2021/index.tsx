import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';
import { Banner__WithPicture } from 'components/Banners';
import FlexHero from 'components/Heroes/FlexHero';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { toast } from 'react-toastify';
import Center from 'components/Center';
import { default_theme } from 'eventAssets/ohsaa2021/ohsaa2021.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import BodyWrap from 'components/BodyTemplates/BodyWrap';

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = `ohsaa2021`;
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
    <Page theme={event_theme}>
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
        <Meta title={event_meta.EventJobName}> </Meta>
        <FlexHero>
          <div style={{ width: '50%', margin: 'auto' }}></div>
          <div>
            <Center>
              <h1
                style={{
                  margin: '0 auto 1rem auto',
                  width: '80%',
                  color: default_theme.palette.text.secondary,
                }}
              >
                {`OHSAA SLC \<`}
                <br />
                {`  Back to the Future`}
              </h1>
              <h2>Virtual Event </h2>
              <h3
                style={{
                  margin: 'auto',
                }}
              >
                <i>
                  <DateParse date={main_event.eventStartEnd.StartDateTime} />
                </i>
              </h3>
            </Center>
          </div>
          <div>
            <Center>
              <img
                style={{
                  maxWidth: '170px',
                  marginBottom: '1rem',
                  width: '100%',
                  height: 'auto',
                }}
                src={main_event.LogoLink[1]?.Media?.url || null}
              />
              <h4>
                <Counter__JustNumbers
                  event={main_event}
                  prefix={`Join Us Live In`}
                  afterStarted={'Live Now!'}
                  afterEnded={'Thank You for Attending'}
                />
              </h4>
            </Center>
          </div>
        </FlexHero>
        <BodyWrap>
          {main_event.streamLinks.length === 1 ? (
            <CenteredPlayer
              showing={true}
              hasStarted={true}
              videoUrl={main_event.streamLinks[0].url}
            />
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
    </Page>
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
