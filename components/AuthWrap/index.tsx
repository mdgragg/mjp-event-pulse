import styled, { ThemeContext } from 'styled-components'
import React, { useContext, useEffect } from 'react'
import useSessionToken from 'hooks/useSessionToken'
import { AuthModalProps, AuthWrapProps } from './AuthWrap__Types'

import {
  AuthModal__AttendeeCapture,
  AuthModal__Password,
  AuthModal__Email,
  AuthModal__AttendeeList,
  AuthModal__AttendeeListRegister,
  AuthModal__Register,
} from './Modals'
import { tokenGenerator } from 'lib/helpers'
import { AppContext } from 'context/AppContext'
import AuthModal__AttendeeCapture__EmailOnly from './Modals/AuthModal__AttendeeCapture__EmailOnly'
import { toast } from 'react-toastify'

const StyledAuthWrap = styled.div`
  &&.blurred {
    position: relative;
    height: auto;
  }
  &&.blurred::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1000;
  }
`

const AuthWrap = (props: AuthWrapProps) => {
  const {
    children,
    title,
    eventToCheck,
    successCallback = () => {},
    emailOptions,
    // this is to tell the child it has authorized
    options = [],
    signInText = null,
    headerContent = null,
    otherFields,
    theme,
  } = props

  const authType = eventToCheck.AuthOptions.AuthorizationType

  const [hasToken, handleSetToken] = useSessionToken(
    tokenGenerator(eventToCheck)
  )

  const {
    setAuth,
    state: { hasAuth },
  } = useContext(AppContext)

  useEffect(() => {
    if (hasToken || authType === 'Public') {
      setAuth(true)
    }
  }, [hasToken, authType])

  const handleCallback = (res: Object): void => {
    handleSetToken('true')
    successCallback(res)
  }

  const ModalProps: AuthModalProps = {
    title,
    eventToCheck,
    successCallback: handleCallback,
    signInText,
    headerContent,
    otherFields,
    open: !hasAuth,
    theme,
  }

  // ================= RETURN AREA ===================== //

  if (authType === 'Public') {
    return <>{children}</>
  }
  if (authType === 'AttendeeFromList') {
    if (options.includes('registerOnly')) {
      return (
        <>
          <AuthModal__Register
            {...ModalProps}
            emailOptions={emailOptions}
            allowClose={false}
          />
          <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
            {children}
          </StyledAuthWrap>
        </>
      )
    }
    if (options.includes('emailOnly')) {
      return (
        <>
          <AuthModal__Email {...ModalProps} />
          <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
            {children}
          </StyledAuthWrap>
        </>
      )
    }
    return (
      <>
        <AuthModal__AttendeeList {...ModalProps} />
        <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
          {children}
        </StyledAuthWrap>
      </>
    )
  }
  if (authType === 'PasswordProtected') {
    return (
      <>
        <AuthModal__Password {...ModalProps} />
        <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
          {children}
        </StyledAuthWrap>
      </>
    )
  }
  if (authType === 'CaptureNewAttendees') {
    if (options.includes('emailOnly')) {
      return (
        <>
          <AuthModal__AttendeeCapture__EmailOnly {...ModalProps} />
          <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
            {children}
          </StyledAuthWrap>
        </>
      )
    }
    return (
      <>
        <AuthModal__AttendeeCapture {...ModalProps} />
        <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
          {children}
        </StyledAuthWrap>
      </>
    )
  }
  if (authType === 'AttendeeRegister') {
    return (
      <>
        <AuthModal__AttendeeListRegister {...ModalProps} />
        <StyledAuthWrap className={hasAuth ? '' : 'blurred'}>
          {children}
        </StyledAuthWrap>
      </>
    )
  }
}

export default AuthWrap
