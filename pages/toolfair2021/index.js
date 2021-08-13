import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import Landing from 'eventAssets/toolfair2021/Landing';
import { toast } from 'react-toastify';
import FullWrap from 'components/FullWrap';
import useSessionToken from 'hooks/useSessionToken';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import { tokenGenerator } from '../../lib/helpers';
import CustomModal from 'eventAssets/toolfair2021/CustomModal';

export var event_theme = {
  h1: {
    fontSize: '5rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '200px',
  green: '#97d700',
  grey: '#181818',
  white: null,
  blue: '#1e2c60',
  red: '#e41936',
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

export const EVENT_URL = 'toolfair2021';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const { event_meta, main_event } = props;
  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const hasStartEnd = useCalculateIfStarted(main_event);
  const [hasToken, handlSetToken] = useSessionToken(tokenGenerator(main_event));

  return (
    <>
      {/* <CustomModal
        fields={{
          AttendeeFirst: {
            displayName: 'First Name',
            value: '',
            required: true,
          },
          AttendeeLast: {
            displayName: 'Last Name',
            value: '',
            required: true,
          },
          Company: {
            displayName: 'Distributor #',
            value: '',
            required: true,
          },
        }}
        open={!hasToken}
        headerContent={<img src={main_event.LogoLink[0].Media.url} />}
        event_meta={main_event}
        callback={(res) => {
          handlSetToken(true);
          toast.success(
            `Hello ${
              res.Attendee.AttendeeFirst ? res.Attendee.AttendeeFirst : ''
            }, welcome to ${main_event.EventName}`
          );
        }}
      /> */}
      <FullWrap>
        <Page theme={event_theme}>
          <Meta title={event_meta.EventJobName}> </Meta>
          <Body>
            <Landing
              event_meta={main_event}
              hasAuth={true}
              hasStartEnd={hasStartEnd}
            />
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

export async function getServerSideProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
    },
  };
}

export default Index;
