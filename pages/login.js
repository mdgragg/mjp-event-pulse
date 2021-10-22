import React from 'react';
import Page from 'components/PageTemplates';
import LoginPage from 'components/__GLOBALS__/Login/LoginPage';
const Login = (props) => {
  return (
    <Page>
      <LoginPage />
    </Page>
  );
};

export default Login;

export async function getServerSideProps(ctx) {
  return {
    props: {},
  };
}
