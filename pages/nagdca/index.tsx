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
import { Box__XYCentered } from 'components/Boxes';
import { Video__StickyTop__WithCountdown } from 'components/VideoBoxes';
import { StaticResponse } from 'types/PageResponses';
import { GetStaticProps } from 'next';

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
          <div
            style={{
              width: '40%',
              margin: '1rem auto',
              padding: '4% 0',
              backgroundColor: event_theme.colors.primary,
            }}
          >
            <img
              style={{ position: 'relative' }}
              src={main_event.LogoLink[0].Media.url}
            />
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
        <SolidColorHero color={event_theme.colors.primary}>
          <FlexHero columns={`25% 50% 25%`}>
            <div>
              <img
                style={{
                  maxWidth: '100px',
                }}
                src={main_event.LogoLink[0]?.Media?.url || null}
              />
            </div>
            <div>
              <h1>{main_event.EventName}</h1>
              <h4>
                <DateParse date={main_event.eventStartEnd.StartDateTime} />
              </h4>
            </div>

            <BoxedCounter
              styles={{
                textColor: event_theme.colors.primary,
                boxColor: event_theme.colors.white,
              }}
              event={main_event}
              prefix={<h2>Join Us Live In:</h2>}
            />
          </FlexHero>
        </SolidColorHero>
        <FullPage__SolidColor color={'#f7f7f7'}>
          <Box__XYCentered minHeight={'100%'}>
            <div
              style={{ maxWidth: '900px', width: '95%', margin: '3rem auto' }}
            >
              <Video__StickyTop__WithCountdown
                showMinutesBefore={10}
                start={main_event.eventStartEnd.StartDateTime}
                src={main_event.streamLinks[0].url}
                showBefore={
                  <BoxedCounter
                    styles={{
                      textColor: event_theme.colors.primary,
                      boxColor: event_theme.colors.white,
                    }}
                    event={main_event}
                    prefix={
                      <>
                        <h2>This Event Hasn't Started Yet</h2>
                        <h4>Join Us Live In:</h4>
                      </>
                    }
                  />
                }
              />
            </div>
          </Box__XYCentered>

          {/* <div style={{ width: '100%', textAlign: 'center' }}>
            <img
              style={{ margin: '0 auto 3rem', maxWidth: '800px' }}
              src={main_event?.HeaderImage?.url}
              alt="nationwide does the right things at the right time"
            />
          </div> */}

          <Banner__WithPicture
            imgUrl={main_event.LogoLink[0]?.Media?.url || null}
            color={event_theme.colors.primary}
            secondary={`white`}
            headerText={null}
            innerWidth={`650px`}
            buttonText={null}
            buttonLink={main_event.LogoLink[0]?.Link || '#'}
            style={{ height: '400px' }}
          ></Banner__WithPicture>
        </FullPage__SolidColor>
      </AuthWrap>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  const returnObj: StaticResponse = {
    props: {
      event_meta: event_data,
      main_event,
    },
    revalidate: 300,
  };

  return returnObj;
};

export default Index;
