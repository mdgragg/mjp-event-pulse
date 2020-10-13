import React from "react";
import PropTypes from "prop-types";
import Message from "./Message";

const LoggedIn = (props) => {
  const {
    messages,
    handleShowHide,
    handleSelect,
    submitResponse,
    handleResponse,
    handleMessage,
    addMessage,
    question,
  } = props;
  return Object.keys(messages).map((message, id) => (
    <>
      <Message
        handleResponse={handleResponse}
        key={id}
        id={id}
        meta={messages[message]}
        handleShowHide={handleShowHide}
        handleSelect={handleSelect}
        message={messages[message].message}
        submitResponse={submitResponse}
      ></Message>
    </>
  ));
};

export default LoggedIn;
