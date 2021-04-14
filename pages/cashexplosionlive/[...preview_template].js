import React from 'react';
import { EVENT_URL } from './index';
import router, { useRouter } from 'next/router';
import { getEventMeta, getEventMetaMain, getMainEventMeta } from 'lib/api';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import Footer from 'components/template1/Footer';
import MainEvent from 'components/IndividualEventAssets/cashexplosionlive/MainEvent';

import { event_theme } from './index';

const PreviewTemplate = ({ event_meta, main_event }) => {
  const router = useRouter();

  return (
    <>
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        <Body>
          <Decider template={router.query.preview_template} data={main_event} />
        </Body>
        <Footer></Footer>
      </Page>
    </>
  );
};

export async function getServerSideProps(ctx) {
  //console.log(ctx.req.cookies);
  const preview = ctx.req.cookies[`preview_cookie__${EVENT_URL}`];
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  try {
    let eventData = await getEventMeta(EVENT_URL);
    if (
      eventData.eventStatus?.EventStatus === 'Preview' &&
      preview !== 'true'
    ) {
      return {
        redirect: {
          destination: `./?preview_template=${ctx.query.preview_template}`,
        },
      };
    }
    let main_event =
      eventData?.events?.filter((ev) => ev.isMainEvent === true)[0] || {};

    const values = {
      props: {
        //meta will be the props for the event
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

export default PreviewTemplate;
