import { gql } from 'apollo-boost';

export const GET_MAIN_EVENT_META = gql`
  query getMainEvent($id: ID!) {
    eventJob(id: $id) {
      events(where: { isMainEvent: true }) {
        isMainEvent
        exhibitors {
          Company
          Website
        }
        EventName
        sponsors {
          Tier {
            TierChoice
          }
          Name
          SponsorDescription
        }
        streamLinks {
          url
          Service
        }
        eventStartEnd {
          StartDateTime
          EndDateTime
        }
        slug
      }
    }
  }
`;
