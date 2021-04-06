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
  position: relative;

  background-color: white;
  && button {
    display: inline;
  }
`;
const NameInput = styled.div`
  height: calc(100% - 100px);
  width: max-content;
  margin: auto;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  z-index: 100;
  font-size: 1.25rem;
  text-align: center;
  top: 0%;
  && input {
    text-align: center;
    font-size: 2rem;
    width: min-content;
    padding: 0.75rem;
  }
`;
const ChatMessages = styled.div`
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.25);
  scroll-behavior: smooth;
  padding: 0.75rem;
  &&.blurred {
    filter: blur(10px);
  }
  &&::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  max-height: 70%;
`;
const MessageInput = styled.textarea`
  background-color: #dedede;
  transition: all 0.2s;
  &&:focus {
    outline: none;
    background-color: white;
  }

  width: 100%;
  height: 100px;
  border: none;
  font-family: Roboto;
  color: black;
  padding: 0.5rem;
  font-size: 1rem;
`;

const InputArea = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #dedede;
  width: 100%;
  padding: 0.5rem;
`;

const PublicChat = ({ slug = 'test' }) => {
  const [messages, setMessages] = useState(null);
  const [name, setName] = useState(null);
  const nameRef = useRef();
  const chatMessageRef = useRef();

  const setTheName = () => {
    const current = nameRef.current.value;
    if (current === null || current.replace(/ /g, '') === '') {
      return toast.error('you need to have a name');
    }
    sessionStorage.setItem('public-chat--name', current);
    setName({
      displayName: current,
      uid: `${current}--${Math.ceil(Math.random(Date.now()) * 1000000000)}`,
    });
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

  useEffect(() => {
    chatMessageRef?.current?.scrollTo(0, 10000);
  }, [messages]);

  const handleMessageUpdate = async () => {
    if (text.content === '') {
      return;
    }
    let textToSend = { ...text };
    textToSend.date = Date.now();
    // const the_messages = await base.fetch(`${slug}/public-chat`);
    base.post(`${slug}/public-chat/${Date.now()}--${name.uid}`, {
      data: textToSend,
    });
    setText(initialText);
  };

  return (
    <ChatWrap>
      {name === null ? (
        <NameInput>
          <h3>Please Choose A Display Name</h3>
          <input ref={nameRef} type="text" />
          <br />
          <button onClick={setTheName}> Set The Name</button>
        </NameInput>
      ) : null}

      <ChatMessages
        ref={chatMessageRef}
        className={name === null ? 'blurred' : ''}
      >
        {messages &&
          Object.keys(messages).map((i) => (
            <SingleMessage
              name={messages[i].name.displayName}
              isMe={name !== null ? messages[i].name.uid === name?.uid : false}
              content={messages[i].content}
              date={messages[i].date}
            />
          ))}
      </ChatMessages>

      <InputArea>
        <h3>{name && name.displayName}</h3>
        <MessageInput
          placeholder={`Type your message here...`}
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

        <button
          onClick={() => {
            sessionStorage.clear();
            base.post(`${slug}/public-chat`, { data: {} });
          }}
        >
          reset
        </button>
      </InputArea>
    </ChatWrap>
  );
};

PublicChat.propTypes = {};

export default PublicChat;
