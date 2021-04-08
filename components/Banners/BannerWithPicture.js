import styled from 'styled-components';
import React from 'react';
import { Typography, FormControl, Button, Input } from '@material-ui/core';

const StyledBanner = styled.div`
  height: auto;
  padding: 2em;
  display: flex;
  flex-direction: space-around;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  left: 0;
  background-color: ${(props) => props.color};
  /* background-image: url('${(props) => props.image}'); */
  background-attachment: fixed;
  background-origin: center;
  background-repeat: no-repeat;

  && .banner-image {
    width: 80%;
    max-width: 450px;
    margin: 2rem auto;
    display: block;
  }
`;
const SignUp = styled.div`
  margin-left: 50px;
  margin-top: -20px;
`;

const MyInput = styled(Input)`
  margin: 10px;
  .MuiInput-root {
    border-bottom: 1px solid white;
  }
  .MuiInput-input {
    color: white;
    border-bottom: 1px solid white;
    text-align: center;
  }
  .MuiInput-underline {
    color: orange;
  }
`;

const Banner = (props) => {
  return (
    <StyledBanner image={props.image} color={props.color}>
      <div
        style={{ maxWidth: `${props.innerWidth || '450px'}`, margin: 'auto' }}
      >
        <Typography
          variant="h4"
          component="h4"
          style={{ color: props.secondary, fontWeight: '800' }}
        >
          {props.headerText}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          style={{
            color: props.secondary,
            fontSize: '1.25rem',
            marginTop: '1rem',
          }}
        >
          {props.children}
          <img className="banner-image" src={props.imgUrl} />
        </Typography>
      </div>
    </StyledBanner>
  );
};

export default Banner;
