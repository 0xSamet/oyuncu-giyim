import { gql } from "apollo-server-micro";

export default gql`
  type TaxRulesOnAdmin {
    id: ID!
    tax_class_id: ID!
    tax_rate_id: ID!
    priority: Int!
  }
  type TaxClassOnAdmin {
    id: ID!
    name: String!
    description: String!
    sort_order: Int!
    tax_rules: [TaxRulesOnAdmin!]
  }
  input TaxClassInput {
    id: ID!
  }
  input TaxRulesInput {
    tax_rate_id: ID!
    priority: Int!
  }
  input addTaxClassInput {
    name: String!
    description: String!
    sort_order: Int
    tax_rules: [TaxRulesInput!]
  }
  input updateTaxClassInput {
    id: ID!
    name: String!
    description: String!
    sort_order: Int
    tax_rules: [TaxRulesInput!]
  }
  input deleteTaxClassInput {
    id: ID!
  }
  type deleteTaxClassResponse {
    success: Boolean!
  }
  type Query {
    taxClassesOnAdmin: [TaxClassOnAdmin!]
    taxClassOnAdmin(input: TaxClassInput!): TaxClassOnAdmin
  }
  type Mutation {
    addTaxClass(input: addTaxClassInput!): TaxClassOnAdmin
    updateTaxClass(input: updateTaxClassInput!): TaxClassOnAdmin
    deleteTaxClass(input: deleteTaxClassInput!): deleteTaxClassResponse!
  }
`;
