import base from 'lib/firebase/base';
import { fireBaseApp as fb } from 'lib/firebase/base';

import React, { useEffect } from 'react';
import { fetchAPI } from 'lib/api';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import Section from 'components/template1/Section';
import Footer from 'components/template1/Footer';
import { event_theme } from '../index';
import { useRouter } from 'next/router';
import { BackButton } from 'components/template1/Elements/';

const SingleExhibitor = (props) => {
  const router = useRouter();
  const { exhibitor, loggedIn, id } = props;

  const { event_job } = props.exhibitor.event;

  const now = new Date();
  const ident = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getUTCDate()}`;

  const base_url = `${event_job.eventUrl}/exhibitors/${exhibitor.id}-${exhibitor.FirstName}${exhibitor.LastName}`;
  const featured_url = `${event_job.eventUrl}/exhibitors/${exhibitor.id}-${exhibitor.FirstName}${exhibitor.LastName}/featured-message`;
  //get messages if they exist

  const [messages, addMessages] = React.useState({});

  // const [featuredMessage, changeFeaturedMessage] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  // const [loggedIn, setLoggedIn] = React.useState(false);
  const [showLoggedIn, setShowLoggedIn] = React.useState(false);

  const [question, changeQuestion] = React.useState('');
  const [errorBoxShow, setErrorBoxShow] = React.useState({
    isShowing: false,
    message: '',
  });

  useEffect(() => {
    base.fetch(`${base_url}/messages`, {
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
    if (loggedIn === 'true' && exhibitor.id === id) {
      base.post(`${base_url}/logged-in`, {
        data: true,
      });
      console.log('it is setting true');
      setShowLoggedIn(true);
    } else if (loggedIn == false) {
      base.post(`${base_url}/logged-in`, {
        data: false,
      });
    }
  }, []);

  useEffect(() => {
    //get the endpoint to show present
    base.listenTo(`${base_url}/logged-in`, {
      context: {
        setState: (showLoggedIn) => setShowLoggedIn(showLoggedIn),
        state: showLoggedIn,
      },
      then(data) {
        console.log(data);
        setShowLoggedIn(data);
      },
    });
  }, []);

  useEffect(() => {
    let ref = base.syncState(`${base_url}/messages/`, {
      context: {
        setState: ({ messages }) => addMessages({ ...messages }),
        state: { messages },
      },
      state: 'messages',
      then: setLoading(false),
    });
    // addMessages(ref.context.state.messages);
    return () => {
      base.removeBinding(ref);
    };
    // ref.then((result) => console.log(result));
  }, []);

  const addQuestion = (q, sender) => {
    // let currentMessages = { ...messages };
    let m = {};

    m[now] = {
      timestamp: Date.now(),
      id: `${now}`,
      public: false,
      featured: false,
      sender: sender.name,
      senderEmail: sender.email,
      message: q,
      response: '',
    };

    base.post(`${base_url}/messages/${now}`, {
      data: m[now],
    });
  };
  const updateMessage = (m, keyval = {}) => {
    let allMessages = { ...messages };
    let updated = allMessages[m];

    updated[keyval.key] = keyval.value;

    base.post(`${base_url}/messages/${m}`, {
      data: updated,
    });
  };

  const handleSelect = (m) => {
    //first change the message to public if it is not
    updateMessage([m.id], { key: 'public', value: true });
    //set message to featured
    updateMessage([m.id], { key: 'featured', value: true });
    //set others to not featured
    Object.keys(messages).map((message) => {
      if (messages[message].id !== m.id)
        updateMessage(message, { key: 'featured', value: false });
    });

    base.post(`${base_url}/featured-message`, {
      data: messages[m.id],
    });
  };

  const handleShowHide = (meta, info) => {
    let corres = Object.keys(messages).find(
      (message) => messages[message].timestamp === meta.timestamp
    );
    // console.log(meta);
    // if you select it to "hide" then it can no longer be featured
    if (info === false && meta.featured === true) {
      updateMessage(corres, { key: 'featured', value: false });
    }
    updateMessage(corres, { key: 'public', value: info });
  };

  const submitResponse = (message_id, value) => {
    console.log(value);
    updateMessage(message_id, { key: 'response', value: value });
    updateMessage(message_id, { key: 'public', value: true });
  };

  const logIn = (user, pass) => {
    fb.auth()
      .signInWithEmailAndPassword(user, pass)
      .catch(function (error) {
        // Handle Errors here.
        console.log(error.message);
        var errorCode = error.code;
        var errorMessage = error.message;

        // ...
      })
      .then(function (value) {
        if (value) {
          var now = new Date();
          var time = now.getTime();
          time += 3600 * 1000;
          now.setTime(time);
          document.cookie = `loggedIn=true; expires=${now.toUTCString()};`;
          // document.cookie = `loggedIn=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";`;
          document.cookie = `id=${exhibitor.id}; expires=${now.toUTCString()};`;
          router.reload();
          // handleLoggedIn(true);
        } else {
          displayError(
            'Your username and password did not match the credentials needed.'
          );
        }
      });
  };
  const displayError = (message) => {
    setErrorBoxShow({ isShowing: true, message: message });
    setTimeout(() => setErrorBoxShow({ isShowing: false, message: '' }), 2000);
  };
  const logOut = () =>
    fb
      .auth()
      .signOut()
      .then(function () {
        base.post(`${base_url}/logged-in`, {
          data: false,
        });
        document.cookie = `loggedIn=false;`;
        setShowLoggedIn(false);
        router.reload();
      })
      .catch(function (error) {
        displayError(error);
      });

  const ChatGrid = styled(Grid)`
    /* @media all and (max-width: 900px) {
      padding: 2em;
    } */
  `;
  const InRoom = styled.div`
    width: 80px;
    text-align: center;
    font-weight: 800;

    &&.true {
      border: 2px solid #2bef83;
      color: #2bef83;
    }
    &&.false {
      border: 2px solid #f2400f;
      color: #f2400f;
    }
  `;
  return (
    <Page theme={event_theme}>
      <Body>
        <Section minHeight={'100vh'}>
          <Grid container>
            <Grid item md={12} spacing={5}>
              <BackButton text="All Exhibitors" event_job={event_job} />
            </Grid>

            <Grid item md={4}>
              <h1>
                {exhibitor.FirstName} {exhibitor.LastName}
              </h1>

              <h2>{exhibitor.ExhibitName}</h2>
              <InRoom className={showLoggedIn == true ? 'true' : 'false '}>
                {showLoggedIn == true ? 'Present' : 'Absent'}
              </InRoom>
            </Grid>
            <Grid item md={8} xs={12}>
              <iframe
                height="500px"
                frameBorder="1px"
                width="100%"
                src={`${exhibitor.Website}`}
                title="Testing"
              ></iframe>
            </Grid>
          </Grid>
          <hr />
        </Section>
        <Footer></Footer>
      </Body>
    </Page>
  );
};

export default SingleExhibitor;

export async function getServerSideProps(ctx) {
  const data = await fetchAPI(
    `query getExhibitorDetail($id: String!){
        exhibitors(where: {
            id: $id 
        }) {
            FirstName
            LastName
            Company
            Website
            ExhibitName
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
  // const login = loggedIn;

  const exhibitor = await data.exhibitors[0];
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return { props: { exhibitor, loggedIn: false, id: ctx.query.exhibitor } };
}
