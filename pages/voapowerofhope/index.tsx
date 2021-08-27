import { useRouter } from 'next/router';
import Page from 'components/PageTemplates';

import { default_theme } from 'eventAssets/voapowerofhope/theme.theme';
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default';

import Multiform from 'eventAssets/voapowerofhope/Multiform';

const EVENT_URL = 'voapowerofhope';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const router = useRouter();

  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
  };

  return (
    <Page theme={event_theme}>
      <Multiform />
    </Page>
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
