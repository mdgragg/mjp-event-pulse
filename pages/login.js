import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/PageTemplates';
import LoginPage from 'components/globals/Login/LoginPage';
const Login = (props) => {
  return (
    <Page>
      <LoginPage />
    </Page>
  );
};

Login.propTypes = {};

export default Login;

export async function getServerSideProps(ctx) {
  return {
    props: {},
  };
}
