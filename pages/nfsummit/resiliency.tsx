import { useState } from 'react';
import { useRouter } from 'next/router';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import PageWrap from 'eventAssets/nfsummit/PageWrap';
import { LinearProgress } from '@material-ui/core';
import { SingleDay } from 'eventAssets/nfsummit/SingleDay';
export const EVENT_URL = `nfsummit`;

const Index = (props) => {
  const router = useRouter();
  const { event_meta, main_event } = props;

  const resilience_session = event_meta.events.filter((e) => e.id === '174')[0];

  if (!resilience_session) {
    return <LinearProgress />;
  }
  return (
    <PageWrap
      event_meta={event_meta}
      main_event={main_event}
      eventToAuth={resilience_session}
      title={`Resilience Session`}
    >
      <SingleDay event={resilience_session} />
    </PageWrap>
  );
};

export async function getServerSideProps(ctx) {
  try {
    return GET_SERVERSIDE_PROPS_DEFAULT(ctx, EVENT_URL);
  } catch (error) {
    console.log('[event].js error: ', error);
    return {
      redirect: {
        destination: '/404',
      },
    };
  }
}

export default Index;
