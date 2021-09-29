import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';
import { FullPage__SolidColor } from 'components/BodyTemplates';
import { Banner__WithPicture } from 'components/Banners';
import { FlexHero, SolidColorHero } from 'components/Heroes';
import DateParse from 'components/__Assets__/DateParse';
import { toast } from 'react-toastify';
import { default_theme } from 'eventAssets/nwbattle2021/theme.theme';
import { BoxedCounter } from 'components/Counters';
import { Box__XYCentered } from 'components/Boxes';
import { Video__StickyTop__WithCountdown } from 'components/VideoBoxes';
import { StaticResponse } from 'types/PageResponses';
import { GetStaticProps } from 'next';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';
import { PageBody } from 'eventAssets/nwbattle2021/PageBody';
import PageWrap from 'eventAssets/nwbattle2021/PageWrap';

export const EVENT_URL = `nwbattle2021`;

const Index = ({ event_meta, main_event, title }) => {
  const router = useRouter();

  var event_theme = {
    ...default_theme,
  };
  return (
    <PageWrap
      event_meta={event_meta}
      main_event={main_event}
      title={event_meta.EventName}
    >
      <PageBody event_meta={event_meta} main_event={main_event} />
    </PageWrap>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  const returnObj: StaticResponse = {
    props: {
      event_meta: event_data,
      main_event,
    },
    revalidate: 300,
  };

  return returnObj;
};

export default Index;
