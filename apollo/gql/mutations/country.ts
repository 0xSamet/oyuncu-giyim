import { gql } from "@apollo/client";

export const ADD_COUNTRY = gql`
  mutation addCountry($input: addCountryInput!) {
    addCountry(input: $input) {
      id
    }
  }
`;

export const UPDATE_COUNTRY = gql`
  mutation updateCountry($input: updateCountryInput!) {
    updateCountry(input: $input) {
      id
    }
  }
`;

export const DELETE_COUNTRY = gql`
  mutation deleteCountry($input: deleteCountryInput!) {
    deleteCountry(input: $input) {
      success
    }
  }
`;
