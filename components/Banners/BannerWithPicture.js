import styled from 'styled-components';
import React from 'react';
import { Typography, FormControl, Button, Input } from '@material-ui/core';

const StyledBanner = styled.div`
  height: auto;
  padding: 4em 0;
  display: flex;
  flex-direction: space-around;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  left: 0;
  background-color: ${(props) => props.color || '#f7f7f7'};
  /* background-image: url('${(props) => props.image}'); */
  background-attachment: fixed;
  background-origin: center;
  background-repeat: no-repeat;
  && h4 {
    font-size: 2.5rem;
    color: ${(props) => props.textColor || 'black'};
  }
  && p {
    font-size: 1.5rem;
    color: ${(props) => props.textColor || 'black'};
  }
  && .banner-image {
    width: 80%;
    max-width: 450px;
    margin: 2rem auto;
    display: block;
  }
`;

const Banner = (props) => {
  return (
    <StyledBanner style={{ ...props.style }} {...props}>
      <div
        style={{ maxWidth: `${props.innerWidth || '450px'}`, margin: 'auto' }}
      >
        <h4>{props.headerText}</h4>

        <p>{props.children}</p>
        {props.buttonText && (
          <a href={props.buttonLink}>
            <button className="btn"> {props.buttonText}</button>
          </a>
        )}
        {props.imgUrl && <img className="banner-image" src={props.imgUrl} />}
      </div>
    </StyledBanner>
  );
};

export default Banner;
