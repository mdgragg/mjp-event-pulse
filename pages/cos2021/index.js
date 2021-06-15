import { useEffect, useState, useContext } from 'react';
import Route, { Router, useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import { calculateIfStarted, calculateIfEnded } from 'lib/helpers';
import useCalculateStartEnd from 'hooks/useCalculateIfStarted';
import { Grid } from '@material-ui/core';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import BannerWithPicture from 'components/Banners/BannerWithPicture';
import BattelleHero from 'components/IndividualEventAssets/cos2021/BattelleHero';
import Section from 'components/template1/Section';
import Fluid__iFrame from 'components/iFrames/Fluid__iFrame';
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers';

export const EVENT_URL = 'cos2021';

export var event_theme = {
  heroHeight: '500px',
  fontFamily: null,
  headerOpacity: 0.6,
  white: null,
  blue: '#002d74',
  lightBlue: '#8dc6e8',
  red: null,
  buttonColor: null,
  headerFont: null,
  headerBgColor: 'black',
  videoBreakPoint: 1000,
};

const Index = (props) => {
  return <div></div>;
};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: './',
    },
  };
}

export default Index;
