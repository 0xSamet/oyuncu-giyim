import { gql } from "apollo-server-micro";

export default gql`
  type OptionDescriptionOnAdmin {
    name: String
    language: String
  }
  type OptionValueDescriptionOnAdmin {
    name: String
    language: String
  }
  type OptionValueOnAdmin {
    id: ID!
    description: [OptionValueDescriptionOnAdmin!]!
    sort_order: Int
  }
  type OptionOnAdmin {
    id: ID!
    type: String!
    description: [OptionDescriptionOnAdmin!]!
    option_values: [OptionValueOnAdmin!]!
    sort_order: Int
  }

  input OptionDescriptionOnAdminInput {
    name: String!
    language: String!
  }
  input OptionValueDescriptionOnAdminInput {
    name: String!
    language: String!
  }
  input OptionValueOnAdminInput {
    description: [OptionValueDescriptionOnAdminInput!]!
    sort_order: Int
  }
  input optionOnAdminInput {
    id: ID!
  }
  input addOptionInput {
    type: String!
    description: [OptionDescriptionOnAdminInput!]!
    option_values: [OptionValueOnAdminInput!]!
    sort_order: Int
  }
  input updateOptionInput {
    id: ID!
    type: String!
    description: [OptionDescriptionOnAdminInput!]!
    option_values: [OptionValueOnAdminInput!]!
    sort_order: Int
  }
  input deleteOptionInput {
    id: ID!
  }
  type deleteOptionResponse {
    success: Boolean!
  }

  type Query {
    optionsOnAdmin: [OptionOnAdmin!]
    optionOnAdmin(input: optionOnAdminInput!): OptionOnAdmin
  }
  type Mutation {
    addOption(input: addOptionInput!): OptionOnAdmin
    updateOption(input: updateOptionInput!): OptionOnAdmin
    deleteOption(input: deleteOptionInput!): deleteOptionResponse!
  }
`;
