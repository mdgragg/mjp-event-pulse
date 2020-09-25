import { gql } from '@apollo/client'

export const typeDefs = gql`
  type folder {
    id: ID!
    name: String!
  }

  type Query {
    folder: folder
  }
`