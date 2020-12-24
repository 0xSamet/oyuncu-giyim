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
  input DesktopMenuOnAdminOneInput {
    id: ID!
  }
  input DesktopMenuLocalizedFields {
    name: String!
    href: String!
    target: String!
    icon_url: String!
    language: String!
  }
  input addDesktopMenuInput {
    sort_order: Int
    status: Boolean!
    is_divider: Boolean!
    description: [DesktopMenuLocalizedFields!]!
  }
  input updateDesktopMenuInput {
    id: ID!
    sort_order: Int
    status: Boolean!
    is_divider: Boolean!
    description: [DesktopMenuLocalizedFields!]!
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
  input MobileMenuOnAdminOneInput {
    id: ID!
  }
  input MobileMenuLocalizedFields {
    name: String!
    href: String!
    target: String!
    icon_url: String!
    language: String!
  }
  input addMobileMenuInput {
    sort_order: Int
    status: Boolean!
    description: [MobileMenuLocalizedFields!]!
  }
  input updateMobileMenuInput {
    id: ID!
    sort_order: Int
    status: Boolean!
    description: [MobileMenuLocalizedFields!]!
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
    desktopMenu(language: String!): [DesktopMenu!]
    desktopMenuOnAdmin: [DesktopMenuOnAdmin!]
    desktopMenuOnAdminOne(
      input: DesktopMenuOnAdminOneInput!
    ): DesktopMenuOnAdmin
    mobileMenu(language: String!): [MobileMenu!]
    mobileMenuOnAdmin: [MobileMenuOnAdmin!]
    mobileMenuOnAdminOne(input: MobileMenuOnAdminOneInput!): MobileMenuOnAdmin
  }
  type Mutation {
    addDesktopMenu(input: addDesktopMenuInput!): DesktopMenuOnAdmin
    updateDesktopMenu(input: updateDesktopMenuInput!): DesktopMenuOnAdmin
    deleteDesktopMenu(
      input: deleteDesktopMenuInput!
    ): deleteDesktopMenuResponse!
    sortDesktopMenu(input: [sortDesktopMenuInput!]!): sortDesktopMenuResponse!
    addMobileMenu(input: addMobileMenuInput!): MobileMenuOnAdmin
    updateMobileMenu(input: updateMobileMenuInput!): MobileMenuOnAdmin
    deleteMobileMenu(input: deleteMobileMenuInput!): deleteMobileMenuResponse!
    sortMobileMenu(input: [sortMobileMenuInput!]!): sortMobileMenuResponse!
  }
`;
