import { Card } from '@material-ui/core';
import { Button__Primary } from 'components/Buttons';
import React from 'react';
import styled from 'styled-components';

const BreakoutWrap = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 1rem;
  margin: 0 auto;
`;
const StyledSingleBreakout = styled(Card)`
  display: grid;
  padding: 1rem;
  grid-template-columns: 25% 1fr;

  @media all and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const StyledButtonArea = styled.div`
  && h3 {
    margin-bottom: 1rem;
  }
  && img {
    max-width: 200px;
    margin-bottom: 1rem;
  }
  text-align: center;
  @media all and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
`;

const StyledTimelineDesc = styled.div`
  background-color: #f7f7f7;
  margin-left: 1rem;
  border-radius: 8px;
  display: grid;
  padding: 1rem;
  grid-template-columns: 250px 1fr;
  grid-auto-rows: minmax(35px, 1fr);
  justify-content: space-between;
  align-items: center;
  column-gap: 2rem;
  && > div {
    height: auto;
  }
  && .time {
    text-align: right;
    font-weight: 600;
  }
  @media all and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    margin-left: unset;
  }
`;

const timelines = {
  30: [
    { time: '8:45am', description: 'Virtual meeting open to join' },
    { time: '9:00am - 9:15am', description: 'Welcome and agenda' },
    { time: '9:15am - 10:30am', description: 'Keynote speaker - Jamil Zaki' },
    { time: '10:30am - 10:45am', description: 'Break' },
    {
      time: '10:45am - 11:30am',
      description: 'Market Research discussion (Steven Knight)',
    },
    {
      time: '11:30am - 12:30pm',
      description: 'Break',
    },
  ],
  0: [
    {
      time: '12:30pm',
      description: 'The Future of Navigation with Bill Lahrmann and Dave Luby',
    },
  ],
  31: [
    {
      time: '12:30pm',
      description: 'The Future of Navigation with Bill Lahrmann and Dave Luby',
    },
    {
      time: '1:30pm - 2:30pm',
      description: 'Discussion with the Product Team',
    },
  ],
  32: [{ time: '2:30pm - 3:00pm', description: 'Wrap Up' }],
};
const BreakoutTimeline = ({ breakouts }) => {
  return (
    <BreakoutWrap>
      {breakouts.map((b) => (
        <SingleBreakout breakout={b} key={b.id} timeline={timelines[b.id]} />
      ))}
    </BreakoutWrap>
  );
};

const SingleBreakout = ({ breakout, timeline }) => (
  <StyledSingleBreakout>
    <StyledButtonArea>
      <img src={breakout.Thumbnail.url} />
      <h3>{breakout.Name}</h3>
      <a href={breakout.Link.url}>
        <Button__Primary>Join {breakout.Category}</Button__Primary>
      </a>
    </StyledButtonArea>
    <StyledTimelineDesc>
      {timeline &&
        timeline.map((a) => (
          <>
            <div className={`time`}>{a.time}</div>
            <div>{a.description}</div>
          </>
        ))}
    </StyledTimelineDesc>
  </StyledSingleBreakout>
);

export default BreakoutTimeline;
