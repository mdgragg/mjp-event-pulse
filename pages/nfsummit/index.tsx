import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import ThemedPage from 'components/__GLOBALS__/ThemedPage';
import Body from 'components/template1/Body';
import { Banner__WithPicture } from 'components/Banners';
import FlexHero from 'components/Heroes/FlexHero';
import DateParse from 'components/__Assets__/DateParse';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { toast } from 'react-toastify';
import Center from 'components/Center';
import { default_theme } from 'components/Themes/default.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import PageWrap from 'eventAssets/nfsummit/PageWrap';
export const EVENT_URL = `nfsummit`;

const Index = (props) => {
  const router = useRouter();
  const { event_meta, main_event } = props;

  const hasStarted = useCalculateIfStarted(main_event);
  const [auth, setAuth] = useState(false);

  return (
    <PageWrap event_meta={event_meta} main_event={main_event} title={`Empathy`}>
      <div> stuff hee</div>
      <div>{JSON.stringify(event_meta)}</div>
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
