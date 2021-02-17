import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/template1/Page';
import LoginPage from 'components/globals/Login/LoginPage';
const Login = (props) => {
  return (
    <Page>
      <p>Please log in to view this event</p>
      <LoginPage />
    </Page>
  );
};

Login.propTypes = {};

export default Login;
