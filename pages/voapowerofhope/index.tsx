import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import { HeroWithImage } from 'components/Heroes';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import Center from 'components/Center';
import { default_theme } from 'eventAssets/voapowerofhope/theme.theme';
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import { Button__Big, Button__Primary } from 'components/Buttons';
import { Video__StickyTop__WithCountdown } from 'components/VideoBoxes';
import Before from 'components/LinkBoxes/Before';

const VideoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`;

const VideoComponent = ({ main_event }) => (
  <VideoWrap>
    <Video__StickyTop__WithCountdown
      src={main_event.streamLinks[0].url}
      showMinutesBefore={30}
      showBefore={
        <Before
          main_event={main_event}
          imgSrc={main_event.LogoLink[0].Media.url}
        />
      }
    ></Video__StickyTop__WithCountdown>
    <a
      style={{ margin: 'auto' }}
      href="https://donate.voa.org/site/Donation2;jsessionid=00000000.app30102b?df_id=20451&mfc_pref=T&20451.donation=form1&NONCE_TOKEN=8A2E6B5EE8588215399173CF8A2BFAFC&bbeml=tp-QpGS3s27wkeV6N6tQZs_Ww.j2fj3QvxMVk-J5OeuZ_Isjg.rifUU2_spyEy7P6l-N34XWA.lZlZZhk8dd0qV6dY_VYz_0A"
      className="href"
    >
      <Button__Big>Yes, I believe hope can change lives</Button__Big>
    </a>
  </VideoWrap>
);

const PLACEHOLD = 'https://placehold.co/';
const EVENT_URL = 'voapowerofhope';
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
      <Meta title={event_meta.EventJobName}> </Meta>
      <HeroWithImage />
      <BodyWrap>
        <div
          style={{
            width: '90%',
            minHeight: '80vh',
            margin: '1rem auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <PlayerWithChat
            chatUrl={main_event.streamLinks[1].url}
            hasStarted={true}
            videoUrl={main_event.streamLinks[0].url}
            children={null}
            videoComponent={<VideoComponent main_event={main_event} />}
          />
        </div>
      </BodyWrap>
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
