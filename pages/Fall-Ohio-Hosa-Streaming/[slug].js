import { Router, useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { fetchAPI } from "../../queries/fetch";

import React, { Component } from "react";
import { GET_ALL_EVENTS } from "../../queries/urlQueries";

import { theme } from "./style";

import Meta from "../globals/Meta";
import { Grid, Button } from "@material-ui/core";
import Admin from "./components/admin";
import Page from "../../components/template1/Page";
import Header from "../../components/template1/Header";
import Navbar from "../../components/template1/Navbar";
import Body from "../../components/template1/Body";
import VideoBox from "../../components/template1/VideoBox";
import Sidebar from "../../components/template1/Sidebar";
import Banner from "../../components/template1/Banner";
import Hero from "../../components/template1/Hero";
import Footer from "../../components/template1/Footer";
import ListItem from "../../components/template1/ListItem";
import Section from "../../components/template1/Section";
import ListItemSmall from "../../components/template1/ListItemSmall";
import EventSearch from "../../components/template1/EventSearch";
//This page is rendered for every event belonging to Event Job
const EventPage = ({ eventData }) => {
  const { EventName, id, client } = eventData;
  return (
    <Page theme={theme}>
      <Meta title={EventName}> </Meta>
      <Body>
        <Section title={EventName}>
          <Grid container={true} spacing={3}>
            <Grid item={true} md={12} sm={12}>
              <VideoBox />
            </Grid>
          </Grid>
          <Button>Back</Button>
        </Section>
      </Body>
    </Page>
  );
};

export async function getStaticProps({ params }) {
  // fetch data from CMS through params
  const post = await getBlogItem(params.slug);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [],
  };
}
export default EventPage;
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
EventPage.getInitialProps = async (ctx) => {
  const data = await fetchAPI(
    `query getMetaForEvent($slug : String!){
          events(where :{
            slug : $slug
          }){
            EventName
            isMainEvent
            client{
              ClientName
            }
          }
        }`,
    {
      variables: {
        slug: ctx.query.slug,
      },
    }
  );

  const eventData = await data.events[0];
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return { eventData };
};
