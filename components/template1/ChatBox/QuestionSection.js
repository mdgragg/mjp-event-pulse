import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, Grid } from "@material-ui/core";

const Question = styled.textarea`
  height: 200px;
  width: 100%;
  font-family: Roboto;
  font-size: 18px;
`;

const Header = styled.div``;

const Sender = styled.input`
  height: 50px;
  width: 90%;
  font-size: 24px;
`;

const QuestionSection = (props) => {
  const [question, setQuestion] = React.useState("");
  const [sender, setSender] = React.useState({ name: "", email: "" });
  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const handleSender = (e) => {
    const theSender = { ...sender };

    theSender[e.target.name] = e.target.value;

    setSender(theSender);
  };
  return (
    <Card style={{ padding: "1em" }}>
      <Header>
        {" "}
        <h2> Ask A Question to {props.exhibitor.FirstName}: </h2>
      </Header>

      <Question
        type="text"
        id="question"
        onChange={(e) => {
          handleQuestion(e);
        }}
      />

      <Grid container>
        <Grid item md={6}>
          <h4>Your Name:</h4>
          <Sender
            type="text"
            id="name"
            name="name"
            onChange={(e) => {
              handleSender(e);
            }}
          />
        </Grid>
        <Grid item md={6}>
          <h4>Your Email:</h4>
          <Sender
            type="text"
            id="email"
            name="email"
            onChange={(e) => {
              handleSender(e);
            }}
          />
        </Grid>
      </Grid>

      <br />
      <button
        onClick={() => {
          props.addQuestion(question, sender);
          setQuestion("");
          setSender({ sender: "", email: "" });
        }}
      >
        Submit
      </button>
    </Card>
  );
};

QuestionSection.propTypes = {};

export default QuestionSection;
