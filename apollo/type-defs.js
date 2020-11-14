import { gql } from "@apollo/client";

export const typeDefs = gql`
  type DesktopMenu {
    id: ID
    name: String
    href: String
    _target: String
    icon_url: String
    sort_order: Int
    is_divider: Boolean
  }
  type MobileMenu {
    id: ID
    name: String
    href: String
    _target: String
    icon_url: String
    sort_order: Int
  }
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
    desktopMenu: [DesktopMenu!]!
    mobileMenu: [MobileMenu!]!
    pages: [Page!]
    page(slug: String): Page
  }
  type Mutation {
    addMenu(text: String): DesktopMenu
  }
`;
