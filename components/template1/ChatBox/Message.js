import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Message = styled.div`
  background-color: aliceblue;
  margin-bottom: 2em;
  border: 1px solid grey;
  min-height: 150px;
  div {
    padding: 1em;
  }
  input {
    display: inline;
  }
  div.controls {
    height: 40px;
    background-color: #181818;
    color: white;
  }
  div.message-metadata {
    background-color: antiquewhite;
    span {
      font-weight: 800;
    }
  }
  div.message {
    padding: 1em;
    font-weight: 800;
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
  :focus {
    background-color: seashell;
  }
`;

const index = (props) => (
  <Message>
    <div className="controls">
      <button onClick={() => props.handleSelect(props.meta)}>
        {" "}
        Bring To Top{" "}
      </button>
      <label
        onClick={(e) => {
          e.stopPropagation();
          props.handleShowHide(props.meta, true);
        }}
        htmlFor={`public--${props.id}`}
      >
        <input
          onClick={(e) => {
            e.stopPropagation();
          }}
          id={`public--${props.id}`}
          type="radio"
          name={`public-private--${props.id}`}
          value="true"
          checked={props.meta.public}
        />
        Show
      </label>

      <label
        onClick={(e) => {
          e.stopPropagation();
          props.handleShowHide(props.meta, false);
        }}
        htmlFor={`private--${props.id}`}
      >
        <input
          onClick={(e) => {
            e.stopPropagation();
          }}
          id={`private--${props.id}`}
          type="radio"
          name={`public-private--${props.id}`}
          value="false"
          checked={!props.meta.public}
        />
        Hide
      </label>
    </div>
    <div className="message-metadata">
      {" "}
      <span>From: </span>
      {props.meta.sender}
      <br />
      {props.meta.id.slice(0, -32)}{" "}
    </div>

    <div className="message"> {props.message} </div>
    <Response
      placeholder="your answer here..."
      className="response"
      value={props.meta.response}
      onChange={(e) => props.handleResponse(e, props.meta.id)}
    />
    <button
      onClick={() => {
        props.submitResponse(props.meta.id);
      }}
    >
      Submit Response
    </button>
  </Message>
);

export default index;
