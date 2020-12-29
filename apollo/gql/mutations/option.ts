import { gql } from "@apollo/client";

export const ADD_OPTION_TYPE = gql`
  mutation addOptionType($input: addOptionTypeInput!) {
    addOptionType(input: $input) {
      id
    }
  }
`;

export const UPDATE_OPTION_TYPE = gql`
  mutation updateOptionType($input: updateOptionTypeInput!) {
    updateOptionType(input: $input) {
      id
    }
  }
`;

export const DELETE_OPTION_TYPE = gql`
  mutation deleteOptionType($input: deleteOptionTypeInput!) {
    deleteOptionType(input: $input) {
      success
    }
  }
`;
