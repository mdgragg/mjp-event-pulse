import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCalculateRemaining from '../../hooks/useCalculateRemaining';
const Wrap = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 15px;
  width: max-content;
  color: ${(props) => props.theme.white};
  margin: auto;
  text-align: center;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-family: Gotham;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 2px;
`;
const Box = styled.div`
  font-family: Avenir;
  display: grid;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(4, 70px);
  column-gap: 0px;
  grid-template-rows: 65px;
  height: auto;
  grid-template-areas: 'numday numhours nummins numsecs ';
  && > div.box {
    /* border: 1px solid rgba(255, 255, 255, 0.1); */
    /* padding: 4px 0; */
    /* background-color: rgba(255, 255, 255, 0.1); */
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }
  && div.box::after {
    content: ':';
    font-weight: 600;
    position: absolute;
    right: -3px;
    top: -2px;
    font-size: 1.5rem;
  }
  && div.box:last-of-type::after {
    content: '';
  }
  && .digit {
    font-weight: 600;
    font-size: 2rem;
    line-height: 2.25rem;
  }
  && .delimiter {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  && .numday {
    grid-area: numday;
  }
  && .numhours {
    grid-area: numhours;
  }
  && .numminutes {
    grid-area: nummins;
  }
  && .numseconds {
    grid-area: numsecs;
  }
`;

const BoxedCounter = ({ event, style }) => {
  const obj = useCalculateRemaining(event);

  if (!obj) {
    return '';
  }
  if (obj.parsed_until_end <= 0) {
    return (
      <Wrap>
        <Title>This Event Has Ended</Title>
      </Wrap>
    );
  }
  if (obj.total_remaining <= 0) {
    return (
      <Wrap>
        <Title>Live Now!</Title>
      </Wrap>
    );
  }

  if (obj) {
    return (
      <Wrap style={{ ...style }}>
        <Title>Join Us Live In:</Title>
        <Box>
          <div className="numday box">
            <div className="digit"> {obj.days} </div>
            <div className="delimiter"> {obj.days > 1 ? 'Days' : 'Day'}</div>
          </div>

          <div className="numhours box">
            <div className="digit"> {obj.hours} </div>
            <div className="delimiter ">
              {obj.hours === 1 ? 'Hour' : 'Hours'}
            </div>
          </div>

          <div className="numminutes box">
            <div className="digit">{obj.minutes}</div>
            <div className="delimiter ">
              {obj.minutes === 1 ? 'Min' : 'Mins'}
            </div>
          </div>

          <div className="numseconds box ">
            <div className="digit"> {obj.seconds}</div>
            <div className=" delimiter ">Sec</div>
          </div>
        </Box>
      </Wrap>
    );
  }
};

export default BoxedCounter;
