export default `
  type Category {
    id: ID!
    name: String!
    sort_order: Int!
    parent_id: Int
    parent: Category
  }
  type Query {
    categories: [Category!]!
  }
`;
