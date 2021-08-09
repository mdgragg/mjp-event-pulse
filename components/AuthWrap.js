import styled from 'styled-components';
import React, { useContext, useEffect } from 'react';
import useSessionToken from '../hooks/useSessionToken';
import {
  AuthModal__AttendeeCapture,
  AuthModal__Password,
  AuthModal__Email,
  AuthModal__AttendeeList,
} from 'components/Modals/';
import { token_generator } from '../lib/helpers';
import { AppContext } from 'context/AppContext';

const Wrap = styled.div`
  filter: blur(0px);
  &&.blurred {
    filter: blur(18px);
  }
`;

const AuthWrap = ({
  children,
  title,
  eventToCheck,
  successCallback = () => {},
  // this is to tell the child it has authorized

  options = [],
  signInText = null,
  headerContent = null,
  otherFields = {},
}) => {
  const authType = eventToCheck.AuthOptions.AuthorizationType;

  const [hasToken, handleSetToken] = useSessionToken(
    token_generator(eventToCheck)
  );

  const {
    setAuth,
    state: { hasAuth },
  } = useContext(AppContext);

  useEffect(() => {
    if (hasToken || authType === 'Public') {
      setAuth(true);
    }
  }, [hasToken, authType]);

  const handleCallback = (res) => {
    handleSetToken(true);
    successCallback(res);
  };
  // ================= RETURN AREA ===================== //

  if (authType === 'Public') {
    return <>{children}</>;
  }
  if (authType === 'AttendeeFromList') {
    if (options.includes('emailOnly')) {
      return (
        <>
          <AuthModal__Email
            otherFields={otherFields}
            title={title}
            event_meta={eventToCheck}
            event_name={eventToCheck.EventName}
            open={!hasAuth}
            callback={handleCallback}
            signInText={signInText}
            headerContent={headerContent}
          />
          <Wrap className={hasAuth ? '' : 'blurred'}>{children}</Wrap>
        </>
      );
    }
    return (
      <>
        <AuthModal__AttendeeList
          otherFields={otherFields}
          event_meta={eventToCheck}
          event_name={eventToCheck.EventName}
          open={!hasAuth}
          callback={handleCallback}
          signInText={signInText}
          headerContent={headerContent}
        />
        <Wrap className={hasAuth ? '' : 'blurred'}>{children}</Wrap>
      </>
    );
  }
  if (authType === 'PasswordProtected') {
    return (
      <>
        <AuthModal__Password
          otherFields={otherFields}
          event_meta={eventToCheck}
          event_name={eventToCheck.EventName}
          open={!hasAuth}
          callback={handleCallback}
          signInText={signInText}
          headerContent={headerContent}
        />
        <Wrap className={hasAuth ? '' : 'blurred'}>{children}</Wrap>
      </>
    );
  }
  if (authType === 'CaptureNewAttendees') {
    return (
      <>
        <AuthModal__AttendeeCapture
          title={title}
          otherFields={otherFields}
          event_meta={eventToCheck}
          event_name={eventToCheck.EventName}
          open={!hasAuth}
          callback={handleCallback}
          signInText={signInText}
          headerContent={headerContent}
        />
        <Wrap className={hasAuth ? '' : 'blurred'}>{children}</Wrap>
      </>
    );
  }
};

export default AuthWrap;
