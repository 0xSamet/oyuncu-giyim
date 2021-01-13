import { gql } from "@apollo/client";

export const ADD_ZONE = gql`
  mutation addZone($input: addZoneInput!) {
    addZone(input: $input) {
      id
    }
  }
`;

export const UPDATE_ZONE = gql`
  mutation updateZone($input: updateZoneInput!) {
    updateZone(input: $input) {
      id
    }
  }
`;

export const DELETE_ZONE = gql`
  mutation deleteZone($input: deleteZoneInput!) {
    deleteZone(input: $input) {
      success
    }
  }
`;
