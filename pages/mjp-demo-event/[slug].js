import React, { useState } from 'react';
import { EVENT_URL } from './index';

import { getEventMeta } from 'lib/api';

import AuthWrap from 'components/AuthWrap';
import Index from './index';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const SubEvent = ({ main_event, event_meta }) => {
  const {
    setAuth,
    state: { hasAuth },
  } = useContext(AppContext);
  return (
    <AuthWrap
      eventToCheck={main_event}
      successCallback={(res) => {
        toast.success('Hello, welcome to the demo event!');
      }}
    >
      <Index event_meta={event_meta} main_event={main_event} />{' '}
    </AuthWrap>
  );
};

export default SubEvent;

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  let event_data = await getEventMeta(EVENT_URL);

  let main_event = event_data.events.filter(
    (ev) => ev.slug === ctx.query.slug
  )[0];

  if (!main_event) {
    return {
      redirect: {
        destination: './',
      },
    };
  }

  return { props: { event_meta: event_data, main_event } };
}
