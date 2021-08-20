import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import Center from 'components/Center';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import { FullPage__SolidColor } from 'components/BodyTemplates';
import {
  Banner__ImgBg,
  Banner__JustImage,
  Banner__WithPicture,
} from 'components/Banners';
import { FlexHero, SolidColorHero } from 'components/Heroes';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { toast } from 'react-toastify';
import { default_theme } from 'eventAssets/nagdca/theme.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import { BoxedCounter } from 'components/Counters';

const PLACEHOLD = 'https://placehold.co/';
const EVENT_URL = `nagdca`;

const Index = (props) => {
  const router = useRouter();

  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
  };

  const hasStarted = useCalculateIfStarted(main_event);
  const [auth, setAuth] = useState(false);

  return (
    <Page theme={event_theme}>
      <AuthWrap
        headerContent={
          <div style={{ width: '120px', margin: '1rem auto' }}>
            <img src={main_event.LogoLink[0].Media.url} />
          </div>
        }
        otherFields={{
          Company: {
            displayName: 'Company',
            value: '',
            required: true,
          },
        }}
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
        <SolidColorHero color={event_theme.colors.tertiary}>
          <FlexHero>
            <div>
              <img
                style={{
                  maxWidth: '180px',
                  backgroundColor: 'white',
                  padding: '25px',
                  borderRadius: '30px',
                }}
                src={main_event.LogoLink[0]?.Media?.url || null}
              />
            </div>
            <div>
              <h1>{main_event.EventName}</h1>
            </div>
            <div>
              <Center>
                <BoxedCounter
                  event={main_event}
                  prefix={<h2>Join Us Live In:</h2>}
                />
              </Center>
            </div>
          </FlexHero>
        </SolidColorHero>
        <FullPage__SolidColor color={'#f7f7f7'}>
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
          <Banner__JustImage imgSrc={main_event?.HeaderImage?.url} />

          <Banner__WithPicture
            imgUrl={main_event.LogoLink[0]?.Media?.url || null}
            color={'white'}
            secondary={`white`}
            headerText={`About This Event`}
            innerWidth={`650px`}
            buttonText={`Learn More`}
            buttonLink={main_event.LogoLink[0]?.Link || '#'}
          >
            Hello world.
          </Banner__WithPicture>
        </FullPage__SolidColor>
      </AuthWrap>
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  try {
    return await GET_SERVERSIDE_PROPS_DEFAULT(ctx, EVENT_URL);
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
