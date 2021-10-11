import { PlayerWithChat } from 'components/BodyTemplates';
import styled from 'styled-components';
import React, { useState } from 'react';
import { BreakoutBoard } from 'components/BreakoutSessions';
import SimpleTabs from 'components/TabPanels/TwoPanel';
import Chat__iFrame from 'components/iFrames/Chat__iFrame';
import NFHeader from './NFHeader';
import { Replacer } from 'components/__Assets__';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';
import LinkBox from 'components/LinkBoxes/LinkBox';
import { Button__Primary } from 'components/Buttons';

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

  const zoomUrl =
    event.streamLinks.filter((s) => s.Service === 'Zoom')[0]?.url ||
    `https://millsjames.com`;

  const pollUrl = event.streamLinks.filter(
    (s) => s.Service === 'PollEverywhere'
  )[0].url;

  const [checked, setChecked] = useState(false);

  return (
    <PageWrap>
      <NFHeader logoLink={logoLink} headerText={event.EventName} />
      <VideoWrap>
        <Replacer
          decider={checked}
          showIfTrue={
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
          }
          showIfFalse={
            <div style={{ maxWidth: '900px', margin: 'auto' }}>
              <LinkBox
                link={{
                  allowed: false,
                  href: zoomUrl,
                  errorText: 'This event has not started yet!',
                }}
                prefix={`Click Below To Join the Zoom Session`}
              >
                <h3 style={{ width: '80%', margin: '2rem auto' }}>
                  Please click below to join today's event
                </h3>
              </LinkBox>
            </div>
          }
        />
      </VideoWrap>
      <Button__Primary onClick={() => setChecked(!checked)}>
        {checked ? 'Show Day 2 ' : 'Show Day 1'}
      </Button__Primary>
      {/* <BreakoutBoard breakouts={event.BreakoutSessions} /> */}
    </PageWrap>
  );
};
