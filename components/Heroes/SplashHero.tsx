import React from 'react'
import Link from 'next/link'
import { bob } from 'src/styles/animations'
import styled from 'styled-components'
import { ArrowDownward, ArrowDropDownCircle } from '@material-ui/icons'

const StyledSplash = styled.div`
  background: ${(props) => props.theme.palette.background.secondary};
  height: 100vh;
`

const Inner = styled.div`
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  && .icon {
    font-size: 4rem;
    color: ${(props) => props.theme.palette.text.secondary};
    cursor: pointer;
    animation: ${bob} 2s infinite;
  }
`
const SplashHero = ({ children, anchorLink }) => {
  return (
    <StyledSplash>
      <Inner>
        {children}
        <Link href={anchorLink}>
          <ArrowDropDownCircle className="icon" />
        </Link>
      </Inner>
    </StyledSplash>
  )
}

SplashHero.propTypes = {}

export default SplashHero
