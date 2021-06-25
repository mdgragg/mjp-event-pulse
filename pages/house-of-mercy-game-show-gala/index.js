import { useState } from 'react';
import { getEventMeta } from 'lib/api';

import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates/index';

import GameShow__Main from '../../components/IndividualEventAssets/house-of-mercy-game-show-gala/GameShow__Main';
import GAMEWRAP from '../../components/IndividualEventAssets/house-of-mercy-game-show-gala/GAMEWRAP';
import UseServerSentEvents from '../../hooks/useServerSentEvents';
export var event_theme = {
  h1: {
    fontSize: '3rem',
  },
  primaryColor: '#181818',
  secondaryColor: '#97d700',
  heroHeight: '200px',
  green: 'rgb(3,76,66)',
  lightGreen: 'rgb(148,199,78)',
  grey: '#181818',
  white: null,
  blue: '#1e2c60',
  red: '#e41936',
  purple: 'rgb(145,51,130)',
  orange: 'rgb(243,120,47)',
  lightOrange: 'rgb(252,172,52)',
  fontFamily: 'Akzidenz-Grotesque-Bold',
  videoBreakPoint: 700,
};

export const EVENT_URL = 'house-of-mercy-game-show-gala';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const { event_meta, main_event } = props;
  event_theme = {
    ...event_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
      <GAMEWRAP>
        <GameShow__Main main_event={main_event} />
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
