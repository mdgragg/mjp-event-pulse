import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router'
import styles from "./testing.module.css"
import  Link  from 'next/link'
import { useQuery, gql } from "@apollo/client";
// var array = require('lodash/array');
import  _  from 'lodash';

const testEvent1 = (props) => {
  const router = useRouter()

  let event_meta = {}

  const { loading, error, data } =  useQuery(GET_EVENT_META, {
    variables: { url: router.pathname.slice(1) },
  });

  if(!loading){  
    _.keys(data.eventJobs).map(answer => 
      event_meta = data.eventJobs[answer])       
  }



  return (
    <div className={`single-event-wrapper ${styles.testing}`}>
       {loading 
        ? "loading..." 
        : 
        (
       
       <div>
        {event_meta.eventStatus === <h1>Preview</h1> ?  : <h1>No Preview</h1>}
       <h1>{event_meta.EventJobName}</h1>
       <h2>Client: {!event_meta.client 
        ? "No Client Yet"
        : 
        event_meta.client.ClientName}</h2>
       </div>
        } 
   
      <h3>path: {router.pathname} </h3>
      <div className = "all-events-wrapper">
      <h4>Events: </h4>

      <ul> 
      {_.keys(event_meta.events).map(event => {
        const info = event_meta.events[event]
        return <li key={info.id}>
          <Link href={`${router.pathname}/${info.slug}`} key={info.id}> 
          {info.EventName}
          </Link>
          </li>
      })}
      </ul>
      </div>
    </div>
    )
  );
};



const GET_EVENT_META = gql`
query getSingleEventJob($url : String!){
	eventJobs(where: {
    eventUrl: $url
  }){
    id
    EventJobName
    client{
      ClientName
    }
    events{
      EventName
      slug
      isMainEvent
  
    }
    sponsors{
      Name
      SponsorUrl
    }
    eventStatus{
      EventStatus
    }

  }
}
`;

export default testEvent1;
