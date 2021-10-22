import { BoxedCounter } from 'components/Counters'
import styled, { ThemeContext } from 'styled-components'
import React, { useContext } from 'react'
import MJxTheme from 'types/Theme'

const StyledBefore = styled.div`
  text-align: center;
  && .logo {
    max-width: 150px;
    margin: auto;
  }
  && .text {
    margin: 3rem auto;
    text-transform: capitalize;
  }
  @media all and (max-width: 800px) {
    max-width: 96vw;
    && .logo {
      width: 50%;
    }
    && .counter {
      display: none;
    }
    && .text {
      margin: 1rem auto;
      font-size: 1rem;
    }
  }
`

const CmoBefore = ({ main_event }) => {
  const theme: MJxTheme = useContext(ThemeContext)

  return (
    <StyledBefore>
      <img className="logo" src={main_event.LogoLink[0].Media.url} />
      <div className="text">This event hasn't started yet.</div>

      <BoxedCounter
        className="counter"
        event={main_event}
        styles={{ boxColor: theme.colors.green, textColor: 'white' }}
      />
    </StyledBefore>
  )
}

export default CmoBefore
