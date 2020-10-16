import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CurrentMessage, { PinnedMessage } from "./PublicMessage";
import QuestionSection from "./QuestionSection";
// import "./transitions.module.css";
import { Grid, Card } from "@material-ui/core";
import { Transition } from "react-transition-group";

const PublicChat = (props) => {
  const { messages, addQuestion } = props;
  const [featuredMessage, setFeaturedMessage] = React.useState([]);

  useEffect(() => {
    const value = Object.values(messages).filter((v) => v.featured === true);
    setFeaturedMessage(value);
  }, [messages]);

  return (
    <>
      {featuredMessage[0] ? (
        <>
          <h2>Pinned Question From: {featuredMessage[0].sender} </h2>

          <PinnedMessage message={featuredMessage} />
        </>
      ) : (
        <h2>No Featured Message</h2>
      )}
      <hr />
      <h2>All Other Questions:</h2>
      <Grid container>
        {Object.keys(messages).map((message, id) => {
          if (messages[message].public && !messages[message].featured) {
            return (
              <Grid item md={4} sm={12} xs={12}>
                <CurrentMessage
                  key={`current-message--${id + 1}`}
                  message={[messages[message]]}
                />
              </Grid>
            );
          }
        })}
      </Grid>
      <QuestionSection exhibitor={props.exhibitor} addQuestion={addQuestion} />
    </>
  );
};

PublicChat.propTypes = {};

export default PublicChat;
