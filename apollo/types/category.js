export default `
  type Category {
    id: ID!
    parent_id: Int
    name: String!
    meta_title: String
    meta_description: String
    meta_keyword: String
    sort_order: Int!
    status: Boolean
    slug: String
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
    categories: [Category!]!
  }
  type Mutation {
    addCategory(input: addCategoryInput!): Category!
    updateCategory(input: updateCategoryInput!): Category!
    deleteCategory(input: deleteCategoryInput!): deleteCategoryResponse!
  }
`;
