import { gql } from "apollo-server-micro";

export default gql`
  type CountryDescription {
    name: String!
  }
  type CountryDescriptionOnAdmin {
    name: String!
    language: String
  }
  type Country {
    id: ID!
    description: CountryDescription
    sort_order: Int
    status: Boolean
  }
  type CountryOnAdmin {
    id: ID!
    description: [CountryDescriptionOnAdmin]
    sort_order: Int
    status: Boolean
  }
  input CountryOnAdminInput {
    id: ID!
  }
  input CountryInputLocalizedFields {
    name: String!
    language: String!
  }
  input addCountryInput {
    sort_order: Int
    status: Boolean!
    description: [CountryInputLocalizedFields!]!
  }
  input updateCountryInput {
    id: ID!
    sort_order: Int
    status: Boolean!
    description: [CountryInputLocalizedFields!]!
  }
  input deleteCountryInput {
    id: ID!
  }
  type deleteCountryResponse {
    success: Boolean!
  }
  type Query {
    countries(language: String!): [Country!]
    countriesOnAdmin: [CountryOnAdmin!]!
    countryOnAdmin(input: CountryOnAdminInput!): CountryOnAdmin
  }
  type Mutation {
    addCountry(input: addCountryInput!): CountryOnAdmin
    updateCountry(input: updateCountryInput!): CountryOnAdmin
    deleteCountry(input: deleteCountryInput!): deleteCountryResponse!
  }
`;
