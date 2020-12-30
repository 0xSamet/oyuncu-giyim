import { gql } from "apollo-server-micro";

export default gql`
  type asd {
    name: String
  }
  type OptionDescriptionOnAdmin {
    name: String
    language: String
  }
  type OptionValueDescriptionOnAdmin {
    name: String
    language: String
  }
  type OptionValueOnAdmin {
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
  input addOptionInput {
    type: String!
    description: [OptionDescriptionOnAdminInput!]!
    option_values: [OptionValueOnAdminInput!]!
    sort_order: Int
  }

  type Mutation {
    addOption(input: addOptionInput!): OptionOnAdmin
  }
`;
