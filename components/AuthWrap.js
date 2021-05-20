import styled from 'styled-components';

import React, { useEffect } from 'react';
import useHasAuthorized from '../hooks/useHasAuthorized';

import AttendeeList from 'components/Modals/AttendeeList';
import AttendeeList__EmailOnlyModal from 'components/Modals/AttendeeList__EmailOnlyModal';
import PasswordAuthModal from 'components/Modals/PasswordAuthModal';
import AttendeeAuthModal from 'components/Modals/AttendeeAuthModal';
import { toast } from 'react-toastify';
import { token_generator } from '../lib/helpers';
import { render } from 'nprogress';
const Wrap = styled.div`
  filter: blur(0px);
  &&.blurred {
    filter: blur(18px);
  }
`;

const AuthWrap = ({
  children,
  className,
  event_to_check,
  callback = () => {},
  render = () => {},
  options = [],
  signInText = null,
}) => {
  const auth_type = event_to_check.AuthOptions.AuthorizationType;

  const [hasAuthorized, setHasAuthorized] = useHasAuthorized(
    token_generator(event_to_check)
  );

  useEffect(() => {
    render(hasAuthorized);
  }, [hasAuthorized]);

  const handleCallback = (res) => {
    setHasAuthorized(true);
    callback(res);
  };

  if (auth_type === 'Public') {
    return <>{children}</>;
  }
  if (auth_type === 'AttendeeFromList') {
    if (options.includes('emailOnly')) {
      return (
        <>
          <AttendeeList__EmailOnlyModal
            event_meta={event_to_check}
            event_name={event_to_check.EventName}
            open={!hasAuthorized}
            callback={handleCallback}
            signInText={signInText}
          />

          <Wrap className={hasAuthorized ? '' : 'blurred'}>{children}</Wrap>
        </>
      );
    }
    return (
      <>
        <AttendeeList
          event_meta={event_to_check}
          event_name={event_to_check.EventName}
          open={!hasAuthorized}
          callback={handleCallback}
          signInText={signInText}
        />
        <Wrap className={hasAuthorized ? '' : 'blurred'}>{children}</Wrap>
      </>
    );
  }
  if (auth_type === 'PasswordProtected') {
    return (
      <>
        <PasswordAuthModal
          event_meta={event_to_check}
          event_name={event_to_check.EventName}
          open={!hasAuthorized}
          callback={handleCallback}
          signInText={signInText}
        />
        <Wrap className={hasAuthorized ? '' : 'blurred'}>{children}</Wrap>
      </>
    );
  }
  if (auth_type === 'CaptureNewAttendees') {
    return (
      <>
        <AttendeeAuthModal
          event_meta={event_to_check}
          event_name={event_to_check.EventName}
          open={!hasAuthorized}
          callback={handleCallback}
          signInText={signInText}
        />
        <Wrap className={hasAuthorized ? '' : 'blurred'}>{children}</Wrap>
      </>
    );
  }
};

export default AuthWrap;
