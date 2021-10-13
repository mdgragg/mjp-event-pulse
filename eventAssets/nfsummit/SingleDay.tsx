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
import ExternalLinkButton from 'components/LinkBoxes/ExternalLinkButton';

const PageWrap = styled.div``;

const VideoWrap = styled.div`
  padding: 2%;
  max-width: 1600px;
  margin: auto;
`;

const StyledLinkBox = styled.div`
  text-align: left;
  margin: 0;
  && h3 {
    margin: 1rem 0;
    color: white;
  }
  && button {
    background-color: white;
    color: ${(props) => props.theme.palette.text.tertiary};
    font-weight: 800;
    font-size: 1.5rem;
    padding: 0.5rem 3rem;
  }
`;

const TabbedChat = ({ chatUrl, pollUrl }) => {
  return (
    <SimpleTabs
      data={[
        { title: 'Chat', content: <Chat__iFrame src={chatUrl} /> },
        // { title: 'Polling', content: <Chat__iFrame src={pollUrl} /> },
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

  const [checked, setChecked] = useState(true);

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
          showIfFalse={<SummitLink zoomUrl={zoomUrl} />}
        />
      </VideoWrap>
      <Button__Primary onClick={() => setChecked(!checked)}>
        {checked ? 'Show Day 2 ' : 'Show Day 1'}
      </Button__Primary>
      {/* <BreakoutBoard breakouts={event.BreakoutSessions} /> */}
    </PageWrap>
  );
};

const SummitLink = ({ zoomUrl }) => (
  <StyledLinkBox>
    <h3>Please click below to join today's event.</h3>
    <ExternalLinkButton
      text={`Join`}
      link={{
        allowed: true,
        newWindow: true,
        href: zoomUrl,
        errorText: 'This event has not started yet!',
      }}
    />
  </StyledLinkBox>
);
