import { gql, useQuery } from "@apollo/client";
import withApollo from "../lib/withApollo";
import { useEffect, useState, useRef } from "react";
import EventSearch from "components/globals/EventSearch";
import Header from "components/globals/Header";
import Footer from "components/globals/Footer";
import Page from "components/template1/Page";
import Section from "components/template1/Section";
import { theme } from "components/globals/style";

import { Grid, Button } from "@material-ui/core";
import { InfoGrid } from "components/globals/InfoGrid";

const Home = (props) => {
  const { loading, data, error } = useQuery(ALL_URL_QUERY);
  const eventJobs = [];
  const [jobs, setJobs] = useState({ jobs: {} });
  const [headerHeight, setHeaderHeight] = useState("100vh");

  if (data) {
    console.log(data);
    Object.keys(data.eventJobs).map((jobs) =>
      eventJobs.push(data.eventJobs[jobs])
    );
  }
  useEffect(() => {
    setJobs({ jobs: eventJobs });
    setTimeout(() => setHeaderHeight("30vh"), 500);
  }, [loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return (
      <p>
        {" "}
        There was an error loading the content. Please contact system provider.{" "}
        <br />
        Error message: <strong> {error.message}</strong>
      </p>
    );
  } else {
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
  }
};

const ALL_URL_QUERY = gql`
  query jobs {
    eventJobs {
      id
      eventUrl
      EventJobName
      client {
        ClientName
      }
    }
  }
`;

export default withApollo(Home);
