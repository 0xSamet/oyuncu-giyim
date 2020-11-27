export default `
  type Category {
    id: ID!
    name: String!
    sort_order: Int!
    parent_id: Int
    parents : [Category]
  }
  input addCategoryInput {
    name: String!
    parent_id: Int
    sort_order: Int
  }
  type addCategoryResponse {
    success: Boolean!
  }
  input updateCategoryInput {
    id: ID!
    name: String!
    parent_id: Int
    sort_order: Int
  }
  type updateCategoryResponse {
    success: Boolean!
  }
  type Query {
    categories: [Category!]!
  }
  type Mutation {
    addCategory(input: addCategoryInput!): addCategoryResponse!
    updateCategory(input: updateCategoryInput!): updateCategoryResponse!
  }
`;
