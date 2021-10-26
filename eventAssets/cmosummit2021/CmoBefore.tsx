import { BoxedCounter } from 'components/Counters'
import styled, { ThemeContext } from 'styled-components'
import React, { useContext } from 'react'
import MJxTheme from 'types/Theme'
import Fluid__iFrame from 'components/iFrames/Fluid__iFrame'

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

  const sizzleUrl =
    main_event.streamLinks.filter((l) => l.Service === 'Sizzle')[0]?.url ||
    `https://www.facebook.com`
  return <Fluid__iFrame src={sizzleUrl} />
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
