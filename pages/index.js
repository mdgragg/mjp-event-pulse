import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import EventSearch from "./globals/EventSearch";
import Header from "./globals/Header";
import Footer from "./globals/Footer";
import Page from "../components/template1/Page";
import Section from "../components/template1/Section";
import { theme } from "./globals/style";
import { useRouter } from "next/router";
import { Grid, Button } from "@material-ui/core";
import { InfoGrid } from "./globals/InfoGrid"


export default function Home() {

  const { loading, data = {}, error } = useQuery(ALL_URL_QUERY);
  const eventJobs = [];
  const [jobs, setJobs] = useState({ jobs: {} });
  const [headerHeight, setHeaderHeight] = useState("100vh");

  if (!loading) {
    Object.keys(data.eventJobs).map((jobs) =>
      eventJobs.push(data.eventJobs[jobs])
    );
  }
  useEffect(() => {
    setJobs({ jobs: eventJobs });
    setTimeout(() => setHeaderHeight("30vh"), 500);
  }, []);

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
        <Header title="MJ Event Home" height={headerHeight} />
       
        <Section>
          <Grid container={true}> 
          <Grid item={true} md={7} alignContent="center">
        <EventSearch events={eventJobs} />
         
          </Grid>
          <InfoGrid/>
          </Grid>
        </Section>
        <Footer />
      </Page>
    );
  }
}

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
