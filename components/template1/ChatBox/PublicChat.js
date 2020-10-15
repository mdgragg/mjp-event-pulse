import React from "react";
import PropTypes from "prop-types";
import CurrentMessage from "./PublicMessage";
import QuestionSection from "./QuestionSection";
// import "./transitions.module.css";

import { Transition } from "react-transition-group";

const PublicChat = (props) => {
  const { messages, addQuestion } = props;

  const featuredMessage = Object.values(messages).filter(
    (v) => v.featured === true
  );
  return (
    <>
      {featuredMessage ? (
        <>
          <h2>Pinned Question From: {featuredMessage.sender} </h2>

          <CurrentMessage message={featuredMessage} />
        </>
      ) : (
        <h2>No Featured Message</h2>
      )}

      <h2>All Other Questions:</h2>
      {Object.keys(messages).map((message, id) => {
        if (messages[message].public && !messages[message].featured) {
          return (
            <CurrentMessage
              key={`current-message--${id + 1}`}
              message={[messages[message]]}
            />
          );
        }
      })}
      <QuestionSection exhibitor={props.exhibitor} addQuestion={addQuestion} />
    </>
  );
};

PublicChat.propTypes = {};

export default PublicChat;
