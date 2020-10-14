import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledMessage = styled.div`
  background-color: grey;
  margin: 1em 0;
  min-height: 150px;

  width: 90%;
  .question {
    padding: 1em;
    background-color: #181818;
    color: white;
    height: 20%;
  }
  .response {
    background-color: white;
    padding: 1em;
    color: #181818;
    min-height: inherit;
    white-space: pre-wrap;
  }
`;

const Message = (props) => {
  const { message } = props;
  const inner = message[0];
  const text = inner?.response;
  if (inner !== undefined) {
    return (
      <StyledMessage>
        <div className="question">
          Question: {inner?.message}
          <br />
          From: {inner?.sender}
        </div>

        <div className="response">
          <strong>Response: </strong> <br />
          {text}
        </div>
      </StyledMessage>
    );
  } else {
    return <h1>No Featured Post Right Now</h1>;
  }
};

export default Message;
