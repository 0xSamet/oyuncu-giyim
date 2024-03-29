import { gql } from "@apollo/client";

export const GET_DESKTOP_MENU = gql`
  query getDesktopMenu($language: String!) {
    desktopMenu(language: $language) {
      id
      sort_order
      is_divider
      status
      description {
        name
        href
        target
        icon_url
      }
    }
  }
`;

export const GET_DESKTOP_MENU_ADMIN = gql`
  query getDesktopMenuOnAdmin {
    desktopMenuOnAdmin {
      id
      sort_order
      status
      is_divider
      description {
        name
        href
        target
        icon_url
        language
      }
    }
  }
`;

export const GET_DESKTOP_MENU_ADMIN_ONE = gql`
  query getDesktopMenuOnAdminOne($input: DesktopMenuOnAdminOneInput!) {
    desktopMenuOnAdminOne(input: $input) {
      id
      sort_order
      is_divider
      status
      description {
        name
        href
        target
        icon_url
        language
      }
    }
  }
`;

export const GET_MOBILE_MENU = gql`
  query getMobileMenu($language: String!) {
    mobileMenu(language: $language) {
      id
      sort_order
      status
      description {
        name
        href
        target
        icon_url
      }
    }
  }
`;

export const GET_MOBILE_MENU_ADMIN = gql`
  query getMobileMenuOnAdmin {
    mobileMenuOnAdmin {
      id
      sort_order
      status
      description {
        name
        href
        target
        icon_url
        language
      }
    }
  }
`;

export const GET_MOBILE_MENU_ADMIN_ONE = gql`
  query getMobileMenuOnAdminOne($input: MobileMenuOnAdminOneInput!) {
    mobileMenuOnAdminOne(input: $input) {
      id
      sort_order
      status
      description {
        name
        href
        target
        icon_url
        language
      }
    }
  }
`;
