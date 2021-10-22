import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Button } from '@material-ui/core'
import MJxTheme from 'types/Theme'

const ButtonArea = ({ main_event }) => {
  const theme: MJxTheme = useContext(ThemeContext)
  return (
    <div>
      <Button variant="contained">Donate Now</Button>
      <Button variant="contained">Learn More</Button>
    </div>
  )
}

export default ButtonArea
