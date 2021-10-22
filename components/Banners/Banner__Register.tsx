import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const MyBanner = styled.div`
  width: 100%;
  min-height: 200px;
  background-color: ${(props) => props.color};
  position: relative;
  z-index: 101;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Banner = (props) => {
  return <MyBanner {...props}>{props.children}</MyBanner>
}

export default Banner
