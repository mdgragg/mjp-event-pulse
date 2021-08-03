import styled from 'styled-components';
import React, { useEffect } from 'react';
import useHasAuthorized from '../hooks/useHasAuthorized';
import {
  AuthModal__AttendeeCapture,
  AuthModal__Password,
  AuthModal__Email,
  AuthModal__AttendeeList,
} from 'components/Modals/';
import { token_generator } from '../lib/helpers';

const Wrap = styled.div`
  filter: blur(0px);
  &&.blurred {
    filter: blur(18px);
  }
`;

const AuthWrap = ({
  children,
  title,
  className,
  event_to_check,
  callback = () => {},
  render = () => {},
  options = [],
  signInText = null,
  headerContent = null,
  otherFields = {},
}) => {
  const auth_type = event_to_check.AuthOptions.AuthorizationType;

  const [hasAuthorized, setHasAuthorized] = useHasAuthorized(
    token_generator(event_to_check)
  );

  useEffect(() => {
    console.log('use effect from auth wrap: ', hasAuthorized);
    render(hasAuthorized);
  }, [hasAuthorized]);

  const handleCallback = (res) => {
    setHasAuthorized(true);
    callback(res);
  };
  // ================= RETURN AREA ===================== //

  if (auth_type === 'Public') {
    render(true);
    return <>{children}</>;
  }
  if (auth_type === 'AttendeeFromList') {
    if (options.includes('emailOnly')) {
      return (
        <>
          <AuthModal__Email
            otherFields={otherFields}
            title={title}
            event_meta={event_to_check}
            event_name={event_to_check.EventName}
            open={!hasAuthorized}
            callback={handleCallback}
            signInText={signInText}
            headerContent={headerContent}
          />
          <Wrap className={hasAuthorized ? '' : 'blurred'}>{children}</Wrap>
        </>
      );
    }
    return (
      <>
        <AuthModal__AttendeeList
          otherFields={otherFields}
          event_meta={event_to_check}
          event_name={event_to_check.EventName}
          open={!hasAuthorized}
          callback={handleCallback}
          signInText={signInText}
          headerContent={headerContent}
        />
        <Wrap className={hasAuthorized ? '' : 'blurred'}>{children}</Wrap>
      </>
    );
  }
  if (auth_type === 'PasswordProtected') {
    return (
      <>
        <AuthModal__Password
          otherFields={otherFields}
          event_meta={event_to_check}
          event_name={event_to_check.EventName}
          open={!hasAuthorized}
          callback={handleCallback}
          signInText={signInText}
          headerContent={headerContent}
        />
        <Wrap className={hasAuthorized ? '' : 'blurred'}>{children}</Wrap>
      </>
    );
  }
  if (auth_type === 'CaptureNewAttendees') {
    return (
      <>
        <AuthModal__AttendeeCapture
          title={title}
          otherFields={otherFields}
          event_meta={event_to_check}
          event_name={event_to_check.EventName}
          open={!hasAuthorized}
          callback={handleCallback}
          signInText={signInText}
          headerContent={headerContent}
        />
        <Wrap className={hasAuthorized ? '' : 'blurred'}>{children}</Wrap>
      </>
    );
  }
};

export default AuthWrap;
