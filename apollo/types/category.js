export default `
  type CategoryDescription {
    name: String
    description: String
    meta_title: String
    meta_description: String
    meta_keywords: String
    slug: String
  }
  type Category {
    id: ID!
    parent_id: Int
    description: CategoryDescription
    sort_order: Int!
    status: Boolean
    parents : [Category]
  }
  input addCategoryInput {
    name: String!
    meta_title: String!
    meta_description: String!
    meta_keyword: String!
    parent_id: Int
    sort_order: Int
    status: Boolean
    slug: String
  }
  input updateCategoryInput {
    id: ID!
    name: String!
    meta_title: String!
    meta_description: String!
    meta_keyword: String!
    parent_id: Int
    sort_order: Int
    status: Boolean
    slug: String
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
    categories(language: String): [Category!]!
  }
  type Mutation {
    addCategory(input: addCategoryInput!): Category!
    updateCategory(input: updateCategoryInput!): Category!
    deleteCategory(input: deleteCategoryInput!): deleteCategoryResponse!
  }
`;
