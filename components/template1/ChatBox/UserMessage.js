import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactCSSTransitionGroup from "react-transition-group";

import { Button } from "@material-ui/core";
const Message = styled.div`
  background-color: aliceblue;
  position: relative;
  margin-bottom: 2em;
  border: 1px solid grey;
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
  background-color: #f8f8f8;
  color: #181818;
  .label-wrapper {
    right: 8px;

    top: 8px;
    position: absolute;
    display: inline;
    background-color: #cecece;

  input {
    -webkit-appearance: none;
  }
  input:checked + label {
    background-color: #001544;
    color: white;
  }
  label {
    padding: 10px;
  }
`;
const ShowButton = styled(Button)`
  background-color: #0033c1;
  color: white;
`;

const index = (props) => {
  const [response, changeResponse] = React.useState({ ...props.meta.response });

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
        <div className="label-wrapper">
          <input
            onClick={(e) => {
              e.preventDefault();
            }}
            key={`public-${props.id}`}
            id={`public--${props.id}`}
            type="radio"
            name={`public-private--${props.id}`}
            checked={props.meta.public}
          />
          <label
            onClick={(e) => {
              e.stopPropagation();
              props.handleShowHide(props.meta, true);
            }}
            htmlFor={`public--${props.id}`}
          >
            Show
          </label>
          <input
            onClick={(e) => {
              e.preventDefault();
            }}
            key={`private-${props.id}`}
            id={`private--${props.id}`}
            type="radio"
            name={`public-private--${props.id}`}
            checked={!props.meta.public}
          />
          <label
            onClick={(e) => {
              e.stopPropagation();
              props.handleShowHide(props.meta, false);
            }}
            htmlFor={`private--${props.id}`}
          >
            Hide
          </label>
        </div>
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
      <button
        onClick={() => {
          props.submitResponse(props.meta.id, response);
        }}
      >
        Submit Response
      </button>
    </Message>
  );
};
export default index;
