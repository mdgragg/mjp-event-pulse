import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import EventSearch from "./globals/EventSearch"
import Header from "./globals/Header"
import Footer from "./globals/Footer"
import Page from "../components/template1/Page"
import { theme } from "./globals/style";
export default function Home() {
  
  const { loading, data = {}, error } = useQuery(ALL_URL_QUERY);
  // const eventJobs = data.eventJobs
  const eventJobs = [];
  const [jobs, setJobs] = useState({jobs: {}})

    if(!loading){ 
        Object.keys(data.eventJobs).map(jobs =>
        // setEventJobs(eventJobs[jobs] = data.eventJobs[jobs])  
          eventJobs.push(data.eventJobs[jobs])
        )
        // setEventJobs({jobs: data.eventJobs})
    }
    useEffect(()=>{
      setJobs({jobs : eventJobs})
    }, [])

  
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
        <Header title="MJ Event Home"/>
         <EventSearch events={eventJobs} />
         <Footer/>
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
      client{
        ClientName
      }
    }
  }
`;
