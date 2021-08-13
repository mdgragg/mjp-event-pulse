import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import cookies from 'next-cookies';
import _ from 'lodash';
import { getEventMeta, getEventMetaMain, getMainEventMeta } from 'lib/api';

import { Grid, Button } from '@material-ui/core';

import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import PreviewLoginPage from 'components/globals/Login/PreviewLoginPage';

export var event_theme = {
  heroHeight: '25vh',
  fontFamily: null,
  headerOpacity: null,
  videoBreakPoint: 700,
  white: null,
  blue: '#1e2c60',
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  red: '#b71f39',
  buttonColor: null,
  headerFont: null,
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};
const Preview = ({ EVENT_URL }) => {
  const router = useRouter();

  const MainPage = () => {
    return (
      <PreviewLoginPage
        theme={event_theme}
        EVENT_URL={EVENT_URL}
        redirect={`/${EVENT_URL}`}
      >
        <Meta title={'Login'}></Meta>
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
  const EVENT_URL = ctx.query.event;
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
