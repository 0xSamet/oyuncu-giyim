import { gql } from "@apollo/client";

export const ADD_DESKTOP_MENU = gql`
  mutation addDesktopMenu($input: addDesktopMenuInput!) {
    addDesktopMenu(input: $input) {
      id
    }
  }
`;

export const UPDATE_DESKTOP_MENU = gql`
  mutation updateDesktopMenu($input: updateDesktopMenuInput!) {
    updateDesktopMenu(input: $input) {
      id
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

export const SORT_DESKTOP_MENU = gql`
  mutation sortDesktopMenu($input: [sortDesktopMenuInput!]!) {
    sortDesktopMenu(input: $input) {
      success
    }
  }
`;

export const ADD_MOBILE_MENU = gql`
  mutation addMobileMenu($input: addMobileMenuInput!) {
    addMobileMenu(input: $input) {
      id
    }
  }
`;

export const UPDATE_MOBILE_MENU = gql`
  mutation updateMobileMenu($input: updateMobileMenuInput!) {
    updateMobileMenu(input: $input) {
      id
    }
  }
`;

export const DELETE_MOBILE_MENU = gql`
  mutation deleteMobileMenu($input: deleteMobileMenuInput!) {
    deleteMobileMenu(input: $input) {
      success
    }
  }
`;

export const SORT_MOBILE_MENU = gql`
  mutation sortMobileMenu($input: [sortMobileMenuInput!]!) {
    sortMobileMenu(input: $input) {
      success
    }
  }
`;
