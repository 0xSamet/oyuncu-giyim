import { gql } from "@apollo/client";

export const ADD_GEO_ZONE = gql`
  mutation addGeoZone($input: addGeoZoneInput!) {
    addGeoZone(input: $input) {
      id
    }
  }
`;

export const UPDATE_GEO_ZONE = gql`
  mutation updateGeoZone($input: updateGeoZoneInput!) {
    updateGeoZone(input: $input) {
      id
    }
  }
`;

export const DELETE_GEO_ZONE = gql`
  mutation deleteGeoZone($input: deleteGeoZoneInput!) {
    deleteGeoZone(input: $input) {
      success
    }
  }
`;
