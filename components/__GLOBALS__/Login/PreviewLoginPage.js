import React, { useState } from 'react';
import ThemedPage from '../ThemedPage';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button__Primary } from 'components/Buttons';
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
} from '@material-ui/core';
const PageWrap = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #181818;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  && p {
    font-size: 1.5rem;
  }

  && button {
    width: 200px;
    margin: 1rem auto;
    margin-top: 1rem;
    display: block;
  }
`;
const LoginPage = ({ children, redirect = './', EVENT_URL = '' }) => {
  const router = useRouter();
  const [creds, setCreds] = useState(null);

  const handleChange = (e) => {
    setCreds(e.target.value);
  };
  // redirect = redirect + EVENT_URL;

  const handleSetPreview = async () => {
    console.log(creds);
    await fetch('/api/validate_preview_password', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        pw: creds,
        event_url: EVENT_URL,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          return toast.error('Bad Password');
        }
        setTimeout(() => {
          router.push(redirect);
        }, 2000);
        return toast.success(`Redirecting to: ${redirect}`);
      })
      .catch((err) => toast.error('errrrr', err));
  };
  return (
    <ThemedPage>
      <PageWrap>
        <Card style={{ padding: '1rem', minHeight: '350px' }}>
          <CardHeader
            title={`Preview Password`}
            subheader={`This page requires a preview password`}
          />
          <CardContent style={{ paddingTop: '50%' }}>
            <FormControl variant={`standard`} color={`primary`}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                onChange={handleChange}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSetPreview();
                  }
                }}
              />
            </FormControl>
          </CardContent>
          <Button__Primary onClick={handleSetPreview}>Submit</Button__Primary>
        </Card>

        {children}
      </PageWrap>
    </ThemedPage>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
