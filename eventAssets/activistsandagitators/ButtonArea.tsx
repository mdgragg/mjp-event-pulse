import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import MJxTheme from 'types/Theme'

const Button = styled.div`
  && .text {
    text-align: center;
    margin: 3rem auto;
    text-transform: capitalize;
  }
`

const ButtonArea = ({ main_event }) => {
  const theme: MJxTheme = useContext(ThemeContext)
  return (
    <div>
      <Button>
        <div className="text">Button</div>
      </Button>
    </div>
  )
}

export default ButtonArea
