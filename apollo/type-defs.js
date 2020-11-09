import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Menu {
    id: ID
    text: String
    icon: String
    sort_order: Int
  }
  type Page {
    id: ID
    text: String
    menu_index: Int
    meta_title: String
    meta_description: String
    meta_keyword: String
    slug: String
  }
  type Query {
    menu: [Menu!]!
    page: [Page!]!
  }
  type Mutation {
    addMenu(text: String): Menu
  }
`;
