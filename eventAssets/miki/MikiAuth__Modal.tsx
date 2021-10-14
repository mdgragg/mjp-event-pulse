import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useSessionToken } from 'hooks';
import { tokenGenerator } from 'lib/helpers';
import { AppContext } from 'context/AppContext';
import { Button__Primary } from 'components/Buttons';
import {
  Box,
  Card,
  CardHeader,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';

const StyledBoxWrap = styled.div`
  height: 100vh;
  width: 100vw;
  border: 40px solid ${(props) => props.theme.colors.blue};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
const StyledLoginWrap = styled.div`
  background-color: white;
  border: 8px solid ${(props) => props.theme.colors.red};
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 2rem;
  align-items: center;

  && img {
    width: auto;
    display: block;
    height: 250px;
    margin: 2rem auto;
  }
`;

const StyledLoginBox = styled(Box)`
  padding: 1rem;
  max-width: 500px;
`;

const StyledInner = styled(Card)`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: auto;
  background-color: white;
  padding: 2rem;
  && input.MuiInput-input,
  && label.MuiFormLabel-root {
    text-align: center;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
  && label.MuiFormLabel-root.Mui-focused {
    margin: unset;
    left: unset;
    right: unset;
  }
  && .MuiFormHelperText-root {
    text-align: center;
  }
`;

const MikiAuth__Modal = ({ main_event }) => {
  const [hasToken, handleSetToken] = useSessionToken(
    tokenGenerator(main_event)
  );

  const { setAuth } = useContext(AppContext);

  useEffect(() => {
    if (hasToken) {
      setAuth(true);
    }
  }, [hasToken]);

  return (
    <StyledBoxWrap>
      <StyledLoginWrap>
        <div>
          <img className="logo" src={main_event.LogoLink[3].Media.url} />
          <img className="logo" src={main_event.LogoLink[2].Media.url} />
        </div>
        <StyledLoginBox>
          <StyledInner>
            <CardHeader title="Log In" style={{ textAlign: 'center' }} />
            <FormControl>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" aria-describedby="helper-text-username" />
              <FormHelperText id="helper-text-username">
                This may be your email address or another unique id.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="username">Password</InputLabel>
              <Input id="password" type="text" />
            </FormControl>

            <Button__Primary onClick={() => handleSetToken(true)}>
              Log In{' '}
            </Button__Primary>
          </StyledInner>
        </StyledLoginBox>
      </StyledLoginWrap>
    </StyledBoxWrap>
  );
};

export default MikiAuth__Modal;
