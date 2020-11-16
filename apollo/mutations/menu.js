import { gql } from "@apollo/client";

export const UPDATE_DESKTOP_MENU = gql`
  mutation updateDesktopMenu(
    $id: ID!
    $name: String!
    $href: String!
    $target: String!
    $icon_url: String!
    $sort_order: Int!
    $is_divider: Boolean!
  ) {
    updateDesktopMenu(
      input: {
        id: $id
        name: $name
        href: $href
        target: $target
        icon_url: $icon_url
        sort_order: $sort_order
        is_divider: $is_divider
      }
    ) {
      name
      href
      target
      icon_url
      sort_order
      is_divider
    }
  }
`;

export const ADD_DESKTOP_MENU = gql`
  mutation addDesktopMenu(
    $name: String!
    $href: String!
    $target: String!
    $icon_url: String!
    $is_divider: Boolean!
  ) {
    addDesktopMenu(
      input: {
        name: $name
        href: $href
        target: $target
        icon_url: $icon_url
        is_divider: $is_divider
      }
    ) {
      name
    }
  }
`;

export const SORT_DESKTOP_MENU = gql`
  mutation sortDesktopMenu($input: [sortDesktopMenuInput!]!) {
    sortDesktopMenu(input: $input) {
      success
    }
  }
`;

export const DELETE_DESKTOP_MENU = gql`
  mutation deleteDesktopMenu($input: deleteDesktopMenuInput!) {
    deleteDesktopMenu(input: $input) {
      success
    }
  }
`;
