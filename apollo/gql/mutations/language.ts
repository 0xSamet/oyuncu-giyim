import { gql } from "@apollo/client";

export const ADD_LANGUAGE = gql`
  mutation deleteLanguage($input: addLanguageInput!) {
    addLanguage(input: $input) {
      name
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation updateLanguage($input: updateLanguageInput!) {
    updateLanguage(input: $input) {
      name
    }
  }
`;

export const DELETE_LANGUAGE = gql`
  mutation deleteLanguage($input: deleteLanguageInput!) {
    deleteLanguage(input: $input) {
      success
    }
  }
`;
