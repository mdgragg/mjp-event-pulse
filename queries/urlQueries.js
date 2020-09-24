import { gql } from '@apollo/client'

export const ALL_URL_QUERY = gql`
 query jobs{
        eventJobs{
          id
          eventUrl
          EventJobName
        }
}
  `;

export const GET_ALL_EVENTS = gql`
query getAllEventsForJob($eventUrl: String!){
    events(where: {
        event_job : {
        eventUrl : $eventUrl
        }
    }){
        EventName
        event_job{
        eventUrl
        }
    }
    }
`;