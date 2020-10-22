import React, { useEffect } from "react";
import PropTypes from "prop-types";
import OtherMessage, { PinnedMessage } from "./PublicMessage";
import QuestionSection from "./QuestionSection";
// import "./transitions.module.css";
import { Grid, Card } from "@material-ui/core";
import { Transition } from "react-transition-group";

const PublicChat = (props) => {
  const { messages, addQuestion } = props;
  const [featuredMessage, setFeaturedMessage] = React.useState([]);

  useEffect(() => {
    const value = Object.values(messages).filter((v) => v.featured === "true");
    setFeaturedMessage(value);
  }, [messages]);

  return (
    <Grid container spacing={2}>
      {featuredMessage[0] ? (
        <Grid item md={8}>
          <h2>Pinned Question From: {featuredMessage[0].sender} </h2>
          <PinnedMessage message={featuredMessage} />
        </Grid>
      ) : (
        <Grid item md={8}>
          <h2 style={{ color: "#867f8d" }}>No Featured Message</h2>
        </Grid>
      )}
      <Grid item md={8}>
        <h2>All Other Questions:</h2>
      </Grid>

      {Object.keys(messages).map((message, id) => {
        if (messages[message].public && !messages[message].featured) {
          return (
            <Grid item md={6} sm={12} xs={12}>
              <OtherMessage
                key={`current-message--${id + 1}`}
                message={[messages[message]]}
              />
            </Grid>
          );
        }
      })}
      <Grid item md={8} sm={12} xs={12}>
        <QuestionSection
          exhibitor={props.exhibitor}
          addQuestion={addQuestion}
        />
      </Grid>
    </Grid>
  );
};

PublicChat.propTypes = {};

export default PublicChat;
