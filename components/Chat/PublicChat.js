import base from 'lib/firebase/base';
import { fireBaseApp as fb } from 'lib/firebase/base';
import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import SingleMessage from './SingleMessage';
import { TonalitySharp } from '@material-ui/icons';

export const chat_colors = {
  blue: `#007ab8`,
};

var badwordsArray = require('badwords/array');

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
  transition: all 0.2s ease;
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
  &&.sending {
    opacity: 0.9;
    user-select: none;
  }
`;

const PublicChat = ({ slug = 'test-2' }) => {
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

  const [sending, setSending] = useState(false);

  // used to track if name is me or not
  const nameRef = useRef();

  // used to scroll
  const chatMessageRef = useRef();

  const setTheName = () => {
    const current = nameRef.current.value;

    if (current === null || current.replace(/ /g, '') === '') {
      return toast.error('You must have a name to join!');
    }

    const nameToSet = {
      displayName: current,
      uid: `${current}--${Math.ceil(Math.random(Date.now()) * 1000000000)}`,
      userType: 'Attendee',
    };

    sessionStorage.setItem('public-chat--name', JSON.stringify(nameToSet));
    setName(nameToSet);
    setText(initialText);

    handleSendMessage({
      name: nameToSet,
      content: `${nameToSet.displayName} has joined the chat`,
      type: 'JoinLeave',
      date: Date.now(),
    });
  };

  const grabMessages = () => {
    console.log('grabbing messages...');
    base.fetch(`${slug}/public-chat`, {
      then: (data) => {
        setMessages(data);
      },
    });
  };

  useEffect(() => {
    grabMessages();
  }, [name]);

  useEffect(() => {
    grabMessages();
    // base.post('messages', { data: messages });

    const retrievedName = JSON.parse(
      sessionStorage.getItem('public-chat--name')
    );
    if (
      retrievedName === null ||
      retrievedName.name === null ||
      retrievedName.uid === null
    ) {
      console.log('The name is null');
      setName(null);
    }

    setName(retrievedName);
    setText((prev) => ({ ...prev, name: retrievedName }));

    const ref = base.listenTo(`${slug}/public-chat`, {
      context: {
        setState: ({ messages }) => setMessages({ ...messages }),
        state: { messages },
      },
      //   asArray: true,
      // state: 'messages',
      then(data) {
        grabMessages();
      },
    });

    return () => {
      base.removeBinding(ref);
    };
  }, []);

  //scroll to bottom on new message
  useEffect(() => {
    chatMessageRef?.current?.scrollTo(0, 10000);
  }, [messages]);

  const hasProfanity = (sentence) => {
    let sentence_array = sentence.split(' ');
    const sum = sentence_array.some((word) => badwordsArray.includes(word));
    return sum;
  };

  const handleSendMessage = async (messageObject) => {
    return new Promise((resolve, reject) => {
      if (!name && messageObject.type !== 'JoinLeave') {
        setText(initialText);
        return reject('You need a name to join the chat!');
      }
      if (hasProfanity(messageObject.content)) {
        return reject(
          'Your message goes against our community guidelines, please adjust your content and try again.'
        );
      }
      if (!messageObject.name) {
        messageObject.name = name;
      }
      base.post(
        `${slug}/public-chat/${Date.now()}--${messageObject.name.uid}`,
        {
          data: messageObject,
          then: (err) => {
            resolve(err);
            if (sending) {
              setSending(false);
            }
            grabMessages();
          }, //err only if there is one
        }
      );
    });
  };

  const handleMessageUpdate = () => {
    setSending(true);
    if (
      !text ||
      !text.content ||
      text.content == '' ||
      text.content === null ||
      text.content === '\n'
    ) {
      toast.error('No content to send');
      setText(initialText);
      setSending(false);
      return;
    }

    let textToSend = { ...text, date: Date.now() };

    // remove last enter
    if (textToSend.content.charAt(textToSend.content.length - 1) === '\n') {
      textToSend.content = textToSend.content.slice(
        0,
        textToSend.content.length - 1
      );
    }

    handleSendMessage(textToSend)
      .then((err) => {
        if (err) return console.error(err);
        setSending(false);
        grabMessages();
        return setText(initialText);
      })
      .catch((err) => toast.error(err));
  };

  const handleReaction = (reaction) => {
    let textToSend = {
      ...text,
      date: Date.now(),
      content: reaction,
      type: 'reaction',
    };

    handleSendMessage(textToSend)
      .then((err) => {
        if (err) return toast.error(err);
        grabMessages();
        return setText(initialText);
      })
      .catch((err) => toast.error(err));
  };

  return (
    <ChatWrap>
      {name === null ? (
        <NameInput>
          <h3>Please Choose A Display Name</h3>
          <input ref={nameRef} type="text" />
          <br />
          <button onClick={setTheName}>Join the Chat</button>
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

      <InputArea className={sending ? 'sending' : null}>
        <div className="input-area--header">
          <h3>{name && name.displayName}</h3>
          <Reactions>
            {reactions.map((reaction) => (
              <span
                key={`single--reaction-${reaction.toString()}`}
                onClick={() => handleReaction(reaction)}
              >
                {reaction}
              </span>
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleMessageUpdate();
            }
          }}
        />
        <SubmitChat className="chat--send" onClick={handleMessageUpdate}>
          {' '}
          Send
        </SubmitChat>
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
