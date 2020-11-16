export default `
  type DesktopMenu {
    id: ID
    name: String
    href: String
    target: String
    icon_url: String
    sort_order: Int
    is_divider: Boolean
  }
  type MobileMenu {
    id: ID
    name: String
    href: String
    target: String
    icon_url: String
    sort_order: Int
  }
  input updateDesktopMenuInput {
    id: ID!
    name: String!
    href: String!
    target: String!
    icon_url: String!
    sort_order: Int!
    is_divider: Boolean!
  }
  input addDesktopMenuInput {
    name: String!
    href: String!
    target: String!
    icon_url: String!
    is_divider: Boolean!
  }
  input deleteDesktopMenuInput {
    id: ID!
  }
  type deleteDesktopMenuResponse {
    success: Boolean!
  }
  input sortDesktopMenuInput {
    id: ID!
    sort_order: Int!
  }
  type sortDesktopMenuResponse {
    success: Boolean!
  }
  type Query {
    desktopMenu: [DesktopMenu!]!
    mobileMenu: [MobileMenu!]!
  }
  type Mutation {
    addDesktopMenu(input: addDesktopMenuInput): DesktopMenu
    updateDesktopMenu(input: updateDesktopMenuInput): DesktopMenu
    deleteDesktopMenu(input: deleteDesktopMenuInput): deleteDesktopMenuResponse!
    sortDesktopMenu(input: [sortDesktopMenuInput!]!): sortDesktopMenuResponse!
  }
`;
