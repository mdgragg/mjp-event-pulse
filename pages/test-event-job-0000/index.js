import { useState } from "react";
import { useRouter } from 'next/router'
import  Link  from 'next/link'
import { useQuery, gql } from "@apollo/client";
// var array = require('lodash/array');
import  _  from 'lodash';

const testEvent1 = (props) => {
  const router = useRouter()
  const [testParam, setTestParam] = useState(0);

  const { loading, error, data } =  useQuery(GET_EVENT_META, {
    variables: { url: router.pathname.slice(1) },
  });

  let event_meta = {}
  if(!loading){  
    _.keys(data.eventJobs).map(answer => event_meta = data.eventJobs[answer])
  }

  console.log(event_meta)



  return (
    <div>
       { loading ? "loading..." 
       : 
       <div>
       <h1>{event_meta.EventJobName}</h1>
       <h1>Client: {!event_meta.client
       ? "No Client Yet"
        : event_meta.client.ClientName}</h1>
       </div>
        } 
      <h3>path: {router.pathname} </h3>
      <h4>Events: </h4>
      <ul> 
      {_.keys(event_meta.events).map(event => {
        const info = event_meta.events[event]
        return <li>
          <Link href={`${router.pathname}/${info.slug}`}> 
          {info.EventName}
          </Link>
          </li>

      })}
      </ul>
    </div>
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
  }
}
`;

export default testEvent1;
