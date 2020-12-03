import { gql } from "@apollo/client";

export const GET_LANGUAGES = gql`
  query getLanguages {
    languages {
      name
      id
      code
      sort_order
      status
    }
  }
`;
