import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
      sort_order
      parent_id
      status
      slug
      parents {
        id
        name
      }
    }
  }
`;
