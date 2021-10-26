import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeContext } from 'styled-components'
import { BoxedCounter } from 'components/Counters'
import MJxTheme from 'types/Theme'
import Center from 'components/Center'

const CounterArea = styled.div`
  @media all and (max-width: 768px) {
    display: none;
  }
`

const Fintech_Before = ({ main_event }) => {
  const theme: MJxTheme = useContext(ThemeContext)
  return (
    <div style={{ width: '50%' }}>
      <Center>
        <img
          src={main_event.LogoLink[0].Media.url}
          style={{ margin: '2rem auto' }}
        />
        <i>
          <p style={{ color: theme.muiTheme.palette.grey[400] }}>
            This event has not started yet, please check back soon.
          </p>
        </i>
        <CounterArea className="counter">
          <BoxedCounter
            event={main_event}
            styles={{ boxColor: theme.colors.red, textColor: 'white' }}
          />
        </CounterArea>
      </Center>
    </div>
  )
}

Fintech_Before.propTypes = {}

export default Fintech_Before
