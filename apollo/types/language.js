export default `
  type Language {
    id: ID
    name: String
    code: String
    sort_order: Int
    status: Boolean
  }
  type Query {
    languages: [Language]!
  }
`;
