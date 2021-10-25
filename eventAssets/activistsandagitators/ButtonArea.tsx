import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Button } from '@material-ui/core'
import MJxTheme from 'types/Theme'
import { Button__Primary, Button__Secondary } from 'components/Buttons'

const Wrap = styled.div`
  div {
    text-align: center;
  }
  .button {
    margin: 1rem;

    max-width: 300px;
    width: 100%;
    color: white;
  }
`

const ButtonArea = ({ main_event }) => {
  const theme: MJxTheme = useContext(ThemeContext)
  return (
    <Wrap>
      <div className="buttons">
        <a
          href="https://www.ywcacolumbus.org/get-involved/donate-now/donate-now-activists-and-agitators/"
          target="_blank"
        >
          <Button__Primary className="button">Donate Now</Button__Primary>
        </a>
      </div>
    </Wrap>
  )
}

export default ButtonArea
