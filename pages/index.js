import { gql, useQuery } from '@apollo/client';
import withApollo from '../lib/withApollo';
import { useEffect, useState, useRef } from 'react';
import EventSearch from 'components/globals/EventSearch';
import Header from 'components/globals/Header';
import Footer from 'components/globals/Footer';
import Page from 'components/template1/Page';
import Section from 'components/template1/Section';
import { theme } from 'components/globals/style';

import { Grid, Button } from '@material-ui/core';
import { InfoGrid } from 'components/globals/InfoGrid';

const Home = (props) => {
  const eventJobs = [];
  const [jobs, setJobs] = useState({ jobs: {} });
  const [headerHeight, setHeaderHeight] = useState('60vh');

  return (
    <Page theme={theme}>
      <Header title="MJP Events" height={headerHeight} />
      <Section>
        <Grid container>
          {/* <Grid item={true} md={7} alignContent="center">
              <EventSearch events={eventJobs} />
            </Grid> */}
          <Grid item={true} md={12} alignItems="flex-start">
            <InfoGrid />
          </Grid>
        </Grid>
      </Section>
      <Footer />
    </Page>
  );
};

export default withApollo(Home);
