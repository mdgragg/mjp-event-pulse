// import { gql, useQuery } from '@apollo/client';
// import withApollo from '../lib/withApollo';
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
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_TEST_VAR);
  }, []);
  return (
    <Page theme={theme}>
      <Header
        title="MJP Events"
        height={headerHeight}
        image="https://storage.googleapis.com/mjp-stream-public/Screen%20Shot%202021-05-17%20at%2010.17.24%20AM.png"
      />
      <Section>
        <Grid container alignItems="flex-start">
          <Grid item md={12}>
            <InfoGrid />
          </Grid>
        </Grid>
      </Section>
      <Footer />
    </Page>
  );
};

export default Home;
