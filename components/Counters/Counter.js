import styled, { keyframes } from 'styled-components';
import {
  Grid,
  Card,
  AppHeader,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useState, Fragment, useEffect } from 'react';

const MyCounter = styled.div`
  box-shadow: 0px 0px ${(props) => props.shadow || '30px'} 0px black;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  z-index: 99;
  color: ${(props) => props.textColor || 'white'} !important;
  background-color: ${(props) => props.bgColor || 'rgba(0, 0, 0, 0.8)'};
  padding: 0.65em;
  min-width: 360px;
  font-size: ${(props) => props.counterFontSize || '1.5em'};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  && h2 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${(props) => props.textColor} !important;
  }
  @media all and (max-width: 768px) {
    margin: 2rem auto;
  }
  @media all and (max-width: 440px) {
    width: 100%;
  }
`;

export default function Counter(props) {
  const {
    start,
    hasStarted,
    afterStarted = 'Live',
    title = 'STARTS IN',
    counterFontSize,
    headerFontSize,
  } = props;
  function pad(value) {
    if (value === 0) {
      return '0';
    }
    if (value < 10) {
      return '0' + value;
    } else {
      return value;
    }
  }

  function getRemainingTime(date) {
    const total_remaining = Date.parse(date) - Date.parse(new Date());
    const seconds = Math.floor((total_remaining / 1000) % 60);
    const minutes = Math.floor((total_remaining / 1000 / 60) % 60);
    const hours = Math.floor((total_remaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total_remaining / (1000 * 60 * 60 * 24));
    if (total_remaining === 'undefined') {
      return {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
        total_remaining: '',
      };
    }
    return {
      days,
      hours,
      minutes,
      seconds,
      total_remaining,
    };
  }

  useEffect(() => {
    // calcTime(getRemainingTime(props.start));

    let interval = setInterval(() => {
      let remaining = getRemainingTime(start);
      calcTime(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [time, calcTime] = useState(getRemainingTime(start));

  if (time.total_remaining < 0 || hasStarted) {
    return afterStarted;
  }
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
      {time.days} Days {time.hours === 0 ? '' : `${pad(time.hours)} Hours`}{' '}
      {pad(time.minutes)} Minutes {pad(time.seconds)}
    </MyCounter>
  );
}
