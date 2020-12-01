export default `
  type Category {
    id: ID!
    name: String!
    sort_order: Int!
    parent_id: Int
    status: Boolean
    slug: String
    parents : [Category]
  }
  input addCategoryInput {
    name: String!
    parent_id: Int
    sort_order: Int
    status: Boolean
    slug: String
  }
  input updateCategoryInput {
    id: ID!
    name: String!
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
