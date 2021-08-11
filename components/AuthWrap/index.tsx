import styled from 'styled-components';
import React, { useContext, useEffect } from 'react';
import useSessionToken from 'hooks/useSessionToken';
import { AuthModalProps, AuthWrapProps } from './AuthWrap__Types';
import {
  AuthModal__AttendeeCapture,
  AuthModal__Password,
  AuthModal__Email,
  AuthModal__AttendeeList,
} from './Modals';
import { tokenGenerator } from 'lib/helpers';
import { AppContext } from 'context/AppContext';
import { Modal } from '@material-ui/core';

const StyledAuthWrap = styled.div`
  filter: blur(0px);
  &&.blurred {
    filter: blur(18px);
  }
`;

const AuthWrap = (props: AuthWrapProps) => {
  const {
    children,
    title,
    eventToCheck,
    successCallback = () => {},
    // this is to tell the child it has authorized
    options = [],
    signInText = null,
    headerContent = null,
    otherFields,
  } = props;

  const authType = eventToCheck.AuthOptions.AuthorizationType;

  const [hasToken, handleSetToken] = useSessionToken(
    tokenGenerator(eventToCheck)
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

  const handleCallback = (res: Object): void => {
    handleSetToken('true');
    successCallback(res);
  };

  const ModalProps: AuthModalProps = {
    title,
    eventToCheck,
    successCallback: handleCallback,
    signInText,
    headerContent,
    otherFields,
    open: hasAuth,
  };

  // ================= RETURN AREA ===================== //

  if (authType === 'Public') {
    return <>{children}</>;
  }
  if (authType === 'AttendeeFromList') {
    if (options.includes('emailOnly')) {
      return (
        <>
          <AuthModal__Email {...ModalProps} />
          <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
            {children}
          </StyledAuthWrap>
        </>
      );
    }
    return (
      <>
        <AuthModal__AttendeeList {...ModalProps} />
        <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
          {children}
        </StyledAuthWrap>
      </>
    );
  }
  if (authType === 'PasswordProtected') {
    return (
      <>
        <AuthModal__Password {...ModalProps} />
        <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
          {children}
        </StyledAuthWrap>
      </>
    );
  }
  if (authType === 'CaptureNewAttendees') {
    return (
      <>
        <AuthModal__AttendeeCapture {...ModalProps} />
        <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
          {children}
        </StyledAuthWrap>
      </>
    );
  }
};

export default AuthWrap;
