import React, { useState } from 'react';
import { EVENT_URL, event_theme } from './index';

import { getEventMeta } from 'lib/api';
import AttendeeList from 'components/Modals/AttendeeList';
import FullWrap from 'components/FullWrap';
import Index from './index';

const SubEvent = ({ main_event, event_meta }) => {
  const [hasAuthorized, setHasAuthorized] = useState(false);

  if (main_event.AuthOptions.AuthorizationType === 'AttendeeFromList') {
    return (
      <>
        <AttendeeList
          event_meta={main_event}
          event_name={main_event.EventName}
          open={!hasAuthorized}
          callback={() => setHasAuthorized(true)}
          signInText={
            <>
              <p>
                This will only allow attendees to enter if they are on a list.{' '}
                <br /> The only email that will work for this form is
              </p>
              <p style={{ textAlign: 'left', marginLeft: '20%' }}>
                Name: <strong> Mills James </strong>
                <br />
                Email: <strong> mjuser@mjvirtualevents.com </strong>
              </p>
              <p>A user will only have to authenticate once per session.</p>
            </>
          }
        />
        <FullWrap className={hasAuthorized ? '' : 'blurred'}>
          <Index event_meta={event_meta} main_event={main_event} />{' '}
        </FullWrap>
      </>
    );
  }
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

  return { props: { event_meta: event_data, main_event } };
}
