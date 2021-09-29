import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import ThemedPage from 'components/__GLOBALS__/ThemedPage';
import { toast } from 'react-toastify';
import default_theme from './netjetssummit.theme';

const PLACEHOLD = 'https://placehold.co/';

const EventWrap = ({ children, eventToCheck, metaTitle }) => {
  var event_theme = {
    ...default_theme,
    header_image: eventToCheck?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  return (
    <ThemedPage theme={event_theme}>
      <AuthWrap
        eventToCheck={eventToCheck}
        successCallback={(res) => {
          toast.success(
            `Hello ${
              res.Attendee.AttendeeFirst ? res.Attendee.AttendeeFirst : ''
            }, welcome to ${eventToCheck.EventName}`
          );
        }}
      >
        <Meta title={metaTitle}>
          <title>{metaTitle}</title>
        </Meta>

        {children}
      </AuthWrap>
    </ThemedPage>
  );
};

export default EventWrap;
