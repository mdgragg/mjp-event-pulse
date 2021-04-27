import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { calculate_remaining } from '../../lib/helpers';

import CountdownClock from './CountdownClock';

const MyCounter = styled.div`
  box-shadow: 0px 0px ${(props) => props.shadow || '30px'} 0px black;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  z-index: 99;
  color: ${(props) => props.textColor || 'white'} !important;
  background-color: ${(props) => props.bgColor || 'rgba(0, 0, 0, 0.8)'};
  padding: 0.65em;
  min-width: 120px;
  font-size: ${(props) => props.counterFontSize || '1.5em'};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  && h2 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${(props) => props.textColor} !important;
    width: max-content;
  }
  @media all and (max-width: 768px) {
    margin: 2rem auto;
    width: 100%;
  }
  @media all and (max-width: 440px) {
    width: 100%;
  }
`;

export default function Counter(props) {
  const {
    start,
    end,
    hasStarted,
    hasEnded,
    afterStarted = 'Live',
    title = 'STARTS IN',
    counterFontSize,
    headerFontSize,
  } = props;

  const [countdown_object, set_countdown_object] = useState(
    calculate_remaining(start)
  );

  useEffect(() => {
    const counter = setInterval(() => {
      set_countdown_object(calculate_remaining(start, end));
    }, 1000);
    return () => clearInterval(counter);
  }, []);

  // show if the counter end has been reached
  if (countdown_object.parsed_until_end > 0 || hasEnded) {
    return (
      <MyCounter className={props.customClass || ''} {...props}>
        <h2
          style={{
            fontWeight: '800',
            fontSize: `${headerFontSize || '2rem'}`,
            margin: 'auto auto 0 auto',
          }}
        >
          This Event Has Ended
        </h2>
      </MyCounter>
    );
  }

  // show for live
  if (countdown_object.total_remaining < 0 || hasStarted) {
    return afterStarted;
  }

  // default show the counter
  return (
    <MyCounter className={props.customClass || ''} {...props}>
      <h2
        style={{
          fontWeight: '800',
          fontSize: `${headerFontSize || '2rem'}`,
          margin: 'auto auto 0 auto',
        }}
      >
        {title}
      </h2>
      <CountdownClock countdown_object={countdown_object} />
    </MyCounter>
  );
}
