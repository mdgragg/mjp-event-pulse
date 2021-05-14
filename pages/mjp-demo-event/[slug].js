import React from 'react';
import { EVENT_URL } from './index';
import { getEventMeta } from 'lib/api';
const SubEvent = ({ main_event }) => {
  return <div>{JSON.stringify(main_event)}</div>;
};

export default SubEvent;

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api

  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter(
    (ev) => ev.slug === ctx.query.slug
  )[0];

  return { props: { main_event } };
}
