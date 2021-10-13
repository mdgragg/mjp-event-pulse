import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';
import { Banner__WithPicture } from 'components/Banners';
import { FlexHero, SolidColorHero } from 'components/Heroes';
import DateParse from 'components/__Assets__/DateParse';
import { toast } from 'react-toastify';
import { default_theme } from './nfsummit.theme';
import { BoxedCounter } from 'components/Counters';
import BodyBg from 'components/BodyTemplates/Body__PictureBg';

export const EVENT_URL = `nwbattle2021`;

const PageWrap = ({ event_meta, main_event, title, children, eventToAuth }) => {
  var event_theme = {
    ...default_theme,
  };
  return (
    <Page theme={event_theme}>
      <AuthWrap
        eventToCheck={eventToAuth}
        headerContent={
          <div
            style={{
              height: 'auto',
              width: 'max-content',
              padding: '10px',
              margin: '1rem auto 0',
              backgroundColor: event_theme.colors.primary,
            }}
          >
            <img
              style={{ width: '80%', maxWidth: '80px' }}
              src={main_event?.LogoLink[0]?.Media?.url}
            />
          </div>
        }
        signInText={
          <>
            If you are having issues accessing this event, please call
            614-850-2120 or email{' '}
            <a href={`mailto:nwsupport@mjp.com`}>nwsupport@mjp.com</a>
          </>
        }
        successCallback={(res) => {
          toast.success(
            `Hello ${
              res.Attendee.AttendeeFirst ? res.Attendee.AttendeeFirst : ''
            }, welcome to ${main_event.EventName}`
          );
        }}
      >
        <Meta title={title ? title : event_meta.EventJobName}> </Meta>
        <BodyBg
          imgSrc={`https://storage.googleapis.com/mjp-stream-public/header-svg.svg`}
        >
          {children && children}
        </BodyBg>

        <Banner__WithPicture
          imgUrl={main_event.LogoLink[0]?.Media?.url || null}
          color={event_theme.colors.primary}
          secondary={`white`}
          headerText={`Tech Issues?`}
          innerWidth={`80%`}
          buttonText={null}
          buttonLink={main_event.LogoLink[0]?.Link || '#'}
          style={{ height: '600px', color: 'white' }}
        >
          <div style={{ margin: '3rem auto' }}>
            If you are having issues streaming or accessing the event, please
            call 614-850-2120 or email{' '}
            <a href={`mailto:nwsupport@mjp.com`}>nwsupport@mjp.com</a>
          </div>
        </Banner__WithPicture>
      </AuthWrap>
    </Page>
  );
};

export default PageWrap;
