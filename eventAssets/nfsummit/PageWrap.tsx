import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';
import { Banner__WithPicture } from 'components/Banners';
import { FlexHero, SolidColorHero } from 'components/Heroes';
import DateParse from 'components/__Assets__/DateParse';
import { toast } from 'react-toastify';
import { default_theme } from './nfsummit.theme';
import { BoxedCounter } from 'components/Counters';

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
            }}
          >
            <img
              style={{ width: '80%', maxWidth: '300px' }}
              src={main_event?.LogoLink[1]?.Media?.url}
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
        otherFields={{
          Company: {
            displayName: 'Company',
            value: '',
            required: true,
          },
        }}
        successCallback={(res) => {
          toast.success(
            `Hello ${
              res.Attendee.AttendeeFirst ? res.Attendee.AttendeeFirst : ''
            }, welcome to ${main_event.EventName}`
          );
        }}
      >
        <Meta title={title ? title : event_meta.EventJobName}> </Meta>
        <SolidColorHero color={event_theme.colors.primary}>
          <FlexHero columns={`20% 60% 20%`}>
            <div>
              <img
                style={{
                  maxWidth: '120px',
                }}
                src={main_event.LogoLink[0]?.Media?.url || null}
              />
            </div>
            <div>
              <h1>{title ? title : main_event.EventName}</h1>
              <h3>
                <DateParse date={main_event.eventStartEnd.StartDateTime} />
              </h3>
            </div>
            <div>
              <BoxedCounter
                styles={{
                  textColor: event_theme.colors.primary,
                  boxColor: event_theme.colors.white,
                }}
                event={main_event}
                prefix={`Join Us Live In`}
              />
            </div>
          </FlexHero>
        </SolidColorHero>
        {/* <FullPage__SolidColor color={`#f7f7f7`}> */}
        {children && children}
        {/* </FullPage__SolidColor> */}
        <Banner__WithPicture
          imgUrl={main_event.LogoLink[0]?.Media?.url || null}
          color={event_theme.colors.primary}
          secondary={`white`}
          headerText={`Tech Issues?`}
          innerWidth={`450px`}
          buttonText={null}
          buttonLink={main_event.LogoLink[0]?.Link || '#'}
          style={{ height: '600px', marginTop: '6rem', color: 'white' }}
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
