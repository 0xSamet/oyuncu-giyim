import { gql } from "apollo-server-micro";

export default gql`
  type Page {
    id: ID
    name: String
    desktop_menu_id: Int
    mobile_menu_id: Int
    meta_title: String
    meta_description: String
    meta_keyword: String
    slug: String
  }
  type Query {
    pages: [Page!]
    page(slug: String): Page
  }
`;
