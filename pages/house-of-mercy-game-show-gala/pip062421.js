import React from 'react';
import Page from 'components/template1/Page';
import UseServerSentEvents from '../../hooks/useServerSentEvents';
import Total from '../../components/IndividualEventAssets/house-of-mercy-game-show-gala/Total';
import { event_theme } from './index';

import LeaderBoards from '../../components/IndividualEventAssets/house-of-mercy-game-show-gala/LeaderBoards';
import { getEventMeta } from 'lib/api';
const pip062421 = ({ url }) => {
  const data = UseServerSentEvents();
  return (
    <Page theme={event_theme}>
      <Total data={data} />
      <LeaderBoards data={data} />
    </Page>
  );
};

export default pip062421;

export async function getServerSideProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];
  const url = main_event.streamLinks[2].url;
  return {
    props: { url },
  };
}
