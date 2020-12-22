import { gql } from "apollo-server-micro";

export default gql`
  type Language {
    id: ID!
    name: String
    code: String
    flag_code: String
    sort_order: Int
    status: Boolean
    is_default: Boolean
  }
  input deleteLanguageInput {
    id: ID!
  }
  input addLanguageInput {
    name: String!
    code: String!
    flag_code: String!
    sort_order: Int
    status: Boolean
  }
  input updateLanguageInput {
    id: ID!
    name: String!
    code: String!
    flag_code: String!
    sort_order: Int
    status: Boolean
  }
  type deleteLanguageResponse {
    success: Boolean!
  }
  type Query {
    languages: [Language]
    language(id: Int): Language
  }
  type Mutation {
    addLanguage(input: addLanguageInput!): Language
    updateLanguage(input: updateLanguageInput!): Language
    deleteLanguage(input: deleteLanguageInput!): deleteLanguageResponse!
  }
`;
