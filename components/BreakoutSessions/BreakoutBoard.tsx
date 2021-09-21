import React from 'react';
import SingleEvent from './SingleEvent';
import styled from 'styled-components';

const BoardWrap = styled.div`
  text-align: center;
  padding: 3rem 0;
`;
const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  margin: auto;
  padding: 2rem;
  flex-wrap: wrap;
  max-width: 1200px;
  justify-content: space-evenly;
  @media all and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
const BreakoutBoard = ({ breakouts }) => {
  return (
    <BoardWrap>
      <h3>Breakout Sessions</h3>
      <StyledBoard>
        {breakouts.map((b) => (
          <SingleEvent session={b} buttonText="Join Now" />
        ))}
      </StyledBoard>
    </BoardWrap>
  );
};

export default BreakoutBoard;
