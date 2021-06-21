import React from 'react';
import Chat__iFrame from 'components/iFrames/Chat__iFrame';
import { getEventMeta } from 'lib/api';

import { EVENT_URL } from './index';
const Chat = ({ src }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        margin: 'auto',
        backgroundColor: 'rgba(40,40,40,1)',
        paddingTop: '3rem',
      }}
    >
      <h2 style={{ color: 'white', textAlign: 'center' }}>
        House of Mercy Game Show Chat
      </h2>
      <Chat__iFrame
        src={src}
        iFrameStyle={{ padding: '1rem', height: '100%' }}
      />
    </div>
  );
};

export default Chat;

export async function getStaticProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      src: main_event.streamLinks[1].url,
    },
    revalidate: 500,
  };
}
