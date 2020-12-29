import { gql } from "apollo-server-micro";

export default gql`
  type OptionType {
    id: ID!
    name: String!
    sort_order: Int!
  }
  input OptionTypeInput {
    id: ID!
  }
  input addOptionTypeInput {
    name: String!
    sort_order: Int
  }
  input updateOptionTypeInput {
    id: ID!
    name: String!
    sort_order: Int
  }
  input deleteOptionTypeInput {
    id: ID!
  }
  type deleteOptionTypeResponse {
    success: Boolean!
  }
  type Query {
    optionTypes: [OptionType!]
    optionType(input: OptionTypeInput!): OptionType
  }
  type Mutation {
    addOptionType(input: addOptionTypeInput!): OptionType
    updateOptionType(input: updateOptionTypeInput!): OptionType
    deleteOptionType(input: deleteOptionTypeInput!): deleteOptionTypeResponse!
  }
`;
