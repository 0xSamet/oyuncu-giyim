import { gql } from "apollo-server-micro";

export default gql`
  type CategoryDescription {
    name: String
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
    slug: String!
    language: String!
  }
  type Category {
    id: ID!
    parent_id: Int
    description: CategoryDescription
    sort_order: Int!
    status: Boolean
    desktop_menu_id: Int
    mobile_menu_id: Int
    parents: [Category]
  }
  type CategoryOnAdmin {
    id: ID!
    parent_id: Int
    description: [CategoryDescriptionOnAdmin]
    sort_order: Int!
    status: Boolean
    desktop_menu_id: Int
    mobile_menu_id: Int
    parents: [CategoryOnAdmin]
  }
  input CategoryInputLocalizedFields {
    name: String!
    description: String
    meta_title: String
    meta_description: String
    meta_keywords: String
    slug: String!
    language: String!
  }
  input addCategoryInput {
    parent_id: Int
    sort_order: Int
    status: Boolean
    desktop_menu_id: Int
    mobile_menu_id: Int
    description: [CategoryInputLocalizedFields!]!
  }
  input updateCategoryInput {
    id: ID!
    parent_id: Int
    sort_order: Int
    status: Boolean
    desktop_menu_id: Int
    mobile_menu_id: Int
    description: [CategoryInputLocalizedFields!]!
  }
  type updateCategoryResponse {
    success: Boolean!
  }
  input deleteCategoryInput {
    id: ID!
  }
  type deleteCategoryResponse {
    success: Boolean!
  }
  type Query {
    categories(language: String!): [Category!]!
    categoriesOnAdmin: [CategoryOnAdmin!]!
  }
  type Mutation {
    addCategory(input: addCategoryInput!): CategoryOnAdmin!
    updateCategory(input: updateCategoryInput!): CategoryOnAdmin!
    deleteCategory(input: deleteCategoryInput!): deleteCategoryResponse!
  }
`;
