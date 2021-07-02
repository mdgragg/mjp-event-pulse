import { useRouter } from 'next/router';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import AttendeeAuthModal from '../../components/Modals/AttendeeAuthModal';
import MainPage from 'components/IndividualEventAssets/biglotstownhall/MainPage';
import { toast } from 'react-toastify';
import FullWrap from 'components/FullWrap';
import useHasAuthorized from 'hooks/useHasAuthorized';
import { EVENT_URL } from './index';
export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '200px',
  green: '#97d700',
  white: null,
  blue: '#1e2c60',
  red: '#b71f39',
  orange: '#FF5600',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  headerOpacity: '0.75',
  videoBreakPoint: 700,
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  buttonColor: null,
  headerFont: 'Futura Bold',
  headerFontColor: 'white',
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};

const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const session_token = EVENT_URL;

  const { event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const [hasAuthenticated, setHasAuthenticated] =
    useHasAuthorized(session_token);

  return (
    <>
      <AttendeeAuthModal
        title={
          <>
            Please Sign In to Join
            <br />
            <strong> Big Lots' Q1 Town Hall</strong>
          </>
        }
        headerContent={
          <div
            style={{
              backgroundColor: event_theme.orange,
              height: '80px',
              width: '80px',
              padding: '20px',
              margin: '1rem auto',
            }}
          >
            <img
              style={{ height: 'auto', width: '90%' }}
              src={main_event.LogoLink[0].Media.url}
            />
          </div>
        }
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
        event_meta={main_event}
        open={!hasAuthenticated}
        callback={(creds) => {
          setHasAuthenticated(true);
          toast.success(
            `Hello ${
              creds.Attendee.AttendeeFirst ? creds.Attendee.AttendeeFirst : ''
            }, Welcome to Big Lots Q1 Virtual Town Hall`
          );
        }}
      />
      <FullWrap className={!hasAuthenticated ? 'blurred' : ''}>
        <Page theme={event_theme}>
          <Meta title={event_meta.EventJobName}> </Meta>
          <Body>
            <MainPage main_event={main_event} hasAuth={hasAuthenticated} />
          </Body>
        </Page>
      </FullWrap>
    </>
  );
};
// export async function getServerSideProps(ctx) {
//   const { preview } = cookies(ctx);
//   const { hasLoggedIn } = cookies(ctx);
//   return { props: {} };
// }

export async function getStaticProps() {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
    },
    revalidate: 310,
  };
}

export default Index;
