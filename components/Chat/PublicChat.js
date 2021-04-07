import base from 'lib/firebase/base';
import { fireBaseApp as fb } from 'lib/firebase/base';
import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import SingleMessage from './SingleMessage';

export const chat_colors = {
  blue: `#007ab8`,
};

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
  background-color: rgba(255, 255, 255, 0.5);
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

const Reactions = styled.div`
  font-size: 1.5rem;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  && span {
    display: inline-block;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    margin: 0 6px;
    text-shadow: 0px 2px 5px grey;
    cursor: pointer;
  }
  && span:hover {
    transform: scale(1.35);
    text-shadow: 0px 6px 5px grey;
  }
`;

const InputArea = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #dedede;
  width: 100%;
  padding: 0.5rem;
  && .input-area--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  && button.chat--send {
    color: white;
    width: 100px;
    background-color: ${() => chat_colors.blue};
  }
`;

const PublicChat = ({ slug = 'test' }) => {
  const [messages, setMessages] = useState(null);

  // name is : {name : some name, uid: name unique for chat}\
  const [name, setName] = useState(null);

  // easy way to reset the chat text box after you send
  const initialText = {
    name,
    content: '',
    date: null,
    type: 'text',
  };

  //textbox content
  const [text, setText] = useState(initialText);

  //reactions
  const reactions = ['😍', '🙌🏼', '😀', '😂'];

  // used to track if name is me or not
  const nameRef = useRef();

  // used to scroll
  const chatMessageRef = useRef();

  const setTheName = () => {
    const current = nameRef.current.value;

    if (current === null || current.replace(/ /g, '') === '') {
      return toast.error('you need to have a name');
    }

    const nameToSet = {
      displayName: current,
      uid: `${current}--${Math.ceil(Math.random(Date.now()) * 1000000000)}`,
    };

    sessionStorage.setItem('public-chat--name', JSON.stringify(nameToSet));
    setName(nameToSet);
    setText(initialText);
    grabMessages();
  };

  const grabMessages = () => {
    base.fetch(`${slug}/public-chat`, {
      then: (data) => {
        setMessages(data);
      },
    });
  };

  useEffect(() => {
    // base.post('messages', { data: messages });
    const retrievedName = JSON.parse(
      sessionStorage.getItem('public-chat--name')
    );
    if (
      retrievedName === null ||
      retrievedName.name === null ||
      retrievedName.uid === null
    ) {
      return setName(null);
    }
    setName(retrievedName);
    setText((prev) => ({ ...prev, name: retrievedName }));
    const ref = base.syncState(`${slug}/public-chat`, {
      context: {
        setState: ({ messages }) => setMessages({ ...messages }),
        state: { messages },
      },
      //   asArray: true,
      state: 'messages',
      then: (e) => {
        console.log('listening for messages');
      },
      onFailure: () => {
        toast.error('failure');
      },
    });
    return () => base.removeBinding(ref);
  }, []);

  //scroll to bottom on new message
  useEffect(() => {
    chatMessageRef?.current?.scrollTo(0, 10000);
  }, [messages]);

  const handleSendMessage = async (messageObject) => {
    return new Promise((resolve, reject) => {
      base.post(`${slug}/public-chat/${Date.now()}--${name.uid}`, {
        data: messageObject,
        then: (err) => resolve(err),
        onError: () => reject(),
      });
    });
  };
  const handleMessageUpdate = () => {
    if (text.content === '') {
      console.log(text.content);
      return;
    }
    let textToSend = { ...text, date: Date.now() };

    handleSendMessage(textToSend).then((err) => {
      if (err) return toast.error(err);
      return setText(initialText);
    });
  };

  const handleReaction = (reaction) => {
    let textToSend = {
      ...text,
      date: Date.now(),
      content: reaction,
      type: 'reaction',
    };

    handleSendMessage(textToSend).then((err) => {
      if (err) return toast.error(err);
      return setText(initialText);
    });
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
          Object.keys(messages).map((i, index) => (
            <SingleMessage
              key={`${index}--${messages[i].date}`}
              name={messages[i].name?.displayName}
              isMe={name !== null ? messages[i].name?.uid === name?.uid : false}
              content={messages[i].content}
              date={messages[i].date}
              type={messages[i].type}
            />
          ))}
      </ChatMessages>

      <InputArea>
        <div className="input-area--header">
          <h3>{name && name.displayName}</h3>
          <Reactions>
            {reactions.map((reaction) => (
              <span onClick={() => handleReaction(reaction)}>{reaction}</span>
            ))}
          </Reactions>
        </div>
        <MessageInput
          placeholder={`Type your message here...`}
          type="text"
          value={text.content}
          onChange={(e) => {
            const new_content = e.target.value;
            setText((prev) => ({ ...prev, content: new_content }));
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleMessageUpdate();
            }
          }}
        />
        <SubmitChat className="chat--send" onClick={handleMessageUpdate}>
          {' '}
          Send
        </SubmitChat>
        {/* <button
          onClick={() => {
            sessionStorage.clear();
            base.post(`${slug}/public-chat`, { data: {} });
          }}
        >
          reset
        </button> */}
      </InputArea>
    </ChatWrap>
  );
};

PublicChat.propTypes = {};

export default PublicChat;
