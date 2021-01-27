import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ChatHolder = styled.div`
  min-height: 450px;
  width: 415px;
  border-radius: 10px;

  position: relative;
  && iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;
const ChatBox = ({ src }) => {
  return (
    <ChatHolder>
      <iframe src={src} frameborder="0" />
    </ChatHolder>
  );
};

export default ChatBox;
