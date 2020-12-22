import { gql } from "apollo-server-micro";

export default gql`
  type DesktopMenuDescription {
    name: String
    href: String
    target: String
    icon_url: String
  }
  type DesktopMenuDescriptionOndmin {
    name: String
    href: String
    target: String
    icon_url: String
    language: String!
  }
  type DesktopMenu {
    id: ID!
    sort_order: Int
    is_divider: Boolean
    status: Boolean
    description: DesktopMenuDescription
  }
  type DesktopMenuOnAdmin {
    id: ID!
    sort_order: Int
    is_divider: Boolean
    status: Boolean
    description: [DesktopMenuDescriptionOndmin]
  }
  type MobileMenuDescription {
    name: String
    href: String
    target: String
    icon_url: String
  }
  type MobileMenuDescriptionOnAdmin {
    name: String
    href: String
    target: String
    icon_url: String
    language: String!
  }
  type MobileMenu {
    id: ID!
    sort_order: Int
    status: Boolean
    description: MobileMenuDescription
  }
  type MobileMenuOnAdmin {
    id: ID!
    sort_order: Int
    status: Boolean
    description: [MobileMenuDescriptionOnAdmin]
  }
  input addDesktopMenuInput {
    name: String!
    href: String!
    target: String!
    icon_url: String!
    is_divider: Boolean!
  }
  type addDesktopMenuResponse {
    success: Boolean!
  }
  input updateDesktopMenuInput {
    id: ID!
    name: String
    href: String
    target: String
    icon_url: String
    is_divider: Boolean!
  }
  type updateDesktopMenuResponse {
    success: Boolean!
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
  input addMobileMenuInput {
    name: String!
    href: String!
    target: String!
    icon_url: String!
  }
  type addMobileMenuResponse {
    success: Boolean!
  }
  input updateMobileMenuInput {
    id: ID!
    name: String
    href: String
    target: String
    icon_url: String
  }
  type updateMobileMenuResponse {
    success: Boolean!
  }
  input deleteMobileMenuInput {
    id: ID!
  }
  type deleteMobileMenuResponse {
    success: Boolean!
  }
  input sortMobileMenuInput {
    id: ID!
    sort_order: Int!
  }
  type sortMobileMenuResponse {
    success: Boolean!
  }
  type Query {
    desktopMenu(language: String!): [DesktopMenu!]!
    desktopMenuOnAdmin: [DesktopMenuOnAdmin!]!
    mobileMenu(language: String!): [MobileMenu!]!
    mobileMenuOnAdmin: [MobileMenuOnAdmin!]!
  }
  type Mutation {
    addDesktopMenu(input: addDesktopMenuInput!): addDesktopMenuResponse!
    updateDesktopMenu(
      input: updateDesktopMenuInput!
    ): updateDesktopMenuResponse!
    deleteDesktopMenu(
      input: deleteDesktopMenuInput!
    ): deleteDesktopMenuResponse!
    sortDesktopMenu(input: [sortDesktopMenuInput!]!): sortDesktopMenuResponse!
    addMobileMenu(input: addMobileMenuInput!): addMobileMenuResponse!
    updateMobileMenu(input: updateMobileMenuInput!): updateMobileMenuResponse!
    deleteMobileMenu(input: deleteMobileMenuInput!): deleteMobileMenuResponse!
    sortMobileMenu(input: [sortMobileMenuInput!]!): sortMobileMenuResponse!
  }
`;
