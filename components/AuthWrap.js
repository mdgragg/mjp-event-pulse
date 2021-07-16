import styled from 'styled-components';
import React, { useEffect } from 'react';
import useHasAuthorized from '../hooks/useHasAuthorized';
import AttendeeList from 'components/Modals/AuthModal__AttendeeList';
import AttendeeList__EmailOnlyModal from 'components/Modals/AuthModal__EmailOnly';
import PasswordAuthModal from 'components/Modals/AuthModal__Password';
import { AuthModal__AttendeeCapture } from 'components/Modals/';
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
          <AttendeeList__EmailOnlyModal
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
        <AttendeeList
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
        <PasswordAuthModal
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
