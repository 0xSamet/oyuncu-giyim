import { gql } from "@apollo/client";

export const GET_MENU = gql`
  query menuQuery {
    menu {
      id
      text
      sort_order
    }
  }
`;
