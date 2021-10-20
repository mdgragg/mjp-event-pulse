import { useState } from 'react';
import { useRouter } from 'next/router';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import PageWrap from 'eventAssets/nfsummit/PageWrap';
import { LinearProgress } from '@material-ui/core';
import { SingleDay } from 'eventAssets/nfsummit/SingleDay';
export const EVENT_URL = `nfsummit`;

const Index = (props) => {
  const router = useRouter();
  const { event_meta, main_event } = props;

  const inclusion_session = event_meta.events.filter((e) => e.id === '175')[0];

  if (!inclusion_session) {
    return <LinearProgress />;
  }
  return (
    <PageWrap
      event_meta={event_meta}
      main_event={main_event}
      eventToAuth={main_event}
      title={`Inclusion Session`}
    >
      <SingleDay
        hideName={true}
        event={inclusion_session}
        logoLink={main_event.LogoLink[0].Media.url}
      />
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
