import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import GameShow__Main from 'eventAssets/house-of-mercy-game-show-gala/GameShow__Main';
import GAMEWRAP from 'eventAssets/house-of-mercy-game-show-gala/GAMEWRAP';
import UseServerSentEvents from '../../hooks/useServerSentEvents';

import { event_theme, EVENT_URL } from './index';
const Index = (props) => {
  const { event_meta, main_event } = props;
  const data = UseServerSentEvents(main_event.streamLinks[2].url);

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
      <GAMEWRAP>
        <GameShow__Main main_event={main_event} data={data} showVid={false} />
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
    revalidate: 500,
  };
}

export default Index;
