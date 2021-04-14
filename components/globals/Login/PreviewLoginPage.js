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
  && input {
    height: 50px;
    font-size: 1.5rem;
  }
  && button {
    height: 30px;
    width: 100px;
    margin: 1rem;
    margin-top: 3rem;
  }
`;
const LoginPage = ({
  children,
  previewPassword = null,
  redirect = './',
  EVENT_URL = '',
}) => {
  const router = useRouter();
  const [creds, setCreds] = useState(null);

  const handleChange = (e) => {
    setCreds(e.target.value);
  };
  // redirect = redirect + EVENT_URL;

  const handleSetPreview = () => {
    if (creds === previewPassword) {
      toast.success('Redirecting you to the preview');
      console.log(redirect);
      document.cookie = `preview_cookie__${EVENT_URL}=true; max-age=${
        60 * 60 * 24 * 365
      }; path=/`;
      setTimeout(() => {
        router.push(redirect);
      }, 1000);
    } else {
      toast.error('Wrong Password!');
    }
  };
  return (
    <PageWrap>
      <p>Password</p>
      <input type="password" onChange={handleChange}></input>
      <button onClick={handleSetPreview}>Log In</button>
      {children}
    </PageWrap>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
