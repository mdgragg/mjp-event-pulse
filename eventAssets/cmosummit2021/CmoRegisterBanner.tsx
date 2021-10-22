import { AuthModal__AttendeeListRegister } from 'components/AuthWrap/Modals'
import { Button__Primary } from 'components/Buttons'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const StyledBanner = styled.div`
  background-color: blue;
  min-height: 450px;
`
const CmoRegisterBanner = ({ main_event, theme }) => {
  const [registerOpen, setRegisterOpen] = useState(false)
  return (
    <StyledBanner>
      <Button__Primary>Register</Button__Primary>
      <AuthModal__AttendeeListRegister
        eventToCheck={main_event}
        successCallback={() => toast.success('Success')}
        theme={theme}
        open={registerOpen}
      />
    </StyledBanner>
  )
}

export default CmoRegisterBanner
