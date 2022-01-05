import { gql } from "apollo-server-micro";

export default gql`
  type StockStatusOnAdmin {
    id: ID!
    name: String!
    language: String!
  }
  input addStockStatusInput {
    name: String!
    language: String!
  }
  input updateGeoZoneInput {
    id: ID!
    name: String!
    language: String!
  }
  input StockStatusInput {
    id: ID!
  }
  input deleteStockStatusInput {
    id: ID!
  }
  type deleteStockStatusResponse {
    success: Boolean!
  }

  type Query {
    stockStatussesOnAdmin: [StockStatusOnAdmin!]
    stockStatusOnAdmin(input: StockStatusInput!): [StockStatusOnAdmin!]
  }
  type Mutation {
    addStockStatus(input: [addStockStatusInput!]!): [StockStatusOnAdmin!]
    updateStockStatus(input: [updateGeoZoneInput!]!): [StockStatusOnAdmin!]
    deleteStockStatus(
      input: deleteStockStatusInput!
    ): deleteStockStatusResponse!
  }
`;
