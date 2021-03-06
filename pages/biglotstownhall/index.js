import { useContext } from 'react';
import { useCalculateIfStarted } from 'hooks';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import LandingPage from 'eventAssets/biglotstownhall/LandingPage';
import MainPage from 'eventAssets/biglotstownhall/MainPage';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import { AppContext } from 'context/AppContext';
import { toast } from 'react-toastify';
import AuthWrap from 'components/AuthWrap';
import event_theme from 'eventAssets/biglots/theme.theme';

export const EVENT_URL = 'biglotstownhall';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const { event_meta, main_event } = props;

  var theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStartEnd = useCalculateIfStarted(main_event);

  const {
    state: { hasAuth },
  } = useContext(AppContext);

  return (
    <Page theme={theme}>
      <AuthWrap
        eventToCheck={main_event}
        title={
          <>
            Please sign in to join
            <br />
            <strong> Big Lots' Q2 Virtual Town Hall</strong>
          </>
        }
        callback={(creds) => {
          toast.success(
            `Hello ${
              creds.Attendee.AttendeeFirst ? creds.Attendee.AttendeeFirst : ''
            }, welcome to Big Lots Q1 Virtual Town Hall`
          );
        }}
        options={['emailOnly']}
        signInText={
          <div
            style={{
              textAlign: 'left',
              maxWidth: '450px',
              margin: '1rem 4rem',
            }}
          >
            <p>
              Enter your Big Lots email address in the form of your unique
              <strong> associateID@biglots.com </strong> <br />
              (ex. 1234567@biglots.com) .
            </p>
            <p>
              Contact Joey D'Amico at{' '}
              <a href="mailto:jdamico@biglots.com">jdamico@biglots.com </a> if
              you experience any technical issues.
            </p>
          </div>
        }
        headerContent={
          <img
            style={{
              height: 'auto',
              width: '90%',
              maxWidth: '100px',
              padding: '1rem',
            }}
            src={main_event.LogoLink[1].Media.url}
          />
        }
      >
        <Meta title={event_meta.EventJobName}> </Meta>
        <Body>
          <MainPage
            main_event={main_event}
            hasStartEnd={hasStartEnd}
            hasAuth={hasAuth}
          />
          {/* <LandingPage main_event={main_event} /> */}
        </Body>
      </AuthWrap>
    </Page>
  );
};

export async function getStaticProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
    },
    revalidate: 300,
  };
}

export default Index;
