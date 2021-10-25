import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Button } from '@material-ui/core'
import MJxTheme from 'types/Theme'
import { Button__Secondary } from 'components/Buttons'

const Wrap = styled.div`
  div {
    text-align: center;
  }
  .button {
    margin: 1rem;
    background: #ef4824;
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
        <Button
          className="button"
          variant="contained"
          href="https://www.ywcacolumbus.org/get-involved/donate-now/donate-now-activists-and-agitators/"
        >
          Donate Now
        </Button>
        <Button className="button" variant="contained" href=" ">
          Learn More
        </Button>
      </div>
    </Wrap>
  )
}

export default ButtonArea
