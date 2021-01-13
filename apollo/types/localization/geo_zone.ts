import { gql } from "apollo-server-micro";

export default gql`
  type ZonesType {
    country_id: ID!
    zone_id: ID!
  }
  type GeoZoneOnAdmin {
    id: ID!
    name: String!
    description: String
    sort_order: Int
    zones: [ZonesType!]
  }
  input GeoZoneZonesInputType {
    country_id: Int!
    zone_id: Int!
  }
  input addGeoZoneInput {
    name: String!
    description: String
    sort_order: Int
    zones: [GeoZoneZonesInputType!]
  }
  input updateGeoZoneInput {
    id: ID!
    name: String!
    description: String
    sort_order: Int
    zones: [GeoZoneZonesInputType!]
  }
  input GeoZoneInput {
    id: ID!
  }
  input deleteGeoZoneInput {
    id: ID!
  }
  type deleteGeoZoneResponse {
    success: Boolean!
  }

  type Query {
    geoZonesOnAdmin: [GeoZoneOnAdmin!]
    geoZoneOnAdmin(input: GeoZoneInput!): GeoZoneOnAdmin
  }
  type Mutation {
    addGeoZone(input: addGeoZoneInput!): GeoZoneOnAdmin
    updateGeoZone(input: updateGeoZoneInput!): GeoZoneOnAdmin
    deleteGeoZone(input: deleteGeoZoneInput!): deleteGeoZoneResponse!
  }
`;
