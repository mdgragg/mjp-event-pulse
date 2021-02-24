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
const LoginPage = ({ children, previewPassword = null }) => {
  const router = useRouter();
  const [creds, setCreds] = useState(null);

  const handleChange = (e) => {
    setCreds(e.target.value);
  };

  const handleSetPreview = () => {
    if (creds === previewPassword) {
      document.cookie = `preview=true; path=/`;
      router.push('./');
    } else {
      toast.error('wrong password');
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
