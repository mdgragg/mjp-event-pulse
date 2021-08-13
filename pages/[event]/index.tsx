import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import { Grid } from '@material-ui/core';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import FlexHero from 'components/Heroes/FlexHero';
import Section from 'components/template1/Section';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { toast } from 'react-toastify';
import Center from 'components/Center';
import { default_theme } from 'components/Themes/default.theme';

const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const router = useRouter();
  const EVENT_URL = router.query.event;
  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStarted = useCalculateIfStarted(main_event);
  const [auth, setAuth] = useState(false);

  return (
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
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <FlexHero title={event_meta.EventJobName}>
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
              <h1 style={{ margin: 'auto', fontSize: '3rem', width: '80%' }}>
                {main_event.EventName}
              </h1>
              <h2 style={{ margin: 'auto' }}>
                <i>
                  <DateParse date={main_event.eventStartEnd.StartDateTime} />
                </i>
              </h2>
            </Center>
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
                bgImg={null}
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
            <BannerWithPicture
              imgUrl={main_event.LogoLink[0]?.Media?.url || null}
              color={'black'}
              secondary={`white`}
              headerText={`About This Event`}
              innerWidth={`650px`}
              buttonText={`Learn More`}
              buttonLink={main_event.LogoLink[0]?.Link || '#'}
            >
              {main_event.Description}
            </BannerWithPicture>
          )}
        </Body>
      </Page>
    </AuthWrap>
  );
};

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  const EVENT_URL = ctx.params.event;

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
