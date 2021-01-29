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
  position: absolute;
  top: 55%;
  left: 50%;
  box-shadow: 0px 0px 30px 0px black;
  transform: translate(-50%, 30px);
  text-align: center;
  font-weight: bold;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0.5em;
  font-size: 2em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 2rem;
`;

export default function Counter(props) {
  const [started, setStarted] = useState(false);
  function pad(value) {
    if (value === 0) {
      return '';
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
    return {
      days,
      hours,
      minutes,
      seconds,
      total_remaining,
    };
  }

  useEffect(() => {
    let interval = setInterval(() => {
      const remaining = getRemainingTime(props.start);
      console.log(remaining.total_remaining);
      if (remaining.total_remaining < 0) {
        setStarted(true);
      } else {
        calcTime(remaining);
      }
    });

    return () => clearInterval(interval);
  }, []);
  const [time, calcTime] = useState({});
  if (started) {
    return '';
  } else {
    return (
      <MyCounter>
        {` 
          ${time.days} Days
            ${pad(time.hours)} ${time.hours === 0 ? '' : 'Hours'}
            ${pad(time.minutes)} Minutes
            ${pad(time.seconds)}`}
      </MyCounter>
    );
  }
}
