import Head from "next/head";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      
    let jobArray = []
   
    
    jobArray.forEach(job => console.log(job))
    return (
      <div>
        <h1>All Event Jobs</h1>
      
        {eventJobs.map(j => (
          <div>
            Event: <a href={j.eventUrl}>{j.EventJobName}</a>
            <br />
            Client: {(j.client !== null) ?  j.client.ClientName : "no client"} 
            <br/>
            <br/>

          </div>
        ))}
      </div>
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
