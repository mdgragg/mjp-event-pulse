import {
  AuthModal__AttendeeListRegister,
  AuthModal__Register,
} from 'components/AuthWrap/Modals'
import { Button__Primary } from 'components/Buttons'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const StyledBanner = styled.div`
  background-color: ${(props) => props.theme.colors.blue};
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  && button {
    background-color: white;
    color: ${(props) => props.theme.colors.blue};
    padding: 1rem 3rem;
  }
`

const StyledTitle = styled.div`
  font-size: clamp(1rem, 5vw, 3.5rem);
  color: white;
  margin: 1rem auto;
  text-align: center;
`
const CmoRegisterBanner = ({ main_event, theme }) => {
  const [registerOpen, setRegisterOpen] = useState(false)
  return (
    <StyledBanner>
      <StyledTitle>Stay In Touch, Register Today</StyledTitle>
      <Button__Primary onClick={() => setRegisterOpen(true)}>
        Register
      </Button__Primary>
      <AuthModal__Register
        allowClose
        setOpen={setRegisterOpen}
        emailOptions={{
          url: `https://mjvirtualevents.com/cmosummit2021`,
        }}
        eventToCheck={main_event}
        successCallback={() => toast.success('Success')}
        theme={theme}
        open={registerOpen}
        otherFields={{
          Company: {
            displayName: 'Company',
            required: true,
            value: '',
          },
          Title: {
            displayName: 'Title',
            required: true,
            value: '',
          },
        }}
      />
    </StyledBanner>
  )
}

export default CmoRegisterBanner
