import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import cookies from 'next-cookies';
import _ from 'lodash';
import { Grid, Button } from '@material-ui/core';

import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/template1/Page';
import PreviewLoginPage from 'components/__GLOBALS__/Login/PreviewLoginPage';
import { EVENT_URL } from './index';
const Preview = ({ EVENT_URL }) => {
  const router = useRouter();

  const MainPage = () => {
    return (
      <PreviewLoginPage EVENT_URL={EVENT_URL} redirect={`/${EVENT_URL}`}>
        <Meta title={'Login'}>
          <title>Login</title>
        </Meta>
      </PreviewLoginPage>
    );
  };

  return <MainPage />;
};

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  console.log('dynamic url: ' + EVENT_URL);
  if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] === 'true') {
    return {
      redirect: {
        destination: './',
      },
    };
  }
  return {
    props: { EVENT_URL },
  };
}

export default Preview;
