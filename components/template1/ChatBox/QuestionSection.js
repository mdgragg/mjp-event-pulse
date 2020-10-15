import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Question = styled.textarea`
  height: 200px;
  width: 100%;
  font-family: Roboto;
  font-size: 18px;
`;
const Sender = styled.input`
  height: 50px;
  width: 100%;
  font-size: 24px;
`;

const QuestionSection = (props) => {
  const [question, setQuestion] = React.useState("");
  const [sender, setSender] = React.useState("");
  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const handleSender = (e) => {
    setSender(e.target.value);
  };
  return (
    <>
      <h2> Ask A Question to {props.exhibitor.FirstName} </h2>
      <h4>Type Your Question Below</h4>
      <Question
        type="text"
        id="question"
        onChange={(e) => {
          handleQuestion(e);
        }}
        // onKeyUp={(e) => {
        //   if (e.key === "Enter") {
        //     addMessage();
        //   }
        // }}
        // ref={questionRef}
        // value={props.question}
      />
      <h4>Your Name:</h4>
      <Sender
        type="text"
        id="sender"
        onChange={(e) => {
          handleSender(e);
        }}
      />
      <br />
      <button
        onClick={() => {
          props.addQuestion(question, sender);
          setQuestion("");
          setSender("");
        }}
      >
        Submit
      </button>
    </>
  );
};

QuestionSection.propTypes = {};

export default QuestionSection;
