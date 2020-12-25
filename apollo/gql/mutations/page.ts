import { gql } from "@apollo/client";

export const ADD_PAGE = gql`
  mutation addPage($input: addPageInput!) {
    addPage(input: $input) {
      id
    }
  }
`;

export const UPDATE_PAGE = gql`
  mutation updatePage($input: updatePageInput!) {
    updatePage(input: $input) {
      id
    }
  }
`;

export const DELETE_PAGE = gql`
  mutation deletePage($input: deletePageInput!) {
    deletePage(input: $input) {
      success
    }
  }
`;
