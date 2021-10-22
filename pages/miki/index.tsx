import { useContext, useEffect, useState } from 'react';
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
import default_theme from 'eventAssets/miki/miki.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import { BoxedCounter, CircleCounter } from 'components/Counters';
import { Clock } from 'components/__Assets__';
import MikiPage from 'eventAssets/miki/MikiPage';
import { tokenGenerator } from 'lib/helpers';
import { useSessionToken } from 'hooks';
import { AppContext } from 'context/AppContext';
import MikiAuth__Modal from 'eventAssets/miki/MikiAuth__Modal';

const PLACEHOLD = 'https://placehold.co/';
export const EVENT_URL = `miki`;
const Index = (props) => {
  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  const [hasToken, handleSetToken] = useSessionToken(
    tokenGenerator(main_event)
  );

  const {
    setAuth,
    state: { hasAuth },
  } = useContext(AppContext);

  useEffect(() => {
    if (hasToken) {
      setAuth(true);
    }
  }, [hasToken]);

  return (
    <ThemedPage theme={event_theme}>
      {hasAuth ? (
        <MikiPage main_event={main_event} event_meta={event_meta} />
      ) : (
        <MikiAuth__Modal main_event={main_event} />
      )}
    </ThemedPage>
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
