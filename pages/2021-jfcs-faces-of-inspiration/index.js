import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import JCFS__PAGE from 'components/IndividualEventAssets/2021-jcfs-faces-of-inspiration/JCFS__PAGE';

export const EVENT_URL = '2021-jfcs-faces-of-inspiration';

export var event_theme = {
  heroHeight: '550px',
  videoBreakPoint: null,
  maxSectionWidth: null,
  fontFamily: 'Avenir',
  headerOpacity: '0.5',
  white: null,
  green: '#4F854A',
  blue: '#005198',
  lightBlue: '#60A4D8',
  red: null,
  buttonColor: null,
  headerFont: null,
  headerBgColor: null,
};

const Index = (props) => {
  const router = useRouter();
  // const { error, loading, data } = useQuery(getMainEventMeta(50));
  const { speakers = [], event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    bgImage: main_event.HeaderImage?.url || 'https://placehold.co/1920x860',
  };

  const calculateIfStarted = () => {
    let now = new Date();
    const parsed_event_start = Date.parse(
      main_event.eventStartEnd.StartDateTime
    );

    let calc_time = parsed_event_start - now;

    if (calc_time <= 0) {
      return true;
    }
    return false;
  };

  const calculateIfEnded = () => {
    let now = new Date();
    const parsed_event_end = Date.parse(main_event.eventStartEnd.EndDateTime);

    let calc_time = parsed_event_end - now;

    if (calc_time <= 0) {
      return true;
    }
    return false;
  };

  const [hasStarted, setStarted] = useState(calculateIfStarted());
  const [hasEnded, setEnded] = useState(calculateIfEnded());

  useEffect(() => {
    const interval = setInterval(() => {
      setStarted(calculateIfStarted());
      setEnded(calculateIfEnded());
      if (calculateIfEnded() && !hasEnded) {
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const MainPage = () => {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <JCFS__PAGE theme={event_theme} main_event={main_event} />
      </Page>
    );
  };

  return <MainPage />;
};

export async function getStaticProps() {
  //console.log(ctx.req.cookies);
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  try {
    let eventData = await getEventMeta(EVENT_URL);
    let main_event = eventData.events[0];

    const values = {
      props: {
        //meta will be the props for the event
        event_meta: eventData,
        main_event,
      },
      revalidate: 60,
    };
    return values;
  } catch (error) {
    console.log('get static props error: ', error);
    return {
      redirect: {
        destination: '/',
      },
    };
  }
}

export default Index;
