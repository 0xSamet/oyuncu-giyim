import { gql } from "@apollo/client";

export const ADD_TAX_RATE = gql`
  mutation addTaxRate($input: addTaxRateInput!) {
    addTaxRate(input: $input) {
      id
    }
  }
`;

export const UPDATE_TAX_RATE = gql`
  mutation updateTaxRate($input: updateTaxRateInput!) {
    updateTaxRate(input: $input) {
      id
    }
  }
`;

export const DELETE_TAX_RATE = gql`
  mutation deleteTaxRate($input: deleteTaxRateInput!) {
    deleteTaxRate(input: $input) {
      success
    }
  }
`;
