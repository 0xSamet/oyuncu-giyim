import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation addCategory($input: addCategoryInput!) {
    addCategory(input: $input) {
      description {
        name
      }
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($input: updateCategoryInput!) {
    updateCategory(input: $input) {
      description {
        name
      }
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
