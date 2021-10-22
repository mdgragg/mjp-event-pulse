import { BoxedCounter } from 'components/Counters'
import styled, { ThemeContext } from 'styled-components'
import React, { useContext } from 'react'

const StyledBefore = styled.div`
  && .text {
    text-align: center;
    margin: 3rem auto;
    text-transform: capitalize;
  }
`

const CmoBefore = ({ main_event }) => {
  const theme = useContext(ThemeContext)

  return (
    <StyledBefore>
      <div className="text">This event hasn't started yet</div>
      <BoxedCounter
        event={main_event}
        styles={{ boxColor: theme.colors.green, textColor: 'white' }}
      />
    </StyledBefore>
  )
}

export default CmoBefore
