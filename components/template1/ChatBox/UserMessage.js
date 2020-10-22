import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactCSSTransitionGroup from "react-transition-group";

import { Button, Card } from "@material-ui/core";
const Message = styled(Card)`
  background-color: white;
  position: relative;
  margin-bottom: 2em;

  min-height: 150px;
  div {
    padding: 1em;
  }
  input {
    display: inline;
  }

  div.message-metadata {
    background-color: #181818;
    color: white;
    span {
      font-weight: 800;
    }
  }
  div.message {
    padding: 1em;
    font-weight: 800;
    background-color: #181818;
    color: white;
  }
`;
const Response = styled.textarea`
  background-color: #e2e2e2;
  padding: 1em;
  font-family: ${(props) => props.theme.fontFamily};
  min-height: 150px;
  width: 100%;
  border: none;
  font-size: 18px;
  /* :focus {
    background-color: seashell;
  } */
`;
const Controls = styled.div`
  height: 65px;

  color: #181818;
  width: auto;
`;

const ShowHide = styled.div`
  font-size: 24px;
  position: absolute;
  right: 15px;
  top: 15px;
  margin: 0 !important;
  padding: 0 !important;
  && > div {
    margin: 0 !important;
    padding: 0 !important;
  }
  .label {
    display: inline;
  }
  .controls {
  }

  input {
    /* -webkit-appearance: none; */
    height: 20px;
    width: 20px;
  }
  span {
    height: 20px;
    width: 20px;
    position: absolute;
    background-color: orange;
  }
  input:checked + span {
    background-color: red;
  }
  label {
    height: 20px;
    width: 20px;
  }
`;

const ShowButton = styled(Button)`
  background-color: #0033c1;
  color: white;
`;

const index = (props) => {
  const [response, changeResponse] = React.useState(...props.meta.response);

  const handleResponseChange = (value) => {
    changeResponse(value);
  };
  return (
    <Message key={props.id}>
      <Controls className="controls">
        <ShowButton onClick={() => props.handleSelect(props.meta)}>
          {" "}
          Bring To Top{" "}
        </ShowButton>

        <ShowHide>
          <div className="controls">
            <input
              onClick={(e) => {
                props.handleShowHide(props.meta, true);
              }}
              key={`public-${props.id}`}
              id={`public--${props.id}`}
              type="radio"
              name={`public-private--${props.id}`}
              checked={props.meta.public}
            />
            <label htmlFor={`public--${props.id}`}>Show</label>

            <input
              onClick={(e) => {
                props.handleShowHide(props.meta, false);
              }}
              key={`private-${props.id}`}
              id={`private--${props.id}`}
              type="radio"
              name={`public-private--${props.id}`}
              checked={!props.meta.public}
            />
            <label htmlFor={`private--${props.id}`}>Hide</label>
          </div>
        </ShowHide>
      </Controls>
      <div className="message-metadata">
        {" "}
        <span>From: </span>
        {props.meta.sender}
        <br />
        {props.meta.id}{" "}
      </div>

      <div className="message"> {props.message} </div>
      <Response
        key={props.meta.id}
        placeholder="your answer here..."
        className="response"
        defaultValue={props.meta.response}
        onChange={(e) => {
          handleResponseChange(e.target.value);
        }}
      />
      <ShowButton
        onClick={() => {
          props.submitResponse(props.meta.id, response);
        }}
      >
        Submit Response
      </ShowButton>
    </Message>
  );
};
export default index;
