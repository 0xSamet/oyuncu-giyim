import { gql } from "@apollo/client";

export const GET_LANGUAGES = gql`
  query getLanguages {
    languages {
      name
      id
      code
      flag_code
      sort_order
      status
      is_default
    }
  }
`;

export const GET_LANGUAGE = gql`
  query getLanguage($id: Int) {
    language(id: $id) {
      name
      id
      code
      flag_code
      sort_order
      status
      is_default
    }
  }
`;
