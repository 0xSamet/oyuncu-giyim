import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation addCategory($input: addCategoryInput!) {
    addCategory(input: $input) {
      success
    }
  }
`;
