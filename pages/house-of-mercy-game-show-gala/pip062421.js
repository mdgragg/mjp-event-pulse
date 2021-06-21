import React from 'react';
import Page from 'components/template1/Page';
import UseServerSentEvents from '../../hooks/useServerSentEvents';
import Total from '../../components/IndividualEventAssets/house-of-mercy-game-show-gala/Total';
import { event_theme } from './index';
import LeaderBoards from '../../components/IndividualEventAssets/house-of-mercy-game-show-gala/LeaderBoards';
const pip062421 = () => {
  const data = UseServerSentEvents();
  return (
    <Page theme={event_theme}>
      <Total data={data} />
      <LeaderBoards data={data} />
    </Page>
  );
};

export default pip062421;
