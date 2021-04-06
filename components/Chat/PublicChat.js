import base from 'lib/firebase/base';
import { fireBaseApp as fb } from 'lib/firebase/base';
import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import SingleMessage from './SingleMessage';

const SubmitChat = styled.button``;

const ChatWrap = styled.div`
  max-width: 500px;
  height: 100%;
  && button {
    display: inline;
  }
`;

const ChatMessages = styled.div`
  overflow-y: scroll;
  background-color: white;
  padding: 0.75rem;
  max-height: 70%;
`;
const MessageInput = styled.textarea`
  width: 100%;
  height: 100px;
  border: none;
`;

const InputArea = styled.div``;

const PublicChat = ({ slug = 'test' }) => {
  const [messages, setMessages] = useState(null);
  const [name, setName] = useState(null);
  const nameRef = useRef();
  const setTheName = () => {
    const current = nameRef.current.value;
    if (current === null || current.replace(/ /g, '') === '') {
      return toast.error('you need to have a name');
    }
    sessionStorage.setItem('public-chat--name', current);
    setName(nameRef.current.value);
  };
  const initialText = { name, content: '', date: null };
  const [text, setText] = useState(initialText);

  useEffect(() => {
    // base.post('messages', { data: messages });
    setName(sessionStorage.getItem('public-chat--name'));
    const ref = base.syncState(`${slug}/public-chat`, {
      context: {
        setState: ({ messages }) => setMessages({ ...messages }),
        state: { messages },
      },
      //   asArray: true,
      state: 'messages',
      then: (e) => {
        toast.success('listening');
      },
      onFailure: () => {
        toast.error('failure');
      },
    });
    console.log(ref);
    // return () => base.removeBinding(ref);
  }, []);

  const handleMessageUpdate = async () => {
    if (text.content === '') {
      return;
    }
    let textToSend = { ...text };
    textToSend.date = Date.now();
    // const the_messages = await base.fetch(`${slug}/public-chat`);
    base.post(`${slug}/public-chat/${Date.now()}--${name}`, {
      data: textToSend,
    });
    setText(initialText);
  };
  if (!name) {
    return (
      <div>
        {' '}
        <input ref={nameRef} type="text" />
        <button onClick={setTheName}> Set The Name</button>;
      </div>
    );
  }
  return (
    <ChatWrap>
      <ChatMessages>
        {messages &&
          Object.keys(messages).map((i) => (
            <SingleMessage
              name={messages[i].name}
              isMe={messages[i].name === name}
              content={messages[i].content}
              date={messages[i].date}
            />
          ))}
      </ChatMessages>
      <InputArea>
        <h3>{name}</h3>
        <MessageInput
          type="text"
          value={text.content}
          onChange={(e) => {
            const new_content = e.target.value;
            setText((prev) => ({ name, content: new_content }));
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleMessageUpdate();
            }
          }}
        />
        <SubmitChat onClick={handleMessageUpdate}> Post</SubmitChat>

        <button onClick={() => base.post(`${slug}/public-chat`, { data: {} })}>
          reset
        </button>
      </InputArea>
    </ChatWrap>
  );
};

PublicChat.propTypes = {};

export default PublicChat;
