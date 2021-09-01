import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import { Banner__WithPicture } from 'components/Banners';
import FlexHero from 'components/Heroes/FlexHero';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import Chat__iFrame from 'components/iFrames/Chat__iFrame';
import TwoPanel from 'components/TabPanels/TwoPanel';
import { toast } from 'react-toastify';
import Center from 'components/Center';
import { default_theme } from 'eventAssets/highholydays2021/theme.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import Agenda from 'eventAssets/highholydays2021/Agenda';
import { Section } from 'components/Sections';
import { BoxedCounter } from 'components/Counters';
import PreviousVideos from 'eventAssets/highholydays2021/PreviousVideos';

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = 'highholydays2021';

const Index = (props) => {
  const router = useRouter();

  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: null,
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
        <FlexHero title={event_meta.EventJobName}>
          <div>
            <BoxedCounter event={main_event} prefix={`Join Us Live In`} />
          </div>
          <div>
            <Center>
              <img
                style={{
                  width: '100%',
                  maxWidth: '350px',
                  margin: '2rem auto',
                }}
                src={main_event.LogoLink[0]?.Media?.url || null}
              />
              <h1>{main_event.EventName}</h1>
            </Center>
          </div>
          <div>
            <Center>
              <h2 style={{ margin: 'auto' }}>
                <i>
                  <DateParse date={main_event.eventStartEnd.StartDateTime} />
                </i>
              </h2>
            </Center>
          </div>
        </FlexHero>
        <Body>
          <div
            style={{
              width: '95%',
              minHeight: '60vh',
              backgroundColor: 'none',
              margin: '2rem auto',
              maxWidth: '1920px',
            }}
          >
            <PlayerWithChat
              children={null}
              hasStarted={true}
              videoUrl={main_event.streamLinks[0].url}
              chatUrl={main_event.streamLinks[1].url}
              chatComponent={
                <TwoPanel
                  data={[
                    // {
                    //   title: 'Chat',
                    //   content: (
                    //     <Chat__iFrame src={main_event.streamLinks[1].url} />
                    //   ),
                    // },
                    { title: 'Agenda', content: <Agenda /> },
                  ]}
                />
              }
            />
          </div>
          <Section>
            <PreviousVideos links={main_event.streamLinks} />
          </Section>
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
        </Body>
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
