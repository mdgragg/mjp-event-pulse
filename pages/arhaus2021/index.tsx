import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import FlexHero from 'components/Heroes/FlexHero';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { toast } from 'react-toastify';
import Center from 'components/Center';
import { default_theme } from 'eventAssets/arhaus2021/theme.theme';
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';

const PLACEHOLD = 'https://placehold.co/';
const EVENT_URL = 'arhaus2021';
const Index = (props) => {
  const router = useRouter();

  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const {
    setAuth,
    state: { hasAuth },
  } = useContext(AppContext);

  return (
    <Page theme={event_theme}>
      <AuthWrap
        headerContent={
          <div>
            <img
              style={{
                width: '100%',
                maxWidth: '370px',
                margin: '0rem auto',
              }}
              src={main_event.LogoLink[1]?.Media?.url || null}
            />
          </div>
        }
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
            <Center>
              <div>
                <h1>Virtual Store Event</h1>
                <h2 style={{ margin: 'auto' }}>
                  <i>
                    <DateParse date={main_event.eventStartEnd.StartDateTime} />
                  </i>
                </h2>
              </div>
            </Center>
          </div>
          <div>
            <img
              style={{
                width: '100%',
                maxWidth: '270px',
                margin: '2rem auto',
              }}
              src={main_event.LogoLink[0]?.Media?.url || null}
            />
          </div>
          <div>
            <Center>
              <h2>
                <Counter__JustNumbers
                  event={main_event}
                  afterStarted={'Live Now!'}
                  afterEnded={'Thank You for Attending'}
                />
              </h2>
            </Center>
          </div>
        </FlexHero>
        <Body>
          {main_event.streamLinks.length > 0 && (
            <div
              style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <CenteredPlayer
                showing={hasAuth}
                hasStarted={true}
                videoUrl={main_event.streamLinks[0].url}
              />
            </div>
          )}
        </Body>
      </AuthWrap>
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  try {
    let event_data = await getEventMeta(EVENT_URL);
    let main_event = event_data.events.filter(
      (ev) => ev.isMainEvent === true
    )[0];
    let return_object;

    switch (event_data.eventStatus.EventStatus) {
      case 'Preview':
        if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] !== 'true') {
          return_object = {
            redirect: {
              destination: `${EVENT_URL}/preview`,
              permanent: false,
            },
          };
        } else {
          return_object = {
            props: { event_meta: event_data, main_event },
          };
        }
        break;
      case 'Ended':
        return_object = {
          redirect: {
            destination: `${EVENT_URL}/thank-you`,
            permanent: false,
          },
        };
        break;
      case 'Live':
        return_object = {
          props: {
            //meta will be the props for the event
            event_meta: event_data,
            main_event,
          },
        };
        break;
      default:
        return_object = {
          redirect: {
            destination: `/`,
            permanent: false,
          },
          // revalidate: 600,
        };
    }

    return return_object;
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
