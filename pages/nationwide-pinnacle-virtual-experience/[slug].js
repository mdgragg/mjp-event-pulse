import { Router, useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import React, { Component } from 'react';

import { event_theme } from './index';

import Meta from 'components/globals/Meta';
import { Grid, Button } from '@material-ui/core';

import Page from '../../components/template1/Page';

import Body from '../../components/template1/Body';
import VideoBox from '../../components/template1/VideoBox';

import Section from '../../components/template1/Section';

//This page is rendered for every event belonging to Event Job
const EventPage = ({ eventData }) => {
  const { EventName, id, client } = eventData;
  return (
    <Page theme={event_theme}>
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
