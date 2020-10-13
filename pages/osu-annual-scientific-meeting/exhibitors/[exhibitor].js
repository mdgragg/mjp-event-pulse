import base from "lib/firebase/base";

import React, { useEffect, setState, useRef } from "react";
import { fetchAPI } from "lib/api/";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Page from "components/template1/Page";
import Body from "components/template1/Body";
import Section from "components/template1/Section";
import Footer from "components/template1/Footer";
import Message from "components/template1/ChatBox/Message";
import CurrentMessage from "components/template1/ChatBox/CurrentMessage";
import LoggedIn from "components/template1/ChatBox/LoggedIn";

import { theme } from "../style";
import { useRouter } from "next/router";

const SingleExhibitor = (props) => {
  const router = useRouter();
  const { exhibitor } = props;
  const { event_job } = props.exhibitor.event;

  const now = new Date();
  const ident = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getUTCDate()}`;

  const base_url = `${event_job.eventUrl}/exhibitors/${exhibitor.id}-${exhibitor.FirstName}${exhibitor.LastName}/messages`;
  //get messages if they exist

  const [messages, addMessages] = React.useState({});
  const [question, changeQuestion] = React.useState("question");
  const [featuredMessage, changeFeaturedMessage] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [currentMessage, getCurrentMessage] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  // const messageHook = useMessageHook({});

  const handleMessage = (e) => {
    changeQuestion(e.target.value);
  };

  const updateMessage = (m, keyval = {}) => {
    let updated = messages[m];

    updated[keyval.key] = keyval.value;
    base.post(`${base_url}/${ident}/${m}`, {
      data: updated,
    });
  };

  const addMessage = () => {
    let currentMessages = { ...messages };
    let m = {};

    m[now] = {
      timestamp: Date.now(),
      id: `${now}`,
      public: false,
      featured: false,
      sender: "test",
      message: question,
      response: "",
    };
    // addMessages(m);
    // base
    changeQuestion("");
    base.post(`${base_url}/${ident}/${now}`, {
      data: m[now],
    });

    // addMessages(currentMessages);
  };
  const isInit = React.useRef(true);

  useEffect(() => {
    base.fetch(`${base_url}/${ident}`, {
      context: {
        setState: ({ messages }) => addMessages({ ...messages }),
        state: { messages },
      },
      then(data) {
        addMessages(data);
      },
    });
  }, []);

  useEffect(() => {
    let ref = base.syncState(`${base_url}/${ident}/`, {
      context: {
        setState: ({ messages }) => addMessages({ ...messages }),
        state: { messages },
      },
      state: "messages",
      then: setLoading(false),
    });
    // addMessages(ref.context.state.messages);
    return () => {
      base.removeBinding(ref);
    };
    // ref.then((result) => console.log(result));
  }, []);

  useEffect(() => {
    let result = [];
    Object.keys(messages).map((m) => {
      if (messages[m].featured) {
        result.push(messages[m]);
      }
    });
    getCurrentMessage(result);
  }, [messages]);

  const handleSelect = (m) => {
    //first change the message to public if it is not
    updateMessage([m.id], { key: "public", value: true });
    //set message to featured
    updateMessage([m.id], { key: "featured", value: true });
    //set others to not featured
    Object.keys(messages).map((message) => {
      if (messages[message].id !== m.id)
        updateMessage(message, { key: "featured", value: false });
    });

    base.post(`${base_url}/featured-message`, {
      data: messages[m.id],
    });
  };

  const handleShowHide = (meta, info) => {
    let corres = Object.keys(messages).find(
      (message) => messages[message].timestamp === meta.timestamp
    );
    // if you select it to "hide" then it can no longer be featured
    if (info === false && meta.featured === true) {
      updateMessage(corres, { key: "featured", value: false });
    }
    updateMessage(corres, { key: "public", value: info });
  };

  const handleResponse = (e, message_id) => {
    let allMessages = { ...messages };
    allMessages[message_id].response = e.target.value;

    addMessages({ ...allMessages });
  };
  const submitResponse = (message_id) => {
    let response = messages[message_id].response;

    updateMessage(message_id, { key: "response", value: response });
  };

  const ChatGrid = styled(Grid)`
    /* @media all and (max-width: 900px) {
      padding: 2em;
    } */
  `;

  return (
    <Page theme={theme}>
      <Body>
        <Section minHeight={"100vh"}>
          <h1>
            {exhibitor.FirstName} {exhibitor.LastName}
          </h1>
          <h2>{event_job.EventJobName}</h2>
          <label htmlFor="logged-in">Logged In</label>
          <input
            type="radio"
            name="authenticate"
            id="logged-in"
            onChange={(e) => {
              setLoggedIn(true);
            }}
          />
          <label htmlFor="logged-out">Logged Out</label>
          <input
            type="radio"
            name="authenticate"
            id="logged-out"
            onChange={(e) => {
              setLoggedIn(false);
            }}
          />
          <hr />

          <ChatGrid container={true}>
            <Grid item={true} md={6}>
              <h2>Pinned Question From: {currentMessage[0]?.sender} </h2>
              <CurrentMessage message={currentMessage} />

              <h2>All Other Questions:</h2>
              {Object.keys(messages).map((message) => {
                if (messages[message].public && !messages[message].featured) {
                  return <CurrentMessage message={[messages[message]]} />;
                }
              })}
              <input
                type="text"
                onChange={handleMessage}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    addMessage();
                  }
                }}
                value={question}
              />
              <button onClick={addMessage}>AddMessage</button>
            </Grid>
            <Grid item={true} md={6}>
              {loggedIn ? (
                <>
                  <h2>Only You Can See this {exhibitor.FirstName} </h2>
                  <LoggedIn
                    handleSelect={handleSelect}
                    handleShowHide={handleShowHide}
                    handleResponse={handleResponse}
                    handleMessage={handleMessage}
                    addMessage={addMessage}
                    messages={messages}
                    question={question}
                  />
                </>
              ) : (
                <h2>You Are Not Logged In</h2>
              )}
            </Grid>
          </ChatGrid>
        </Section>
        <Footer></Footer>
      </Body>
    </Page>
  );
};

export default SingleExhibitor;

SingleExhibitor.getInitialProps = async (ctx) => {
  const data = await fetchAPI(
    `query getExhibitorDetail($id: String!){
        exhibitors(where: {
            id: $id 
        }) {
            FirstName
            LastName
            Company
            Website
            id
            Website
            Email
            event {
              EventName
              slug
              event_job{
                eventUrl
                jobId
                EventJobName

              }
            }
            Attachments{
              name
              url
              size
              ext
            }
          }
      }`,
    {
      variables: {
        id: ctx.query.exhibitor,
      },
    }
  );

  const exhibitor = await data.exhibitors[0];
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return { exhibitor };
};
