import { gql } from "@apollo/client";

export const GET_DESKTOP_MENU = gql`
  query getDesktopMenu {
    desktopMenu {
      id
      name
      href
      icon_url
      sort_order
      is_divider
    }
  }
`;

export const GET_MOBILE_MENU = gql`
  query getMobileMenu {
    mobileMenu {
      id
      name
      href
      icon_url
      sort_order
    }
  }
`;
