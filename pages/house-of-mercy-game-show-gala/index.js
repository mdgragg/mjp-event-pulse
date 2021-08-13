import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates/index';

import GameShow__Main from 'eventAssets/house-of-mercy-game-show-gala/GameShow__Main';
import GAMEWRAP from 'eventAssets/house-of-mercy-game-show-gala/GAMEWRAP';
import event_theme from 'components/Themes/default.theme';

export const EVENT_URL = 'house-of-mercy-game-show-gala';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const { event_meta, main_event } = props;
  let theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  return (
    <Page theme={theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
      <GAMEWRAP>
        <GameShow__Main main_event={main_event} />
      </GAMEWRAP>
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    redirect: {
      destination: EVENT_URL + '/thank-you',
    },
  };
}

export default Index;
