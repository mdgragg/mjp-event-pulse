import { PlayerWithChat } from 'components/BodyTemplates';
import styled from 'styled-components';
import React from 'react';
import { BreakoutBoard } from 'components/BreakoutSessions';
import SimpleTabs from 'components/TabPanels/TwoPanel';
import Chat__iFrame from 'components/iFrames/Chat__iFrame';
import NFHeader from './NFHeader';

const PageWrap = styled.div``;

const VideoWrap = styled.div`
  padding: 2%;
  max-width: 1600px;
  margin: auto;
`;

const TabbedChat = ({ chatUrl, pollUrl }) => {
  return (
    <SimpleTabs
      data={[
        { title: 'Chat', content: <Chat__iFrame src={chatUrl} /> },
        { title: 'Polling', content: <Chat__iFrame src={pollUrl} /> },
      ]}
    ></SimpleTabs>
  );
};
export const SingleDay = ({ event, logoLink }) => {
  const chatUrl = event.streamLinks.filter((s) => s.Service === 'Chat')[0].url;
  const videoUrl = event.streamLinks.filter((s) => s.Service === 'Vimeo')[0]
    .url;

  const pollUrl = event.streamLinks.filter(
    (s) => s.Service === 'PollEverywhere'
  )[0].url;
  return (
    <PageWrap>
      <NFHeader logoLink={logoLink} headerText={event.EventName} />
      <VideoWrap>
        <PlayerWithChat
          videoUrl={videoUrl}
          chatUrl={chatUrl}
          hasStarted={true}
          styles={{
            wrap: {
              backgroundColor: 'rgba(0,0,0,0)',
            },
          }}
          chatComponent={<TabbedChat chatUrl={chatUrl} pollUrl={pollUrl} />}
        />
      </VideoWrap>
      {/* <BreakoutBoard breakouts={event.BreakoutSessions} /> */}
    </PageWrap>
  );
};
