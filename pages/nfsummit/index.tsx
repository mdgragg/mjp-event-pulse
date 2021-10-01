import { useState } from 'react';
import { useRouter } from 'next/router';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import PageWrap from 'eventAssets/nfsummit/PageWrap';
export const EVENT_URL = `nfsummit`;

const Index = (props) => {
  const router = useRouter();
  const { event_meta, main_event } = props;

  const hasStarted = useCalculateIfStarted(main_event);
  const [auth, setAuth] = useState(false);

  return (
    <PageWrap
      eventToAuth={main_event}
      event_meta={event_meta}
      main_event={main_event}
      title={`Empathy`}
    >
      <div>Home</div>
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
