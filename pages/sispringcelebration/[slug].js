import { Router, useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { event_theme } from './index';
import { getEventMeta } from 'lib/api';
import Meta from 'components/globals/Meta';
import { Grid, Button } from '@material-ui/core';
import Page from '../../components/template1/Page';
import Body from '../../components/template1/Body';
import VideoBox from '../../components/template1/VideoBox';
import { UserContext } from 'lib/context/UserContext';
import Section from '../../components/template1/Section';

//This page is rendered for every event belonging to Event Job
const EventPage = ({ eventData }) => {
  const { EventName, id, client } = eventData;
  const { verify_event, loginState } = useContext(UserContext);

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    verify_event(eventData).then((res) => setVerified(res));
  }, []);

  return verified ? (
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
  ) : (
    <h2>not verified</h2>
  );
};

export default EventPage;
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
EventPage.getInitialProps = async (ctx) => {
  const data = await getEventMeta(ctx.query.slug);

  const eventData = await data;
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return { eventData };
};
