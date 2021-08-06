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
