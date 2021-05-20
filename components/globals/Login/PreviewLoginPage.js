import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Page from '../../template1/Page';
import LoginBox from '.';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
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
  && input {
    /* height: 50px; */
    font-size: 2rem;
    text-align: center;
    padding: 0.5rem 0rem;
  }
  && input:focus {
    outline: none;
  }

  && button {
    height: 30px;
    width: 100px;
    margin: 1rem;
    margin-top: 3rem;
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
    <PageWrap>
      <p>Preview Password</p>
      <input
        type="password"
        onChange={handleChange}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSetPreview();
          }
        }}
      ></input>
      <button onClick={handleSetPreview}>Submit</button>
      {children}
    </PageWrap>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
