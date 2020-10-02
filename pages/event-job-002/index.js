import { useEffect, useState, useRef } from "react";
import { Router, useRouter } from "next/router";
import Head  from 'next/head'
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
// var array = require('lodash/array');
import _ from "lodash";
import { getEventMeta, getEventByUrl } from "../../lib/api";
import { Grid, Button } from "@material-ui/core";
import Admin from "./components/admin";
import Meta from "../globals/Meta";
import Page from "../../components/template1/Page";
import Header from "../../components/template1/Header";
import Navbar from "../../components/template1/Navbar";
import Body from "../../components/template1/Body";
import VideoBox from "../../components/template1/VideoBox";
import Sidebar from "../../components/template1/Sidebar";
import Banner from "../../components/template1/Banner";
import Hero from "../../components/template1/Hero";
import Footer from "../../components/template1/Footer";
import { theme } from "./style";
import ListItem from "../../components/template1/ListItem";
import Section from "../../components/template1/Section";
import ListItemSmall from "../../components/template1/ListItemSmall";
import EventSearch from "../../components/template1/EventSearch";

const testEvent1 = (props) => {
  const [isPreview, setPreview] = useState(
    props.meta.eventStatus.EventStatus === "Preview"
  );
  const router = useRouter();

  const [sidbarState, toggleSidebar] = useState(null);
  let event_meta = props.meta;

  let isAuthenticated = props.context.previewData.isAuthenticatedTEST;

  useEffect(() => {
    if (isAuthenticated) {
      setPreview(false);
    }
  });

  if (!isPreview) {
    return (
      <Page theme={theme}>
        <Meta title={event_meta.EventJobName}> </Meta>
        {/* <Header>
          <Navbar info={event_meta} />
        </Header> */}
        <Hero
          title={event_meta.EventJobName}
          bgImage="http://lorempixel.com/1500/500/"
        />
        <Body>
          <Section >
            <Grid container={true} spacing={3}>
              <Grid item={true} md={9}>
                <VideoBox />
              </Grid>
              <Grid item={true} md={3}>
                <Sidebar />
              </Grid>
            </Grid>
          </Section>

          <Banner image="http://lorempixel.com/1920/1080/"/>

          <Section showButton={true} title="Speakers">
            <Grid container={true} spacing={3} justify={"center"}>
              <ListItem md={4} />
              <ListItem md={4} />
              <ListItem md={4} />
            </Grid>
          </Section>
          <Section showButton={true} title="Sponsors">
            <Grid container={true} spacing={3} justify={"center"}>
              <ListItemSmall />
              <ListItemSmall />
              <ListItemSmall />
            </Grid>
          </Section>
          <EventSearch events={event_meta.events} />
          <Section></Section>
        </Body>
        <Footer>
          <div></div>
          <div className="signoff"><center>Copyright 2020 Mill James</center></div>
          <div></div>
        </Footer>
          
        <h3>path: {router.pathname} </h3>

       <ul>
          {_.keys(event_meta.events).map((event) => {
            const info = event_meta.events[event];
            return (
              <li key={info.id}>
                <Link href={`${router.pathname}/${info.slug}`}>
                  {info.EventName}
                </Link>
              </li>
            );
          })}
        </ul>
      </Page>
    );
  } else {
    return <Admin />;
  }
};

export async function getStaticProps(context) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.

  //get the event job data from our api
  let url;
  !context.previewData
    ? (url = Router.pathname)
    : (url = context.previewData.url);

  const eventData = await getEventMeta(url);

  //this is what will load as the "context" if we haven't come here through
  //our preview link
  const noctx = {
    preview: eventData.eventStatus.EventStatus === "Preview",
    previewData: {
      isAuthenticatedTEST: false,
    },
  };
  //set the context object to whatever our api is saying

  if (!context.preview) {
    context = noctx;
  }
  const values = {
    props: {
      context: context,
      //meta will be the props for the event
      meta: eventData,
    },
  };
  return values;
}

export default testEvent1;
