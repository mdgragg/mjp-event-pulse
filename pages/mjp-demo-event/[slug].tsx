import React, { useState } from 'react';
import { EVENT_URL } from './index';

import { getEventMeta } from 'lib/api';

import AuthWrap from 'components/AuthWrap';
import Index, { PageBody } from './index';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { GetServerSideProps } from 'next';

const SubEvent = ({ main_event, event_meta }) => {
  const {
    setAuth,
    state: { hasAuth },
  } = useContext(AppContext);
  return (
    <Index event_meta={event_meta} main_event={main_event}>
      <AuthWrap
        eventToCheck={main_event}
        successCallback={(res) => {
          toast.success('Hello, welcome to the demo event!');
        }}
      >
        <PageBody main_event={main_event} />
      </AuthWrap>
    </Index>
  );
};

export default SubEvent;

export async function getServerSideProps(ctx) {
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
