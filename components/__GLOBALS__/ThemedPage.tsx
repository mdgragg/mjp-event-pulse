import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Footer from '../Footers'
import { mjxTheme } from './mjx.theme'
import { StylesProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

const StyledPage = styled.div`
  color: ${(props) => props.theme.fontColor};
  font-family: ${(props) => props.theme.fonts.body};
  min-height: 100vh;
  z-index: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 350px;

  background-color: ${(props) => props.theme.palette.background.primary};
  /* overflow: hidden; */

  && h1 {
    margin: 0;
    ${(props) => props.theme.typography.h1};
  }
  && h2 {
    margin: 0;
    ${(props) => props.theme.typography.h2};
  }
  && h3 {
    margin: 0;
    ${(props) => props.theme.typography.h3};
  }
  && h4 {
    margin: 0;
    ${(props) => props.theme.typography.h4};
  }
  && h5 {
    margin: 0;
    ${(props) => props.theme.typography.h5};
  }
  p {
    ${(props) => props.theme.typography.body1};
  }
  a {
    text-decoration: none;
    color: unset;
    font-weight: 600;
  }
`

export const Page = ({ theme, children, showFooter = true }) => {
  const whole_theme = { ...mjxTheme, ...theme }
  //Material ui style provider for this theme

  return (
    <CssBaseline>
      <StylesProvider injectFirst>
        <ThemeProvider theme={whole_theme}>
          <StyledPage>
            <div>{children}</div>
            {showFooter && <Footer />}
          </StyledPage>
        </ThemeProvider>
      </StylesProvider>
    </CssBaseline>
  )
}

export default Page
