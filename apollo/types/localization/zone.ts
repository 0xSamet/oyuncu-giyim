import { gql } from "apollo-server-micro";

export default gql`
  type ZoneOnAdmin {
    id: ID!
    name: String!
    sort_order: Int
    status: Boolean
    country: CountryOnAdmin!
  }
  type Zone {
    id: ID!
    name: String!
    sort_order: Int
    status: Boolean
    country: Country!
  }
  input ZoneInput {
    id: ID!
  }
  input addZoneInput {
    sort_order: Int
    status: Boolean!
    name: String!
    country_id: Int!
  }
  input updateZoneInput {
    id: ID!
    sort_order: Int
    status: Boolean!
    name: String!
    country_id: Int!
  }
  input deleteZoneInput {
    id: ID!
  }
  type deleteZoneResponse {
    success: Boolean!
  }
  type Query {
    zonesOnAdmin: [ZoneOnAdmin!]
    zoneOnAdmin(input: ZoneInput!): ZoneOnAdmin
    zones(language: String!, country_id: Int!): [Zone!]
  }
  type Mutation {
    addZone(input: addZoneInput!): Zone
    updateZone(input: updateZoneInput!): Zone
    deleteZone(input: deleteZoneInput!): deleteZoneResponse!
  }
`;
