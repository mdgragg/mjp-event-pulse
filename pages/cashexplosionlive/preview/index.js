import { useEffect, useState, useContext } from 'react';

import _ from 'lodash';

import Meta from 'components/globals/Meta';

import PreviewLoginPage from 'components/globals/Login/PreviewLoginPage';
import { EVENT_URL, event_theme } from '../index';

const Index = (props) => {
  const MainPage = () => {
    return (
      <PreviewLoginPage
        theme={event_theme}
        EVENT_URL={props.EVENT_URL}
        redirect={props.redirect}
      >
        <Meta title={'Login'}></Meta>
      </PreviewLoginPage>
    );
  };

  return <MainPage />;
};

export async function getServerSideProps(ctx) {
  const redirect = `./event-preview`;
  //   get the event job data from our api

  if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] === 'true') {
    return {
      redirect: {
        destination: redirect,
      },
    };
  }
  return {
    props: {
      EVENT_URL,
      redirect,
    },
  };
}

export default Index;
