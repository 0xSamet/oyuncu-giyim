import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation addCategory($input: addCategoryInput!) {
    addCategory(input: $input) {
      id
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($input: updateCategoryInput!) {
    updateCategory(input: $input) {
      id
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($input: deleteCategoryInput!) {
    deleteCategory(input: $input) {
      success
    }
  }
`;
