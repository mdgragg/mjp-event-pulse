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
          <Grid item={true} md={5} alignItems="flex-start">
          <h4>Streaming Support Information</h4>
          <p>
          Event pages work on most major browsers on Windows and macOS. We
          recommend using Google Chrome, Mozilla Firefox, or Safari when viewing
          a stream from your computer. It’s best to update your browser whenever
          possible. 
          </p><p> 
          Live video streamed is also viewable on most iOS and Android
          mobile browsers. When you arrive at the event page, click the play
          button on the player in the browser to open the live player. The same
          applies to any event whose live player is embedded on a different
          website. 
          </p><p> 
          <h4>System Requirements:  </h4>
          <ul> 
          <li>Windows 7 or higher</li>
         <li> Mac OS X 10.6 or higher </li> 
         </ul>
         <h4> Supported desktop browsers:  </h4>
          <ul> 
            <li>  Google Chrome 45+</li>
            <li> Mozilla Firefox
          49+</li>
            <li>  Safari 10+</li>
            <li>  Microsoft Edge 15+</li>
            <li> **Internet Explorer 11 - requires
          Flash plugin to be installed </li>
            </ul>
            <h4> Supported mobile browsers:  </h4>  
            <ul>
            <li>Chrome 45+ </li>
          <li>  Safari 10+ (iOS) </li>
          </ul>
           Internet Connection: 5-10mbps download speed is
          recommended. Check your connection at www.speedtest.net.
          
          </p>
          </Grid>
         
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
