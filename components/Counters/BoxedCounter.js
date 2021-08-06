import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCalculateRemaining from '../../hooks/useCalculateRemaining';
import { default_theme } from '../Themes/default.theme';
const Wrap = styled.div`
  width: 100%;
  max-width: 700px;
  color: ${(props) => props.theme.colors.primary};
  margin: auto;
  text-align: center;
`;

const Title = styled.div`
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.secondary};
  font-family: Gotham;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  /* margin: 1rem auto; */
  padding: 0.75rem 0;
`;
const Box = styled.div`
  font-family: Avenir;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: auto;
  flex-wrap: wrap;

  && > div.box {
    height: 0;
    padding-top: 20%;
    min-width: 50px;
    min-height: 50px;
    width: 20%;
    background-color: ${(props) => props.theme.colors.secondary};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }

  && .digit {
    position: absolute;
    top: 20%;
    font-weight: 600;
    font-size: clamp(22px, 5vw, 2.5rem);
    line-height: clamp(24px, 5vw, 2.5rem);
  }
  && .delimiter {
    position: absolute;
    top: 70%;
    font-size: clamp(10px, 1.5vw, 1.25rem);
    line-height: clamp(10px, 1.5vw, 1.25rem);
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;

const BoxedCounter = ({ event, style, prefix }) => {
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
        {prefix && <Title>{prefix}</Title>}

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

BoxedCounter.defaultProps = {
  theme: default_theme,
  event: {
    eventStartEnd: {
      StartDateTime: null,
      EndDateTime: null,
    },
  },
};

export default BoxedCounter;
