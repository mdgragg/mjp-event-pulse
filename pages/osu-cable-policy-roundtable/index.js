import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCalculateIfStarted } from 'hooks';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';

import Body from 'components/template1/Body';
import CABLE from 'eventAssets/osu-cable-policy-roundtable';

export var event_theme = {
  heroHeight: '860px',
  videoBreakPoint: null,
  maxSectionWidth: null,
  fontFamily: null,
  headerOpacity: null,
  white: null,
  green: '#a4bf00',
  darkGreen: '#6b7c07',
  blue: null,
  red: null,
  buttonColor: null,
  headerFont: null,
  headerBgColor: null,
};

const Index = (props) => {
  const router = useRouter();
  // const { error, loading, data } = useQuery(getMainEventMeta(50));
  const { speakers, event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    bgImage: main_event.KeyValue[0]?.value || 'https://placehold.co/1920x860',
  };
  const hasStartEnd = useCalculateIfStarted(main_event);

  const MainPage = () => {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>

        <Body>
          <CABLE
            hasStarted={hasStartEnd.hasStarted}
            hasEnded={hasStartEnd.hasEnded}
            theme={event_theme}
            speakers={speakers}
            metadata={main_event}
          />
        </Body>
      </Page>
    );
  };

  return <MainPage />;
};

export async function getServerSideProps(ctx) {
  //console.log(ctx.req.cookies);
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  try {
    let eventData = await getEventMeta('osu-cable-policy-roundtable');

    let main_event = eventData.events.filter(
      (ev) => ev.isMainEvent === true
    )[0];

    let speakers = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + '/events/54'
    ).then((res) => res.json());

    speakers = speakers.EventSpeakers;

    let breakoutObj = {};

    main_event.BreakoutSessions.forEach((sesh) => {
      let key = Object.keys(breakoutObj).find(
        (title) => title === sesh.Category
      );
      if (!key) {
        breakoutObj[sesh.Category] = [sesh];
      } else {
        breakoutObj[sesh.Category] = [...breakoutObj[sesh.Category], sesh];
      }
    });

    main_event.BreakoutSessions = breakoutObj;

    const values = {
      props: {
        //meta will be the props for the event
        speakers,
        event_meta: eventData,
        main_event,
      },
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
