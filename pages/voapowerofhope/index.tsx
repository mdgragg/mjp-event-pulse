import styled from 'styled-components';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';

import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';

import { PlayerWithChat } from 'components/BodyTemplates';
import Center from 'components/Center';
import { default_theme } from 'eventAssets/voapowerofhope/theme.theme';

import BodyWrap from 'components/BodyTemplates/BodyWrap';
import { Button__Big } from 'components/Buttons';
import { Video__StickyTop__WithCountdown } from 'components/VideoBoxes';
import VOAHeader from 'eventAssets/voapowerofhope/VoaHeader';
import VideoPlaceholder from 'eventAssets/voapowerofhope/VideoPlaceholder';
import AuthWrap from 'components/AuthWrap';
import { toast } from 'react-toastify';

const VideoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`;

const VideoComponent = ({ main_event }: any) => (
  <VideoWrap>
    <Video__StickyTop__WithCountdown
      src={main_event.streamLinks[0].url}
      start={main_event.eventStartEnd.StartDateTime}
      showMinutesBefore={30}
      showBefore={<VideoPlaceholder main_event={main_event} />}
    ></Video__StickyTop__WithCountdown>
    <a
      style={{ margin: 'auto' }}
      href="https://donate.voa.org/site/Donation2;jsessionid=00000000.app30102b?df_id=20451&mfc_pref=T&20451.donation=form1&NONCE_TOKEN=8A2E6B5EE8588215399173CF8A2BFAFC&bbeml=tp-QpGS3s27wkeV6N6tQZs_Ww.j2fj3QvxMVk-J5OeuZ_Isjg.rifUU2_spyEy7P6l-N34XWA.lZlZZhk8dd0qV6dY_VYz_0A"
      className="href"
    >
      <div style={{ marginTop: '2.5rem' }}>
        <Center>
          <p> I believe in the Power of Hope </p>
          <Button__Big>GIVE HOPE</Button__Big>
        </Center>
      </div>
    </a>
  </VideoWrap>
);

const PLACEHOLD = 'https://placehold.co/';
const EVENT_URL = 'voapowerofhope';
const Index = (props) => {
  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };
  const hasStartEnd = useCalculateIfStarted(main_event, 30);

  return (
    <Page theme={event_theme}>
      <AuthWrap
        eventToCheck={main_event}
        successCallback={(res) => {
          const a = res.message.Attendee;
          toast.success(
            `Hello ${a.AttendeeFirst}, Welcome to ${event_meta.EventJobName}!`
          );
        }}
        headerContent={
          <div
            style={{
              padding: '0.5rem',
              height: '150px',
              maxWidth: '250px',
              margin: 'auto',
            }}
          >
            <img
              style={{ width: 'auto', height: '100%' }}
              src={main_event.LogoLink[0].Media.url}
            ></img>
          </div>
        }
      >
        <Meta title={event_meta.EventJobName}> </Meta>
        <VOAHeader main_event={main_event} />
        <BodyWrap>
          <div
            id="event"
            style={{
              width: '90%',
              minHeight: '80vh',
              margin: '1rem auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {' '}
            <PlayerWithChat
              chatUrl={
                hasStartEnd.hasStarted ? main_event.streamLinks[1].url : null
              }
              hasStarted={true}
              videoUrl={main_event.streamLinks[0].url}
              children={null}
              videoComponent={<VideoComponent main_event={main_event} />}
            />
          </div>
        </BodyWrap>
      </AuthWrap>
    </Page>
  );
};

export async function getStaticProps() {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      main_event,
      event_meta: event_data,
    },
    revalidate: 300,
  };
}

export default Index;
