import styled from 'styled-components';
import React from 'react';
import { Typography, FormControl, Button, Input } from '@material-ui/core';

const StyledBanner = styled.div`
  height: 300px;
  padding: 2em;
  display: flex;
  flex-direction: space-around;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2em;
  left: 0;
  background-color: ${(props) => props.color};
  /* background-image: url('${(props) => props.image}'); */
  background-attachment: fixed;
  background-origin: center;
  background-repeat: no-repeat;
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
      <div>
        <Typography variant="h2" component="h2" style={{ color: 'white' }}>
          SIGN UP
        </Typography>
        <Typography variant="body1" component="p" style={{ color: 'white' }}>
          We only need your name and email.
        </Typography>
      </div>
      <SignUp>
        <Button>Sign Me Up</Button>
      </SignUp>

      {props.children}
    </StyledBanner>
  );
};

export default Banner;
