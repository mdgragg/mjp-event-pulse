import { BoxedCounter } from 'components/Counters';
import styled from 'styled-components';
import React from 'react';

const StyledBefore = styled.div`
  && .text {
    text-align: center;
  }
`;

const CmoBefore = ({ main_event }) => {
  return (
    <StyledBefore>
      <div className="text">This event hasn't started yet</div>
      <BoxedCounter
        className="counter"
        styles={{
          boxColor: 'white',
          textColor: 'green',
        }}
        event={main_event}
      />
    </StyledBefore>
  );
};

export default CmoBefore;
