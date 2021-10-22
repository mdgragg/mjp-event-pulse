import styled from 'styled-components'
import React from 'react'
import { Button__Primary } from '../Buttons'
import { Typography, FormControl, Button, Input } from '@material-ui/core'

const StyledBanner = styled.div`
  height: auto;
  padding: 4em 0;
  display: flex;
  flex-direction: space-around;
  align-items: center;
  justify-content: center;

  width: 100%;
  left: 0;
  background-color: ${(props) => props.color || props.theme.colors.primary};
  /* background-image: url('${(props) => props.image}'); */
  background-attachment: fixed;
  background-origin: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-top: -5px;

  && .banner-image {
    width: 80%;
    max-width: 420px;
    margin: 2rem auto;
    display: block;
  }
`

const Banner = (props) => {
  const { headerText, innerWidth, style, children, buttonText, imgUrl } = props
  return (
    <StyledBanner style={{ ...props.style }} {...props}>
      <div
        style={{ maxWidth: `${props.innerWidth || '450px'}`, margin: 'auto' }}
      >
        {headerText && <h4>{headerText}</h4>}

        <p>{props.children}</p>
        {props.buttonText && (
          <a href={props.buttonLink}>
            <Button__Primary>{props.buttonText}</Button__Primary>
          </a>
        )}
        {props.imgUrl && <img className="banner-image" src={props.imgUrl} />}
      </div>
    </StyledBanner>
  )
}

export default Banner
