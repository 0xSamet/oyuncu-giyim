import { gql } from "apollo-server-micro";

export default gql`
  type TaxRateOnAdmin {
    id: ID!
    name: String!
    sort_order: Int!
    type: String!
    rate: Float!
    geo_zone_id: Int!
  }
  input TaxRateInput {
    id: ID!
  }
  input addTaxRateInput {
    name: String!
    sort_order: Int
    type: String!
    rate: Float!
    geo_zone_id: Int!
  }
  input updateTaxRateInput {
    id: ID!
    name: String!
    sort_order: Int
    type: String!
    rate: Float!
    geo_zone_id: Int!
  }
  input deleteTaxRateInput {
    id: ID!
  }
  type deleteTaxRateResponse {
    success: Boolean!
  }
  type Query {
    taxRatesOnAdmin: [TaxRateOnAdmin!]
    taxRateOnAdmin(input: TaxRateInput!): TaxRateOnAdmin
  }
  type Mutation {
    addTaxRate(input: addTaxRateInput!): TaxRateOnAdmin
    updateTaxRate(input: updateTaxRateInput!): TaxRateOnAdmin
    deleteTaxRate(input: deleteTaxRateInput!): deleteTaxRateResponse!
  }
`;
