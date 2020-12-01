import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
      meta_title
      meta_description
      meta_keyword
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
