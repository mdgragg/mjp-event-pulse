import React from "react";
import PropTypes from "prop-types";
import Message from "./UserMessage";

const LoggedIn = (props) => {
  const {
    messages,
    handleShowHide,
    handleSelect,
    submitResponse,
    handleResponse,
  } = props;
  return Object.keys(messages).map((message, key = 0) => (
    <>
      <Message
        changeResponse={handleResponse}
        id={key + 1}
        key={key + 1}
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
