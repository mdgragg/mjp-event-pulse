import { BoxedCounter } from 'components/Counters';
import styled from 'styled-components';
import React from 'react';

const StyledBefore = styled.div`
 && .text {}

`

const CmoBefore = ({main_event}) => {
    return (
        <StyledBefore>
            <div className="text">This event hasn't started yet</div>
           <BoxedCounter 
             styles={{
                 boxColor: 'blue'
             }}
             event={main_event}
           />

        </StyledBefore>
    );
};

export default CmoBefore;