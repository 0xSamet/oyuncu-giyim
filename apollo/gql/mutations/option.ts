import { gql } from "@apollo/client";

export const ADD_OPTION = gql`
  mutation addOption($input: addOptionInput!) {
    addOption(input: $input) {
      id
    }
  }
`;

export const UPDATE_OPTION = gql`
  mutation updateOption($input: updateOptionInput!) {
    updateOption(input: $input) {
      id
    }
  }
`;

export const DELETE_OPTION = gql`
  mutation deleteOption($input: deleteOptionInput!) {
    deleteOption(input: $input) {
      success
    }
  }
`;
