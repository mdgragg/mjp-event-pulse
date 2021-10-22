import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../template1/Page';
import LoginBox from '.';
import styled from 'styled-components';

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
const LoginPage = ({ children }) => {
  return (
    <PageWrap>
      {children}
      <LoginBox />
    </PageWrap>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
