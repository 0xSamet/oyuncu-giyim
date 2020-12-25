import { gql } from "apollo-server-micro";

export default gql`
  type PageDescription {
    name: String!
    description: String
    meta_title: String
    meta_description: String
    meta_keywords: String
    slug: String
  }
  type CategoryDescriptionOnAdmin {
    name: String!
    description: String
    meta_title: String
    meta_description: String
    meta_keywords: String
    slug: String
    language: String
  }
  type Page {
    id: ID!
    desktop_menu_id: Int
    mobile_menu_id: Int
    description: PageDescription
    slug: String
    sort_order: Int
    status: Boolean
  }
  type PageOnAdmin {
    id: ID!
    desktop_menu_id: Int
    mobile_menu_id: Int
    description: [CategoryDescriptionOnAdmin]
    sort_order: Int
    status: Boolean
  }
  input pageOnAdminInput {
    id: ID!
  }
  input PageInputLocalizedFields {
    name: String!
    description: String
    meta_title: String
    meta_description: String
    meta_keywords: String
    slug: String!
    language: String!
  }
  input addPageInput {
    sort_order: Int
    status: Boolean!
    desktop_menu_id: Int
    mobile_menu_id: Int
    description: [PageInputLocalizedFields!]!
  }
  input updatePageInput {
    id: ID!
    sort_order: Int
    status: Boolean!
    desktop_menu_id: Int
    mobile_menu_id: Int
    description: [PageInputLocalizedFields!]!
  }
  input deletePageInput {
    id: ID!
  }
  type deletePageResponse {
    success: Boolean!
  }
  type Query {
    pages: [Page!]
    page(slug: String!, language: String!): Page
    pagesOnAdmin: [PageOnAdmin!]!
    pageOnAdmin(input: pageOnAdminInput!): PageOnAdmin
  }
  type Mutation {
    addPage(input: addPageInput!): PageOnAdmin
    updatePage(input: updatePageInput!): PageOnAdmin
    deletePage(input: deletePageInput!): deletePageResponse!
  }
`;
