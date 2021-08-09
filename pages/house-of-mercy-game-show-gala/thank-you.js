import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates/index';

import GameShow__ThankYou from 'eventAssets/house-of-mercy-game-show-gala/GameShow__ThankYou';
import GAMEWRAP from 'eventAssets/house-of-mercy-game-show-gala/GAMEWRAP';

import { event_theme } from 'components/Themes/default.theme';
export const EVENT_URL = 'house-of-mercy-game-show-gala';
const PLACEHOLD = 'https://placehold.co/';

const ThankYou = (props) => {
  const { event_meta, main_event } = props;
  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
      <GAMEWRAP>
        <GameShow__ThankYou main_event={main_event} />
      </GAMEWRAP>
    </Page>
  );
};

export async function getStaticProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: event_data,
      main_event,
    },
  };
}

export default ThankYou;
