import { useEffect, useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import withApollo from 'lib/withApollo';
import { UserContext } from 'lib/context/UserContext';
import _ from 'lodash';
import { getEventMeta, getEventMetaMain, getMainEventMeta } from 'lib/api';
import styled from 'styled-components';

import { Grid, Button } from '@material-ui/core';
import LoginBox from 'components/globals/Login';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Header from 'components/template1/Header';
import Navbar from 'components/template1/Navbar';
import Body from 'components/template1/Body';
import VideoBox from 'components/template1/VideoBox';
import Sidebar from 'components/template1/Sidebar';
import Banner from 'components/template1/Banner';
import Hero from 'components/template1/Hero';
import Footer from 'components/template1/Footer';
import ListItem from 'components/template1/ListItem';
import { BlockNameBig, BlockName } from 'components/ListItems/BlockName';
import CircleName from 'components/ListItems/CircleName';
import CircleNameBig from 'components/ListItems/CircleNameBig';
import Section from 'components/template1/Section';
import ListItemSmall from 'components/template1/ListItemSmall';
import ChatBox from 'components/template1/ChatBox';
import cookies from 'next-cookies';
import LoginPage from 'components/globals/Login/LoginPage';
import GivingTherm from 'components/assets/GivingTherm';
import FormDialog from 'components/Forms/FormDialogue';

export const event_theme = {
  bg: '#2997a9',
  fontFamily: 'Roboto',
  secondary: '#2997a9',
  pink: '#cc4e9d',
  blue: '#00a6c9',
};

const VideoAreaHolder = styled.div`
  display: grid;
  width: inherit;
  align-content: flex-start;
  margin: 0 auto;
  grid-template-columns: 1fr 544px;
  grid-template-rows: auto;
  @media all and (max-width: 1220px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const Template1 = (props) => {
  Template1.getInitialProps = async () => {
    return;
  };
  const { loginState, verify_main_event } = useContext(UserContext);

  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [hasStarted, setStarted] = useState(false);
  const [verified, setVerified] = useState({ verified: false });

  let event_meta = props.meta;
  const main_event = props.meta.events[0];
  const { AuthRequired } = props.meta;
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const bgImage =
    main_event.KeyValue[0].value || 'http://lorempixel.com/1920/1080/';

  const calcDate = (d) => {
    let now = Date.now();
    if (dateStart < now) {
      setStarted(false);
    }
  };
  useEffect(() => {
    let now = Date.now();
    let dateStart = main_event.eventStartEnd.StartDateTime;
    if (dateStart < now) {
      setStarted(false);
    }
  }, []);

  useEffect(() => {
    if (AuthRequired) {
      verify_main_event(props.meta).then((result) => {
        setVerified({ verified: result });
      });
    }
  }, [loginState.loggedIn]);

  const MainPage = () => {
    return (
      <Page theme={event_theme}>
        <Meta title={event_meta.EventJobName}>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `(function(f,u,n,r,a,i,s,e){var data={window:window,document:document,tag:"script",data:"funraise",orgId:f,uri:u,common:n,client:r,script:a};var scripts;var funraiseScript;data.window[data.data]=data.window[data.data]||[];if(data.window[data.data].scriptIsLoading||data.window[data.data].scriptIsLoaded)return;data.window[data.data].loading=true;data.window[data.data].push("init",data);scripts=data.document.getElementsByTagName(data.tag)[0];funraiseScript=data.document.createElement(data.tag);funraiseScript.async=true;funraiseScript.src=data.uri+data.common+data.script+"?orgId="+data.orgId;scripts.parentNode.insertBefore(funraiseScript,scripts)})('0d6c4935-52e1-42dd-acd3-0a41cbac2c41','https://assets.funraise.io','/widget/common/2.0','/widget/client','/inject-form.js');`,
            }}
          ></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: ` window.funraise.push('create', { form: 15123 }, {
                selector: '#fr-placed-form-container-15123',
                type: 'grow_contained',
            });
          `,
            }}
          />
        </Meta>

        <Hero
          blur={0}
          hasStarted={hasStarted}
          title={event_meta.EventJobName}
          bgImage={bgImage}
          start={main_event.eventStartEnd.StartDateTime}
        ></Hero>

        <Body>
          <Section minHeight={`90vh`}>
            <VideoAreaHolder>
              <div>
                <VideoBox
                  isStarted={true}
                  src={
                    _.filter(main_event.streamLinks, (link) => {
                      return link.Service === 'Vimeo';
                    })[0].url
                  }
                />
                <GivingTherm />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',

                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    minHeight: '500px',
                  }}
                  id="fr-placed-form-container-15123"
                ></div>
                <div style={{ width: '100%', overflow: 'hidden' }}>
                  <p
                    style={{
                      color: 'white',
                      textAlign: 'center',

                      fontSize: '1.25rem',
                    }}
                  >
                    Need to make a pledge instead?{' '}
                    <FormDialog
                      endpoint={'https://grf-server-forms.herokuapp.com/sheet'}
                    />
                  </p>
                </div>
                <ChatBox
                  src={
                    _.filter(main_event.streamLinks, (link) => {
                      return link.Service === 'VimeoChat';
                    })[0].url
                  }
                />
              </div>
            </VideoAreaHolder>
          </Section>
          <Banner
            secondary={event_theme.blue}
            color={'white'}
            headerText={'Need help with making your gift or pledge?'}
          >
            <p>
              {' '}
              Call or text Nancy at <a href="tel:3236793797"> (323) 679-3797</a>
            </p>
          </Banner>

          <Section
            headerText="THANK YOU TO OUR 2021 GALA SPONSORS"
            title="Innovators Circle"
            headerColor={'white'}
          >
            <Grid
              container
              spacing={8}
              justify={'center'}
              style={{ marginTop: '2rem' }}
            >
              <Grid item md={4}>
                <BlockNameBig
                  bg={event_theme.pink}
                  textColor={'white'}
                  timeout={500}
                >
                  Edward Joseph Daly Foundation
                </BlockNameBig>
              </Grid>

              <Grid item md={4}>
                <BlockNameBig
                  bg={event_theme.pink}
                  textColor={'white'}
                  timeout={1000}
                >
                  Nancy and Patrick Forster
                </BlockNameBig>
              </Grid>

              <Grid item md={4}>
                <BlockNameBig
                  bg={event_theme.pink}
                  textColor={'white'}
                  timeout={1500}
                >
                  Megan Haller and Peter Rice Foundation
                </BlockNameBig>
              </Grid>
              <Grid item md={4}>
                <BlockNameBig
                  bg={event_theme.pink}
                  textColor={'white'}
                  timeout={2000}
                >
                  Charlot and Dennis E. Singleton
                </BlockNameBig>
              </Grid>
              <Grid item md={4}>
                <BlockNameBig
                  bg={event_theme.pink}
                  textColor={'white'}
                  timeout={2500}
                >
                  Mona and Edward Zander
                </BlockNameBig>
              </Grid>
            </Grid>
          </Section>

          <Section minHeight={'40vh'} title="Trailblazer">
            <Grid container spacing={3} justify={'center'}>
              <Grid item md={4}>
                <BlockName
                  bg={event_theme.blue}
                  textColor={'white'}
                  timeout={500}
                >
                  Allergan, an AbbVie Company
                </BlockName>
              </Grid>

              <Grid item md={4}>
                <BlockName
                  bg={event_theme.blue}
                  textColor={'white'}
                  timeout={1000}
                >
                  Wallace and Thomas Brunner
                </BlockName>
              </Grid>

              <Grid item md={4}>
                <BlockName
                  bg={event_theme.blue}
                  textColor={'white'}
                  timeout={1500}
                >
                  Flying L Partners
                </BlockName>
              </Grid>
            </Grid>
          </Section>
          <Section minHeight={'40vh'} headerColor={'white'} title="Visionary">
            <Grid container spacing={3} justify={'center'}>
              <Grid item md={4}>
                <CircleName textColor={'white'} timeout={500} noPic>
                  Cindy and Fred Brinkmann
                </CircleName>
              </Grid>
              <Grid item md={4}>
                <CircleName textColor={'white'} timeout={500} noPic>
                  Henry and Nancy DeNero
                </CircleName>
              </Grid>

              <Grid item md={4}>
                <CircleName textColor={'white'} timeout={1000} noPic>
                  Andrew G. Iwach, MD
                </CircleName>
              </Grid>
            </Grid>
          </Section>
          <Banner
            secondary={event_theme.secondary}
            color={'white'}
            headerText={'Our Mission'}
          >
            <h3>
              Cure glaucoma and restore vision through innovative research
            </h3>
          </Banner>
          <Section headerColor={'white'} showButton={false}>
            <center>
              <h2>ABOUT GLAUCOMA RESEARCH FOUNDATION</h2>
              <p
                style={{
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  maxWidth: '860px',
                }}
              >
                Glaucoma Research Foundation (GRF) is a national non-profit
                organization dedicated to finding a cure for glaucoma. For more
                than 40 years, Glaucoma Research Foundation has worked to
                advance sight-saving research and provide essential educational
                resources for patients. It funds critical research into glaucoma
                treatment, vision restoration, and a cure for glaucoma. It is
                also the leading source of information for glaucoma patients and
                their families. For more information on GRF programs,
                visit www.glaucoma.org.
              </p>
              <img
                src="https://storage.googleapis.com/mjp-stream-public/glaucoma-360-virtual-gala/grf_logo_white_on_transparent.png"
                style={{ width: '220px', margin: '2rem' }}
              />
            </center>
          </Section>
        </Body>
        <Footer>
          <div></div>
          <div className="signoff">
            <center>Copyright 2020 Mill James</center>
          </div>
          <div></div>
        </Footer>
      </Page>
    );
  };

  if (AuthRequired) {
    if (loginState.loggedIn && !verified.verified) {
      return (
        <Page theme={event_theme}>
          <LoginPage>
            <p>you are logged in but not verified for this event</p>
            <Link href="/me"> My Account</Link>
          </LoginPage>
        </Page>
      );
    }
    if (verified && loginState.loggedIn) {
      return <MainPage />;
    } else {
      return (
        <Page theme={event_theme}>
          <p>Please log in to view this event</p>
          <LoginPage />
        </Page>
      );
    }
  } else {
    return <MainPage />;
  }
};

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.

  //get the event job data from our api
  let url = ctx.req.url.slice(1);

  let eventData = await getEventMeta('glaucoma-360-virtual-gala');

  if (!eventData) {
    eventData = {};
  }

  //this is what will load as the "context" if we haven't come here through
  //our preview link

  //set the context object to whatever our api is saying

  const values = {
    props: {
      //meta will be the props for the event
      meta: eventData,
      mainEvent: eventData.events.filter((ev) => ev.isMainEvent === true)[0],
    },
  };
  return values;
}

export default withApollo(Template1);
