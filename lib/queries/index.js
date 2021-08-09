import { gql } from '@apollo/client';

export const SPONSOR_QUERY = gql`
  query Sponsors($id: Int!) {
    events(where: { id: $id }) {
      Sponsors {
        id
        SponsorName
        SponsorLink
        SponsorTier
        Description
        Logo {
          name
          url
        }
      }
    }
  }
`;

export const GET_EXHIBITORS = gql`
  query ($slug: String!) {
    events(where: { event_job: { eventUrl_eq: $slug } }) {
      exhibitors {
        id
        ExhibitName
        Company
        FirstName
        LastName
        Email
        Attachments {
          name
          url
          size
        }
      }
    }
  }
`;
