import { gql } from "@apollo/client";

export const ADD_TAX_CLASS = gql`
  mutation addTaxClass($input: addTaxClassInput!) {
    addTaxClass(input: $input) {
      id
    }
  }
`;

export const UPDATE_TAX_CLASS = gql`
  mutation updateTaxClass($input: updateTaxClassInput!) {
    updateTaxClass(input: $input) {
      id
    }
  }
`;

export const DELETE_TAX_CLASS = gql`
  mutation deleteTaxClass($input: deleteTaxClassInput!) {
    deleteTaxClass(input: $input) {
      success
    }
  }
`;
