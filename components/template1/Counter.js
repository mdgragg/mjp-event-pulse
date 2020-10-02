import styled, { keyframes } from "styled-components";
import {
  Grid,
  Card,
  AppHeader,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useState, Fragment, useEffect } from "react";

const MyCounter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 30px);
  text-align: center;
  font-weight: bold;
  z-index: 99;
  background-color: black;
  padding: 0.5em;
  font-size: 2em;
`;

export default function Counter(props) {
  
  function pad(value) {
    if (value < 10) {
      return "0" + value;
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

  // const theDate = new Date("October 17 2020 15:15:00 GMT-0400");

  useEffect(() => {
    let interval = setInterval(() => {
      calcTime(getRemainingTime(props.start));
    });
  }, []);
  const [time, calcTime] = useState({});

  return (
    <MyCounter>
      Starts in{" "}
      {` 
        ${pad(time.days)} Days
          ${pad(time.hours)}:
          ${pad(time.minutes)}:
          ${pad(time.seconds)}`}
    </MyCounter>
  );
}
