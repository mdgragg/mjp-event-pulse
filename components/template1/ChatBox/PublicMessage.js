import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "./transitions.module.css";
import { CSSTransition } from "react-transition-group";
import { Card } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const Pin = styled(Card)`
  background-color: grey;
  margin: 1em 0;
  transition: opacity 1s;
  max-width: 700px;
  .pin-question {
    padding: 1em;
    background-color: #181818;
    color: white;
    height: 20%;
  }
  .pin-response {
    background-color: white;
    padding: 1em;
    color: #181818;
    min-height: inherit;
    white-space: pre-wrap;
  }
`;
const StyledMessage = styled.div`
  font-size: 16px;
  &&.open {
    min-height: 350px;
    transition: height 0.2s ease;
  }
  &&.closed {
    height: 90px;
    transition: height 0.2s ease;
  }
  overflow: hidden;
  background-color: grey;

  width: 100%;
  .question {
    padding: 1em;
    background-color: #181818;
    color: white;
    height: 90px;
    display: grid;
    grid-template-columns: 90% 10%;
    position: relative;
    z-index: 1;
    .dropdown {
      cursor: pointer;
      transition: transform 0.2s ease;
      position: absolute;
      transform-origin: (0, 0);
      right: 15px;
      top: 15px;
    }
    .flip {
      transform: rotate(-180deg);
    }
  }
  .response {
    background-color: white;
    padding: 1em;
    color: #181818;
    min-height: 300px;
    white-space: pre-wrap;
    z-index: 0;
    transition: all 0.2s ease;
    transform: translateY(0%);
  }
  .hide {
    transform: translateY(-100%);
    transition: all 0.2s ease;
    /* height: 0px; */
  }
`;

const From = styled.span`
  color: #2bef83;
  font-weight: 800;
`;

export const PinnedMessage = (props) => {
  const { message } = props;
  const inner = message[0];
  const text = inner?.response;

  return (
    <Pin>
      <div className="pin-question">
        <strong>Question: </strong>
        <br /> {inner?.message}
        <br />
        <From>From: {inner?.sender}</From>
      </div>

      <div className="pin-response">
        <strong>Response: </strong> <br />
        {text}
      </div>
    </Pin>
  );
};

const OtherMessage = (props) => {
  const { message } = props;
  const inner = message[0];
  const text = inner?.response;
  const [messageOpen, setOpen] = useState(false);
  if (inner !== undefined) {
    return (
      <StyledMessage className={messageOpen ? "open" : "closed"}>
        <div className="question">
          <div>
            <strong>Question: </strong>
            <br /> {inner?.message}
            <br />
            <From>From: {inner?.sender}</From>
          </div>
          <div className={`dropdown ${messageOpen ? "flip" : ""}`}>
            <ArrowDropDownIcon
              fontSize={"large"}
              onClick={() => {
                setOpen(!messageOpen);
              }}
            />
          </div>
        </div>

        <div className={`response ${messageOpen ? "" : "hide"}`}>
          <strong>Response: </strong> <br />
          {text}
        </div>
      </StyledMessage>
    );
  } else {
    return <h3>No Featured Post Right Now</h3>;
  }
};

export default OtherMessage;
